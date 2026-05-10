# Databricks notebook source
# MAGIC %md
# MAGIC # IFRS 9 ECL Calculation with FLI Factors
# MAGIC
# MAGIC This notebook demonstrates how to calculate IFRS 9 Expected Credit Loss (ECL) by taking Forward-Looking Information (FLI) factors as input parameters using `dbutils.widgets`.
# MAGIC
# MAGIC ## 1. Define Input Parameters (Widgets)
# MAGIC
# MAGIC We'll create various text and dropdown widgets for the user to input FLI factors and other ECL components.

# COMMAND ----------

#import dbutils

from databricks.sdk import WorkspaceClient

w = WorkspaceClient()
# Access utilities (Note: widgets support via SDK may be limited)
dbutils = w.dbutils

# Clear any existing widgets before creating new ones (useful for re-runs)
dbutils.widgets.removeAll()

# Key ECL Components
dbutils.widgets.text("pd_base", "0.02", "Probability of Default (Base)")
dbutils.widgets.text("lgd_base", "0.45", "Loss Given Default (Base)")
dbutils.widgets.text("ead_base", "100000", "Exposure at Default (Base)")

# FLI Factors - Scenario 1 (e.g., Optimistic)
dbutils.widgets.dropdown("scenario_1_weight", "0.3", ["0.2", "0.3", "0.4", "0.5"], "Scenario 1 Weight")
dbutils.widgets.text("s1_pd_adjustment", "-0.005", "Scenario 1 PD Adjustment (e.g. -0.005 for better)")
dbutils.widgets.text("s1_lgd_adjustment", "-0.05", "Scenario 1 LGD Adjustment")
dbutils.widgets.text("s1_ead_adjustment", "0", "Scenario 1 EAD Adjustment") # Often less impacted by FLI directly

# FLI Factors - Scenario 2 (e.g., Base/Most Likely)
dbutils.widgets.dropdown("scenario_2_weight", "0.5", ["0.4", "0.5", "0.6", "0.7"], "Scenario 2 Weight")
dbutils.widgets.text("s2_pd_adjustment", "0.00", "Scenario 2 PD Adjustment")
dbutils.widgets.text("s2_lgd_adjustment", "0.00", "Scenario 2 LGD Adjustment")
dbutils.widgets.text("s2_ead_adjustment", "0", "Scenario 2 EAD Adjustment")

# FLI Factors - Scenario 3 (e.g., Pessimistic)
dbutils.widgets.dropdown("scenario_3_weight", "0.2", ["0.1", "0.2", "0.3"], "Scenario 3 Weight")
dbutils.widgets.text("s3_pd_adjustment", "0.01", "Scenario 3 PD Adjustment (e.g. 0.01 for worse)")
dbutils.widgets.text("s3_lgd_adjustment", "0.10", "Scenario 3 LGD Adjustment")
dbutils.widgets.text("s3_ead_adjustment", "0", "Scenario 3 EAD Adjustment")

# COMMAND ----------

# MAGIC %md
# MAGIC ## 2. Retrieve Widget Values
# MAGIC
# MAGIC We'll get the values entered by the user through the widgets. Remember to convert them to appropriate data types (float, int).

# COMMAND ----------

# Retrieve base ECL components
pd_base = float(dbutils.widgets.get("pd_base"))
lgd_base = float(dbutils.widgets.get("lgd_base"))
ead_base = float(dbutils.widgets.get("ead_base"))

# Retrieve Scenario 1 parameters
s1_weight = float(dbutils.widgets.get("scenario_1_weight"))
s1_pd_adj = float(dbutils.widgets.get("s1_pd_adjustment"))
s1_lgd_adj = float(dbutils.widgets.get("s1_lgd_adjustment"))
s1_ead_adj = float(dbutils.widgets.get("s1_ead_adjustment"))

# Retrieve Scenario 2 parameters
s2_weight = float(dbutils.widgets.get("scenario_2_weight"))
s2_pd_adj = float(dbutils.widgets.get("s2_pd_adjustment"))
s2_lgd_adj = float(dbutils.widgets.get("s2_lgd_adjustment"))
s2_ead_adj = float(dbutils.widgets.get("s2_ead_adjustment"))

# Retrieve Scenario 3 parameters
s3_weight = float(dbutils.widgets.get("scenario_3_weight"))
s3_pd_adj = float(dbutils.widgets.get("s3_pd_adjustment"))
s3_lgd_adj = float(dbutils.widgets.get("s3_lgd_adjustment"))
s3_ead_adj = float(dbutils.widgets.get("s3_ead_adjustment"))

# Basic validation for weights
total_weight = s1_weight + s2_weight + s3_weight
if not (0.99 <= total_weight <= 1.01): # Allow for minor floating point inaccuracies
    print(f"Warning: Total scenario weights sum to {total_weight}, which is not 1.0. Please adjust them for accurate ECL.")

print("--- Retrieved Parameters ---")
print(f"Base PD: {pd_base:.4f}, LGD: {lgd_base:.2f}, EAD: {ead_base:,.0f}")
print(f"Scenario 1: Weight={s1_weight:.1f}, PD_Adj={s1_pd_adj:.4f}, LGD_Adj={s1_lgd_adj:.2f}, EAD_Adj={s1_ead_adj:,.0f}")
print(f"Scenario 2: Weight={s2_weight:.1f}, PD_Adj={s2_pd_adj:.4f}, LGD_Adj={s2_lgd_adj:.2f}, EAD_Adj={s2_ead_adj:,.0f}")
print(f"Scenario 3: Weight={s3_weight:.1f}, PD_Adj={s3_pd_adj:.4f}, LGD_Adj={s3_lgd_adj:.2f}, EAD_Adj={s3_ead_adj:,.0f}")
print("----------------------------")


# COMMAND ----------

# MAGIC %md
# MAGIC ## 3. Perform ECL Calculation
# MAGIC
# MAGIC Now we'll apply the FLI factors to adjust PD, LGD, and EAD for each scenario and then calculate the probability-weighted ECL.
# MAGIC
# MAGIC **Simplified IFRS 9 ECL Formula:**
# MAGIC `ECL = Sum(Scenario_Weight * (PD_Scenario * LGD_Scenario * EAD_Scenario))`

# COMMAND ----------

# Calculate adjusted components for each scenario
# Scenario 1 (Optimistic)
pd_s1 = max(0, pd_base + s1_pd_adj) # PD cannot be negative
lgd_s1 = max(0, min(1, lgd_base + s1_lgd_adj)) # LGD between 0 and 1
ead_s1 = max(0, ead_base + s1_ead_adj)

# Scenario 2 (Base/Most Likely)
pd_s2 = max(0, pd_base + s2_pd_adj)
lgd_s2 = max(0, min(1, lgd_base + s2_lgd_adj))
ead_s2 = max(0, ead_base + s2_ead_adj)

# Scenario 3 (Pessimistic)
pd_s3 = max(0, pd_base + s3_pd_adj)
lgd_s3 = max(0, min(1, lgd_base + s3_lgd_adj))
ead_s3 = max(0, ead_base + s3_ead_adj)

# Calculate ECL for each scenario
ecl_s1 = pd_s1 * lgd_s1 * ead_s1
ecl_s2 = pd_s2 * lgd_s2 * ead_s2
ecl_s3 = pd_s3 * lgd_s3 * ead_s3

# Calculate probability-weighted ECL
total_ecl = (s1_weight * ecl_s1) + \
            (s2_weight * ecl_s2) + \
            (s3_weight * ecl_s3)

# COMMAND ----------

# MAGIC %md
# MAGIC ## 4. Display Results
# MAGIC
# MAGIC Finally, we'll print the calculated ECL and the breakdown per scenario.

# COMMAND ----------

print("--- Scenario-wise Adjustments and ECL ---")
print(f"Scenario 1 (Weight: {s1_weight:.1f}):")
print(f"  Adjusted PD: {pd_s1:.4f}, Adjusted LGD: {lgd_s1:.2f}, Adjusted EAD: {ead_s1:,.0f}")
print(f"  ECL for Scenario 1: {ecl_s1:,.2f}")
print("-" * 40)

print(f"Scenario 2 (Weight: {s2_weight:.1f}):")
print(f"  Adjusted PD: {pd_s2:.4f}, Adjusted LGD: {lgd_s2:.2f}, Adjusted EAD: {ead_s2:,.0f}")
print(f"  ECL for Scenario 2: {ecl_s2:,.2f}")
print("-" * 40)

print(f"Scenario 3 (Weight: {s3_weight:.1f}):")
print(f"  Adjusted PD: {pd_s3:.4f}, Adjusted LGD: {lgd_s3:.2f}, Adjusted EAD: {ead_s3:,.0f}")
print(f"  ECL for Scenario 3: {ecl_s3:,.2f}")
print("-" * 40)

print(f"\nTotal IFRS 9 Expected Credit Loss (ECL): ${total_ecl:,.2f}")

# COMMAND ----------

# MAGIC %md
# MAGIC ## How to Use This Notebook:
# MAGIC
# MAGIC 1.  **Import this notebook** into your Databricks workspace.
# MAGIC 2.  **Run all cells**.
# MAGIC 3.  **Use the Widgets Panel:** Once executed, a "Widgets" panel will appear at the top of your notebook (below the toolbar). You can use these input fields to specify:
# MAGIC     *   Base Probability of Default (PD), Loss Given Default (LGD), and Exposure at Default (EAD).
# MAGIC     *   Weights for each scenario (Optimistic, Base, Pessimistic).
# MAGIC     *   Adjustments (positive or negative) to PD, LGD, and EAD for each scenario, reflecting your forward-looking information.
# MAGIC 4.  **Change widget values and re-run cells:** After changing values in the widgets, you can click "Run All" or specifically run cells 2, 3, and 4 to see the updated ECL calculation.
# MAGIC
# MAGIC ## Further Enhancements:
# MAGIC
# MAGIC *   **Data Integration:** Instead of fixed base values, you'd typically load PD, LGD, and EAD from a database (e.g., Delta Lake table) for a portfolio of accounts.
#*   **Dynamic Scenarios:** Allow users to define more than three scenarios dynamically.
#*   **Complex FLI Models:** Integrate more sophisticated models for deriving FLI adjustments, perhaps based on economic indicators (GDP, unemployment, interest rates).
#*   **Stage Allocation:** IFRS 9 requires Stage 1, 2, and 3 allocation. Your ECL calculation would need to be applied within these stages.
#*   **Granular Adjustments:** Provide FLI factors at a more granular level (e.g., by customer segment, product type).
#*   **Output to Delta Table:** Save the calculated ECL and scenario results to a Delta Lake table for reporting and auditing.
#*   **Visualization:** Use libraries like Matplotlib or Plotly to visualize the impact of different FLI factors or scenario contributions.
