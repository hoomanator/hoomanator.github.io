import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from IPython.display import HTML

HTML("""
<div style='background: linear-gradient(90deg,#1E3C72,#2A5298); padding:25px; border-radius:15px'>
    <h1 style='color:white; text-align:center;'>
        IFRS 9 Expected Credit Loss Calculator
    </h1>
    <h3 style='color:#F8F9FA; text-align:center;'>
        Interactive Databricks ECL Engine
    </h3>
</div>
""")

try:
    dbutils.widgets.removeAll()
except:
    pass

# Scenario Weights

dbutils.widgets.text("base_weight", "0.60", "Base Scenario Weight")
dbutils.widgets.text("upside_weight", "0.20", "Upside Scenario Weight")
dbutils.widgets.text("downside_weight", "0.20", "Downside Scenario Weight")

# FLI Factors

dbutils.widgets.text("base_fli", "1.00", "Base FLI Multiplier")
dbutils.widgets.text("upside_fli", "0.80", "Upside FLI Multiplier")
dbutils.widgets.text("downside_fli", "1.50", "Downside FLI Multiplier")

# Loan Inputs

dbutils.widgets.dropdown("stage", "1", ["1", "2", "3"], "IFRS Stage")

dbutils.widgets.text("loan_id", "LN1001", "Loan ID")
dbutils.widgets.text("ead", "100000", "Exposure at Default")
dbutils.widgets.text("pd", "0.03", "Base PD")
dbutils.widgets.text("lgd", "0.40", "LGD")
dbutils.widgets.text("interest_rate", "0.05", "Effective Interest Rate")
dbutils.widgets.text("term_years", "5", "Remaining Term (Years)")
# Databricks notebook source

base_weight = float(dbutils.widgets.get("base_weight"))
upside_weight = float(dbutils.widgets.get("upside_weight"))
downside_weight = float(dbutils.widgets.get("downside_weight"))

base_fli = float(dbutils.widgets.get("base_fli"))
upside_fli = float(dbutils.widgets.get("upside_fli"))
downside_fli = float(dbutils.widgets.get("downside_fli"))

loan_id = dbutils.widgets.get("loan_id")
stage = int(dbutils.widgets.get("stage"))

EAD = float(dbutils.widgets.get("ead"))
base_pd = float(dbutils.widgets.get("pd"))
LGD = float(dbutils.widgets.get("lgd"))
interest_rate = float(dbutils.widgets.get("interest_rate"))
term_years = int(dbutils.widgets.get("term_years"))

pd_base = base_pd * base_fli
pd_upside = base_pd * upside_fli
pd_downside = base_pd * downside_fli

scenario_df = pd.DataFrame({
    'Scenario': ['Base', 'Upside', 'Downside'],
    'Weight': [base_weight, upside_weight, downside_weight],
    'FLI Factor': [base_fli, upside_fli, downside_fli],
    'Adjusted PD': [pd_base, pd_upside, pd_downside]
})

scenario_df

weighted_pd = (
    pd_base * base_weight +
    pd_upside * upside_weight +
    pd_downside * downside_weight
)

weighted_pd

def calculate_discount_factor(rate, years):
    return 1 / ((1 + rate) ** years)


def calculate_ecl(stage, pd, lgd, ead, rate, term):

    discount_factor = calculate_discount_factor(rate, term)

    if stage == 1:
        # 12-month ECL
        ecl = pd * lgd * ead * discount_factor

    elif stage == 2:
        # Lifetime ECL
        lifetime_pd = min(pd * term, 1)
        ecl = lifetime_pd * lgd * ead * discount_factor

    elif stage == 3:
        # Credit impaired
        ecl = lgd * ead * discount_factor

    else:
        ecl = 0

    return round(ecl, 2)


ECL = calculate_ecl(
    stage,
    weighted_pd,
    LGD,
    EAD,
    interest_rate,
    term_years
)

result_df = pd.DataFrame({
    'Metric': [
        'Loan ID',
        'IFRS Stage',
        'EAD',
        'Weighted PD',
        'LGD',
        'Interest Rate',
        'Remaining Term',
        'Final ECL'
    ],
    'Value': [
        loan_id,
        stage,
        round(EAD,2),
        round(weighted_pd,4),
        round(LGD,4),
        round(interest_rate,4),
        term_years,
        round(ECL,2)
    ]
})

result_df

title_html = f"""
<div style='background: linear-gradient(90deg,#1E3C72,#2A5298); padding:25px; border-radius:15px'>
    <h1 style='color:white; text-align:center;'>
        IFRS 9 Expected Credit Loss Calculator
    </h1>
    <h3 style='color:#F8F9FA; text-align:center;'>
        Interactive Databricks ECL Engine
    </h3>
</div>
"""
HTML(title_html)

HTML(f"""
<div style='display:flex; gap:20px;'>

    <div style='background:#4CAF50; color:white; padding:20px; border-radius:15px; width:250px;'>
        <h2>Weighted PD</h2>
        <h1>{weighted_pd:.2%}</h1>
    </div>

    <div style='background:#FF9800; color:white; padding:20px; border-radius:15px; width:250px;'>
        <h2>LGD</h2>
        <h1>{LGD:.2%}</h1>
    </div>

    <div style='background:#2196F3; color:white; padding:20px; border-radius:15px; width:250px;'>
        <h2>EAD</h2>
        <h1>${EAD:,.0f}</h1>
    </div>

    <div style='background:#E91E63; color:white; padding:20px; border-radius:15px; width:250px;'>
        <h2>Final ECL</h2>
        <h1>${ECL:,.2f}</h1>
    </div>

</div>
""")


summary_html = f"""
<div style='background:#111827; padding:30px; border-radius:20px;'>

<h1 style='color:#F9FAFB;'>IFRS 9 ECL Summary</h1>

<table style='width:100%; border-collapse: collapse;'>
<tr style='background:#2563EB; color:white;'>
    <th style='padding:15px;'>Metric</th>
    <th style='padding:15px;'>Value</th>
</tr>

<tr style='background:#1F2937; color:white;'>
    <td style='padding:15px;'>Loan ID</td>
    <td style='padding:15px;'>{loan_id}</td>
</tr>

<tr style='background:#374151; color:white;'>
    <td style='padding:15px;'>IFRS Stage</td>
    <td style='padding:15px;'>{stage}</td>
</tr>

<tr style='background:#1F2937; color:white;'>
    <td style='padding:15px;'>Weighted PD</td>
    <td style='padding:15px;'>{weighted_pd:.2%}</td>
</tr>

<tr style='background:#374151; color:white;'>
    <td style='padding:15px;'>LGD</td>
    <td style='padding:15px;'>{LGD:.2%}</td>
</tr>

<tr style='background:#1F2937; color:white;'>
    <td style='padding:15px;'>EAD</td>
    <td style='padding:15px;'>${EAD:,.2f}</td>
</tr>

<tr style='background:#DC2626; color:white; font-size:24px;'>
    <td style='padding:15px;'>Expected Credit Loss</td>
    <td style='padding:15px;'>${ECL:,.2f}</td>
</tr>

</table>

</div>
"""

fig = px.bar(
    scenario_df,
    x='Scenario',
    y='Adjusted PD',
    color='Scenario',
    title='Scenario Adjusted PD Comparison',
    text='Adjusted PD'
)

fig.update_layout(
    template='plotly_dark',
    height=500,
    title_font_size=24
)

fig.show()


portfolio_df = pd.DataFrame({
    'loan_id': ['L1', 'L2', 'L3'],
    'stage': [1, 2, 3],
    'pd': [0.02, 0.04, 0.10],
    'lgd': [0.35, 0.45, 0.60],
    'ead': [100000, 250000, 50000]
})

portfolio_df['weighted_pd'] = portfolio_df['pd'] * base_fli

portfolio_df['ecl'] = portfolio_df.apply(
    lambda x: calculate_ecl(
        x['stage'],
        x['weighted_pd'],
        x['lgd'],
        x['ead'],
        interest_rate,
        term_years
    ),
    axis=1
)

portfolio_df

fig2 = px.pie(
    portfolio_df,
    names='loan_id',
    values='ecl',
    title='Portfolio ECL Distribution'
)

fig2.update_layout(
    template='plotly_dark',
    height=600
)

fig2.show()

HTML(title_html + summary_html)
