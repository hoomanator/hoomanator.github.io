# Databricks widgets for user input
dbutils.widgets.text("loan_id", "L001", "Loan ID")
dbutils.widgets.text("EAD", "100000", "Exposure at Default (EAD)")
dbutils.widgets.text("PD", "0.05", "Probability of Default (PD)")
dbutils.widgets.text("LGD", "0.45", "Loss Given Default (LGD)")
dbutils.widgets.text("FLI_Factor", "1.1", "Forward-Looking Information (FLI Factor)")
# Read values from widgets
loan_id = dbutils.widgets.get("loan_id")
EAD = float(dbutils.widgets.get("EAD"))
PD = float(dbutils.widgets.get("PD"))
LGD = float(dbutils.widgets.get("LGD"))
FLI_Factor = float(dbutils.widgets.get("FLI_Factor"))
def calculate_ecl(EAD: float, PD: float, LGD: float, FLI_factor: float) -> float:
    """
    Calculate IFRS 9 Expected Credit Loss (ECL).
    """
    base_ecl = PD * LGD * EAD
    adjusted_ecl = base_ecl * FLI_factor
    return adjusted_ecl

# Calculate ECL
ECL_value = calculate_ecl(EAD, PD, LGD, FLI_Factor)
# Output results
print(f"--- IFRS 9 Expected Credit Loss (ECL) Calculation ---")
print(f"Loan ID: {loan_id}")
print(f"EAD: {EAD:,.2f}")
print(f"PD: {PD:.2%}")
print(f"LGD: {LGD:.2%}")
print(f"FLI Factor: {FLI_Factor:.2f}")
print(f"ECL (Adjusted): {ECL_value:,.2f}")    

import pandas as pd
result_df = pd.DataFrame([{
    "Loan ID": loan_id,
    "EAD": EAD,
    "PD": PD,
    "LGD": LGD,
    "FLI Factor": FLI_Factor,
    "ECL": ECL_value
}])
display(result_df)
