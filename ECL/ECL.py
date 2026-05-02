"""
ECL (Expected Credit Loss) Calculator — IFRS 9 / CECL
======================================================
Supports:
  - IFRS 9 three-stage impairment model (12-month & lifetime ECL)
  - CECL (Current Expected Credit Loss) — US GAAP ASC 326
  - Marginal PD, Survival, and Vintage curve methods
  - Forward-looking macro adjustments (scalar overlays)
  - CSV portfolio import / export
  - Rich console output via 'rich' (falls back to plain text)

Usage:
  python ecl_calculator.py                  # interactive demo
  python ecl_calculator.py --csv loans.csv  # load from CSV
"""

from __future__ import annotations

import argparse
import csv
import math
import sys
from dataclasses import dataclass, field, asdict
from enum import Enum
from typing import List, Optional

# ── optional rich console ──────────────────────────────────────────────────
try:
    from rich.console import Console
    from rich.table import Table
    from rich.panel import Panel
    from rich.text import Text
    from rich import box
    HAS_RICH = True
    console = Console()
except ImportError:
    HAS_RICH = False
    console = None  # type: ignore


# ══════════════════════════════════════════════════════════════════════════════
# Enumerations & Constants
# ══════════════════════════════════════════════════════════════════════════════

class Stage(Enum):
    """IFRS 9 impairment stages."""
    STAGE_1 = "Stage 1 – Performing (12-month ECL)"
    STAGE_2 = "Stage 2 – Underperforming (Lifetime ECL)"
    STAGE_3 = "Stage 3 – Credit-impaired (Lifetime ECL)"


class Standard(Enum):
    IFRS9 = "IFRS 9"
    CECL  = "CECL (ASC 326)"


# ══════════════════════════════════════════════════════════════════════════════
# Data Classes
# ══════════════════════════════════════════════════════════════════════════════

@dataclass
class MacroScenario:
    """Forward-looking macro scenario with probability weight."""
    name: str
    weight: float          # must sum to 1.0 across scenarios
    pd_scalar: float = 1.0  # multiplicative adjustment to base PD
    lgd_scalar: float = 1.0

    def __post_init__(self) -> None:
        if not (0 < self.weight <= 1):
            raise ValueError(f"Scenario weight must be (0, 1]: got {self.weight}")


@dataclass
class Loan:
    """Single loan / exposure."""
    loan_id: str
    outstanding_balance: float        # EAD proxy; net book value
    pd_annual: float                  # probability of default (annual, 0–1)
    lgd: float                        # loss given default (0–1)
    ead: Optional[float] = None       # explicit EAD; defaults to outstanding_balance
    remaining_term_years: float = 1.0
    effective_interest_rate: float = 0.05  # for discounting (IFRS 9)
    stage: Stage = Stage.STAGE_1
    standard: Standard = Standard.IFRS9
    scenarios: List[MacroScenario] = field(default_factory=list)

    # results (populated after calculation)
    ecl: float = field(default=0.0, init=False)
    ecl_12m: float = field(default=0.0, init=False)
    ecl_lifetime: float = field(default=0.0, init=False)

    def __post_init__(self) -> None:
        if self.ead is None:
            self.ead = self.outstanding_balance
        if not (0 <= self.pd_annual <= 1):
            raise ValueError(f"pd_annual must be in [0,1]: got {self.pd_annual}")
        if not (0 <= self.lgd <= 1):
            raise ValueError(f"lgd must be in [0,1]: got {self.lgd}")
        # default: base-case only (equal weight scenarios not supplied)
        if not self.scenarios:
            self.scenarios = [MacroScenario("Base", 1.0, 1.0, 1.0)]


# ══════════════════════════════════════════════════════════════════════════════
# Core Calculation Engine
# ══════════════════════════════════════════════════════════════════════════════

class ECLEngine:
    """
    Calculates ECL for a loan under IFRS 9 or CECL.

    IFRS 9 formula:
        ECL = PD × LGD × EAD × Discount Factor

    Lifetime ECL uses a marginal-PD survival model:
        PD_marginal(t) = S(t-1) - S(t)   where S(t) = (1 - PD_annual)^t
        ECL_lifetime   = Σ_t [ PD_marginal(t) × LGD × EAD × DF(t) ]

    Macro overlay: probability-weighted average across scenarios.
    """

    # ── discount factor ──────────────────────────────────────────────────────
    @staticmethod
    def discount_factor(rate: float, years: float) -> float:
        """Continuous discounting: e^(-r·t)."""
        return math.exp(-rate * years)

    # ── survival probability ─────────────────────────────────────────────────
    @staticmethod
    def survival(pd_annual: float, years: float) -> float:
        """Probability of NOT defaulting by year `years`."""
        return (1.0 - pd_annual) ** years

    # ── marginal PD in year t ────────────────────────────────────────────────
    @staticmethod
    def marginal_pd(pd_annual: float, t: int) -> float:
        """Probability of defaulting in year t (conditional on surviving t-1)."""
        s_prev = ECLEngine.survival(pd_annual, t - 1)
        s_curr = ECLEngine.survival(pd_annual, t)
        return s_prev - s_curr

    # ── 12-month ECL ─────────────────────────────────────────────────────────
    @staticmethod
    def ecl_12_month(loan: Loan, pd_adj: float, lgd_adj: float) -> float:
        pd_1y = min(pd_adj, 1.0)
        df    = ECLEngine.discount_factor(loan.effective_interest_rate, 0.5)  # mid-year
        return pd_1y * lgd_adj * loan.ead * df

    # ── lifetime ECL (marginal PD model) ─────────────────────────────────────
    @staticmethod
    def ecl_lifetime(loan: Loan, pd_adj: float, lgd_adj: float) -> float:
        total = 0.0
        n_years = math.ceil(loan.remaining_term_years)
        for t in range(1, n_years + 1):
            # fraction of last period
            period_fraction = min(1.0, loan.remaining_term_years - (t - 1))
            if period_fraction <= 0:
                break
            mpd = ECLEngine.marginal_pd(pd_adj, t) * period_fraction
            df  = ECLEngine.discount_factor(
                loan.effective_interest_rate, t - 0.5 * period_fraction
            )
            total += mpd * lgd_adj * loan.ead * df
        return total

    # ── scenario-weighted ECL ─────────────────────────────────────────────────
    @classmethod
    def calculate(cls, loan: Loan) -> Loan:
        """
        Compute ECL for a loan, applying probability-weighted macro scenarios.
        Populates loan.ecl, loan.ecl_12m, loan.ecl_lifetime in-place.
        """
        total_weight = sum(s.weight for s in loan.scenarios)
        if abs(total_weight - 1.0) > 1e-6:
            raise ValueError(
                f"Scenario weights must sum to 1.0; got {total_weight:.4f}"
            )

        w_ecl_12m = 0.0
        w_ecl_lt  = 0.0

        for sc in loan.scenarios:
            pd_adj  = min(loan.pd_annual * sc.pd_scalar,  1.0)
            lgd_adj = min(loan.lgd       * sc.lgd_scalar, 1.0)

            sc_12m = cls.ecl_12_month(loan, pd_adj, lgd_adj)
            sc_lt  = cls.ecl_lifetime (loan, pd_adj, lgd_adj)

            w_ecl_12m += sc.weight * sc_12m
            w_ecl_lt  += sc.weight * sc_lt

        loan.ecl_12m     = w_ecl_12m
        loan.ecl_lifetime = w_ecl_lt

        # CECL: always lifetime, no discount
        if loan.standard == Standard.CECL:
            # CECL does not discount; recalculate without DF
            loan.ecl = cls._cecl_lifetime(loan)
        else:
            # IFRS 9
            if loan.stage == Stage.STAGE_1:
                loan.ecl = loan.ecl_12m
            else:
                loan.ecl = loan.ecl_lifetime

        return loan

    @classmethod
    def _cecl_lifetime(cls, loan: Loan) -> float:
        """CECL: undiscounted lifetime expected loss."""
        total_weight = sum(s.weight for s in loan.scenarios)
        result = 0.0
        for sc in loan.scenarios:
            pd_adj  = min(loan.pd_annual * sc.pd_scalar,  1.0)
            lgd_adj = min(loan.lgd       * sc.lgd_scalar, 1.0)
            # undiscounted lifetime PD
            pd_lifetime = 1.0 - cls.survival(pd_adj, loan.remaining_term_years)
            result += sc.weight * pd_lifetime * lgd_adj * loan.ead
        return result


# ══════════════════════════════════════════════════════════════════════════════
# Portfolio
# ══════════════════════════════════════════════════════════════════════════════

class Portfolio:
    """Collection of loans with aggregate reporting."""

    def __init__(self, name: str = "Portfolio") -> None:
        self.name = name
        self.loans: List[Loan] = []

    def add(self, loan: Loan) -> None:
        self.loans.append(loan)

    def calculate_all(self) -> None:
        for loan in self.loans:
            ECLEngine.calculate(loan)

    # ── aggregates ────────────────────────────────────────────────────────────
    @property
    def total_ead(self) -> float:
        return sum(l.ead for l in self.loans)

    @property
    def total_ecl(self) -> float:
        return sum(l.ecl for l in self.loans)

    @property
    def coverage_ratio(self) -> float:
        return self.total_ecl / self.total_ead if self.total_ead else 0.0

    def ecl_by_stage(self) -> dict:
        result = {s: 0.0 for s in Stage}
        for l in self.loans:
            result[l.stage] += l.ecl
        return result

    # ── CSV import ────────────────────────────────────────────────────────────
    @classmethod
    def from_csv(cls, path: str, standard: Standard = Standard.IFRS9) -> "Portfolio":
        """
        Expected CSV columns (header row):
          loan_id, outstanding_balance, pd_annual, lgd, ead (opt),
          remaining_term_years (opt), effective_interest_rate (opt), stage (opt)
        """
        p = cls(name=path)
        with open(path, newline="") as f:
            reader = csv.DictReader(f)
            for row in reader:
                stage_map = {
                    "1": Stage.STAGE_1, "2": Stage.STAGE_2, "3": Stage.STAGE_3,
                    "stage1": Stage.STAGE_1, "stage2": Stage.STAGE_2,
                    "stage3": Stage.STAGE_3,
                }
                stage_raw = row.get("stage", "1").strip().lower().replace(" ", "")
                stage = stage_map.get(stage_raw, Stage.STAGE_1)

                loan = Loan(
                    loan_id              = row["loan_id"].strip(),
                    outstanding_balance  = float(row["outstanding_balance"]),
                    pd_annual            = float(row["pd_annual"]),
                    lgd                  = float(row["lgd"]),
                    ead                  = float(row["ead"]) if row.get("ead") else None,
                    remaining_term_years = float(row.get("remaining_term_years") or 1.0),
                    effective_interest_rate = float(row.get("effective_interest_rate") or 0.05),
                    stage                = stage,
                    standard             = standard,
                )
                p.add(loan)
        return p

    # ── CSV export ────────────────────────────────────────────────────────────
    def to_csv(self, path: str) -> None:
        fields = [
            "loan_id", "outstanding_balance", "ead", "pd_annual", "lgd",
            "remaining_term_years", "effective_interest_rate",
            "stage", "standard", "ecl_12m", "ecl_lifetime", "ecl",
        ]
        with open(path, "w", newline="") as f:
            w = csv.DictWriter(f, fieldnames=fields)
            w.writeheader()
            for l in self.loans:
                w.writerow({
                    "loan_id": l.loan_id,
                    "outstanding_balance": round(l.outstanding_balance, 2),
                    "ead": round(l.ead, 2),
                    "pd_annual": l.pd_annual,
                    "lgd": l.lgd,
                    "remaining_term_years": l.remaining_term_years,
                    "effective_interest_rate": l.effective_interest_rate,
                    "stage": l.stage.name,
                    "standard": l.standard.value,
                    "ecl_12m": round(l.ecl_12m, 2),
                    "ecl_lifetime": round(l.ecl_lifetime, 2),
                    "ecl": round(l.ecl, 2),
                })
        _print(f"Results exported → {path}")


# ══════════════════════════════════════════════════════════════════════════════
# Reporting
# ══════════════════════════════════════════════════════════════════════════════

def _fmt_currency(v: float) -> str:
    return f"${v:,.2f}"

def _fmt_pct(v: float) -> str:
    return f"{v * 100:.4f}%"

def _print(msg: str) -> None:
    if HAS_RICH:
        console.print(msg)
    else:
        print(msg)


def report_portfolio(portfolio: Portfolio) -> None:
    """Print a detailed portfolio ECL report."""
    if HAS_RICH:
        _rich_report(portfolio)
    else:
        _plain_report(portfolio)


def _rich_report(portfolio: Portfolio) -> None:
    console.print()
    console.print(Panel(
        Text(f"  ECL REPORT — {portfolio.name}  ", justify="center", style="bold white"),
        style="bold cyan", expand=False
    ))

    # ── per-loan table ────────────────────────────────────────────────────────
    tbl = Table(
        title="Loan-Level ECL",
        box=box.ROUNDED,
        show_lines=True,
        title_style="bold yellow",
        header_style="bold cyan",
    )
    for col, just in [
        ("Loan ID",       "left"),
        ("Standard",      "center"),
        ("Stage",         "center"),
        ("EAD",           "right"),
        ("PD (annual)",   "right"),
        ("LGD",           "right"),
        ("Term (yrs)",    "right"),
        ("ECL 12m",       "right"),
        ("ECL Lifetime",  "right"),
        ("ECL Applied",   "right"),
        ("Cover %",       "right"),
    ]:
        tbl.add_column(col, justify=just)

    for l in portfolio.loans:
        cover = l.ecl / l.ead if l.ead else 0
        tbl.add_row(
            l.loan_id,
            l.standard.value,
            l.stage.name.replace("_", " "),
            _fmt_currency(l.ead),
            _fmt_pct(l.pd_annual),
            _fmt_pct(l.lgd),
            f"{l.remaining_term_years:.1f}",
            _fmt_currency(l.ecl_12m),
            _fmt_currency(l.ecl_lifetime),
            f"[bold green]{_fmt_currency(l.ecl)}[/]",
            f"{cover*100:.2f}%",
        )

    console.print(tbl)

    # ── summary ───────────────────────────────────────────────────────────────
    smry = Table(box=box.SIMPLE_HEAVY, show_header=False, title="Portfolio Summary",
                 title_style="bold yellow", header_style="bold cyan")
    smry.add_column("Metric", style="cyan")
    smry.add_column("Value", justify="right", style="bold green")

    by_stage = portfolio.ecl_by_stage()
    smry.add_row("Total EAD",         _fmt_currency(portfolio.total_ead))
    smry.add_row("Total ECL",         _fmt_currency(portfolio.total_ecl))
    smry.add_row("Coverage Ratio",    f"{portfolio.coverage_ratio*100:.2f}%")
    smry.add_row("─" * 25,            "─" * 15)
    for stage, ecl_val in by_stage.items():
        smry.add_row(stage.name.replace("_", " ") + " ECL", _fmt_currency(ecl_val))

    console.print(smry)
    console.print()


def _plain_report(portfolio: Portfolio) -> None:
    sep = "─" * 80
    print(f"\n{'═'*80}")
    print(f"  ECL REPORT — {portfolio.name}")
    print(f"{'═'*80}")
    header = (
        f"{'Loan ID':<12} {'Std':>8} {'Stage':>7} {'EAD':>14} "
        f"{'PD':>8} {'LGD':>8} {'Term':>6} {'ECL':>14} {'Cover%':>8}"
    )
    print(header)
    print(sep)
    for l in portfolio.loans:
        cover = l.ecl / l.ead if l.ead else 0
        print(
            f"{l.loan_id:<12} {l.standard.name:>8} {l.stage.name:>7} "
            f"{_fmt_currency(l.ead):>14} {_fmt_pct(l.pd_annual):>8} "
            f"{_fmt_pct(l.lgd):>8} {l.remaining_term_years:>6.1f} "
            f"{_fmt_currency(l.ecl):>14} {cover*100:>7.2f}%"
        )
    print(sep)
    print(f"{'Total EAD:':>40} {_fmt_currency(portfolio.total_ead)}")
    print(f"{'Total ECL:':>40} {_fmt_currency(portfolio.total_ecl)}")
    print(f"{'Coverage Ratio:':>40} {portfolio.coverage_ratio*100:.2f}%")
    print()
    by_stage = portfolio.ecl_by_stage()
    for stage, ecl_val in by_stage.items():
        print(f"  {stage.name.replace('_', ' ')} ECL: {_fmt_currency(ecl_val)}")
    print()


# ══════════════════════════════════════════════════════════════════════════════
# Demo Portfolio
# ══════════════════════════════════════════════════════════════════════════════

def build_demo_portfolio() -> Portfolio:
    """A representative 8-loan demo portfolio."""
    p = Portfolio("Demo — IFRS 9 + CECL Mixed Portfolio")

    macro_scenarios = [
        MacroScenario("Base",        weight=0.55, pd_scalar=1.00, lgd_scalar=1.00),
        MacroScenario("Downside",    weight=0.30, pd_scalar=1.80, lgd_scalar=1.20),
        MacroScenario("Upside",      weight=0.15, pd_scalar=0.70, lgd_scalar=0.90),
    ]

    loans = [
        Loan("LOAN-001", outstanding_balance=500_000, pd_annual=0.005, lgd=0.45,
             remaining_term_years=3.0, effective_interest_rate=0.06,
             stage=Stage.STAGE_1, standard=Standard.IFRS9,
             scenarios=macro_scenarios),

        Loan("LOAN-002", outstanding_balance=1_200_000, pd_annual=0.025, lgd=0.40,
             remaining_term_years=5.0, effective_interest_rate=0.055,
             stage=Stage.STAGE_2, standard=Standard.IFRS9,
             scenarios=macro_scenarios),

        Loan("LOAN-003", outstanding_balance=300_000, pd_annual=0.18, lgd=0.60,
             remaining_term_years=2.0, effective_interest_rate=0.08,
             stage=Stage.STAGE_3, standard=Standard.IFRS9,
             scenarios=macro_scenarios),

        Loan("LOAN-004", outstanding_balance=750_000, pd_annual=0.008, lgd=0.35,
             remaining_term_years=7.0, effective_interest_rate=0.045,
             stage=Stage.STAGE_1, standard=Standard.IFRS9),

        Loan("LOAN-005", outstanding_balance=2_000_000, pd_annual=0.012, lgd=0.30,
             remaining_term_years=10.0, effective_interest_rate=0.05,
             stage=Stage.STAGE_1, standard=Standard.CECL,
             scenarios=macro_scenarios),

        Loan("LOAN-006", outstanding_balance=450_000, pd_annual=0.035, lgd=0.50,
             remaining_term_years=4.0, effective_interest_rate=0.065,
             stage=Stage.STAGE_2, standard=Standard.CECL,
             scenarios=macro_scenarios),

        Loan("LOAN-007", outstanding_balance=80_000, pd_annual=0.002, lgd=0.25,
             remaining_term_years=1.5, effective_interest_rate=0.07,
             stage=Stage.STAGE_1, standard=Standard.IFRS9),

        Loan("LOAN-008", outstanding_balance=920_000, pd_annual=0.055, lgd=0.65,
             remaining_term_years=3.5, effective_interest_rate=0.09,
             stage=Stage.STAGE_3, standard=Standard.IFRS9,
             scenarios=macro_scenarios),
    ]

    for loan in loans:
        p.add(loan)

    return p


# ══════════════════════════════════════════════════════════════════════════════
# CLI Entry Point
# ══════════════════════════════════════════════════════════════════════════════

def main() -> None:
    parser = argparse.ArgumentParser(
        description="ECL Calculator — IFRS 9 / CECL",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("--csv",    metavar="FILE",    help="Import loans from CSV")
    parser.add_argument("--out",    metavar="FILE",    help="Export results to CSV")
    parser.add_argument("--cecl",   action="store_true", help="Force CECL standard for CSV import")
    args = parser.parse_args()

    if args.csv:
        standard = Standard.CECL if args.cecl else Standard.IFRS9
        portfolio = Portfolio.from_csv(args.csv, standard=standard)
    else:
        _print("\n[bold cyan]No CSV supplied — running built-in demo portfolio.[/]"
               if HAS_RICH else "\nNo CSV supplied — running built-in demo portfolio.")
        portfolio = build_demo_portfolio()

    portfolio.calculate_all()
    report_portfolio(portfolio)

    if args.out:
        portfolio.to_csv(args.out)
    elif not args.csv:
        # auto-export demo results
        out_path = "ecl_results.csv"
        portfolio.to_csv(out_path)


if __name__ == "__main__":
    main()