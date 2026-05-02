ECL Calculator — IFRS 9 / CECL
A production-grade Python tool for computing Expected Credit Loss (ECL)
under both IFRS 9 (three-stage impairment) and CECL / ASC 326 (US GAAP).

Features
FeatureDetailStandardsIFRS 9 (12-month & lifetime ECL) · CECL (undiscounted lifetime)StagingStage 1 / 2 / 3 auto-appliedDiscountingMid-year continuous discounting (IFRS 9)Marginal PD modelSurvival-curve based; handles multi-year termsMacro overlaysProbability-weighted scenarios (base / downside / upside)Portfolio aggregationTotal ECL, coverage ratio, ECL by stageCSV import / exportBatch processing of loan portfoliosRich console outputBeautiful tables if rich is installed; plain text fallback

Installation
bashpip install rich          # optional — for coloured terminal output
No other dependencies beyond Python 3.8+ standard library.

Quick Start
1 — Run the built-in demo
bashpython ecl_calculator.py
Produces an 8-loan demo with IFRS 9 + CECL loans and macro scenarios,
and exports results to ecl_results.csv.
2 — Import from CSV (IFRS 9)
bashpython ecl_calculator.py --csv sample_loans.csv --out results.csv
3 — Import from CSV (CECL)
bashpython ecl_calculator.py --csv sample_loans.csv --cecl --out results.csv

CSV Format
ColumnRequiredDescriptionloan_id✅Unique identifieroutstanding_balance✅Net book value of the exposurepd_annual✅Annual probability of default (0–1)lgd✅Loss given default (0–1)eadoptionalExposure at default; defaults to outstanding_balanceremaining_term_yearsoptionalLoan term remaining; default = 1effective_interest_rateoptionalFor IFRS 9 discounting; default = 0.05stageoptional1, 2, or 3; default = 1

Core Formulae
IFRS 9 — 12-Month ECL (Stage 1)
ECL_12m = PD_1yr × LGD × EAD × DF(0.5)
IFRS 9 — Lifetime ECL (Stage 2 / 3)
ECL_lt = Σ_t [ PD_marginal(t) × LGD × EAD × DF(t) ]

where:
  PD_marginal(t) = S(t-1) − S(t)
  S(t)           = (1 − PD_annual)^t          ← survival probability
  DF(t)          = e^(−r × t)                 ← continuous discount factor
CECL (ASC 326) — Undiscounted Lifetime ECL
ECL_CECL = PD_lifetime × LGD × EAD
PD_lifetime = 1 − (1 − PD_annual)^term
Macro Scenario Overlay
ECL = Σ_i [ weight_i × ECL(PD × PD_scalar_i, LGD × LGD_scalar_i) ]

Extending the Calculator
Add custom macro scenarios in Python
pythonfrom ecl_calculator import Loan, MacroScenario, Portfolio, ECLEngine, Stage, Standard

scenarios = [
    MacroScenario("Base",     weight=0.50, pd_scalar=1.00, lgd_scalar=1.00),
    MacroScenario("Stress",   weight=0.35, pd_scalar=2.50, lgd_scalar=1.30),
    MacroScenario("Recovery", weight=0.15, pd_scalar=0.60, lgd_scalar=0.85),
]

loan = Loan(
    loan_id="MY-001",
    outstanding_balance=1_000_000,
    pd_annual=0.02,
    lgd=0.45,
    remaining_term_years=5,
    effective_interest_rate=0.055,
    stage=Stage.STAGE_2,
    standard=Standard.IFRS9,
    scenarios=scenarios,
)

ECLEngine.calculate(loan)
print(f"ECL: ${loan.ecl:,.2f}")
print(f"Coverage: {loan.ecl / loan.ead * 100:.2f}%")

Output Example
  ECL REPORT — Demo Portfolio
╭─────────────────────────────────────────────────────────────╮
│  Loan ID  │ Standard │ Stage   │     EAD │  PD   │   ECL   │
├───────────┼──────────┼─────────┼─────────┼───────┼─────────┤
│ LOAN-001  │ IFRS 9   │ Stage 1 │ $500,000│ 0.50% │  $1,023 │
│ LOAN-002  │ IFRS 9   │ Stage 2 │$1.2M    │ 2.50% │ $43,810 │
│ LOAN-003  │ IFRS 9   │ Stage 3 │ $300,000│18.00% │ $89,401 │
╰─────────────────────────────────────────────────────────────╯
Total ECL: $xxx,xxx   Coverage: x.xx%