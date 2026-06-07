
import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score


class ECLEngine:
    def __init__(self):
        self.model = None

    def train_pd_model(self, data, target_col):
        """
        Train a Probability of Default (PD) model.
        """

        X = data.drop(columns=[target_col])
        y = data[target_col]

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        self.model = LogisticRegression(max_iter=1000)
        self.model.fit(X_train, y_train)

        predictions = self.model.predict(X_test)
        accuracy = accuracy_score(y_test, predictions)

        return accuracy

    def predict_pd(self, features_df):
        """
        Predict PD values.
        """

        if self.model is None:
            raise Exception("PD model is not trained")

        pd_values = self.model.predict_proba(features_df)[:, 1]
        return pd_values

    def calculate_ecl(self, pd_values, lgd, ead):
        """
        ECL = PD × LGD × EAD
        """

        return pd_values * lgd * ead


class ECLApp:
    def __init__(self, root):
        self.root = root
        self.root.title("ECL Engine with FLI and Macroeconomic Factors")
        self.root.geometry("1000x700")

        self.engine = ECLEngine()
        self.data = None

        self.create_widgets()

    def create_widgets(self):

        title = tk.Label(
            self.root,
            text="Expected Credit Loss (ECL) Engine",
            font=("Arial", 18, "bold")
        )
        title.pack(pady=10)

        # Upload Frame
        upload_frame = tk.Frame(self.root)
        upload_frame.pack(pady=10)

        upload_btn = tk.Button(
            upload_frame,
            text="Upload Portfolio CSV",
            command=self.load_csv,
            bg="#4CAF50",
            fg="white",
            width=25
        )
        upload_btn.grid(row=0, column=0, padx=10)

        train_btn = tk.Button(
            upload_frame,
            text="Train PD Model",
            command=self.train_model,
            bg="#2196F3",
            fg="white",
            width=25
        )
        train_btn.grid(row=0, column=1, padx=10)

        calculate_btn = tk.Button(
            upload_frame,
            text="Calculate ECL",
            command=self.calculate_ecl,
            bg="#FF9800",
            fg="white",
            width=25
        )
        calculate_btn.grid(row=0, column=2, padx=10)

        export_btn = tk.Button(
            upload_frame,
            text="Export Results",
            command=self.export_results,
            bg="#9C27B0",
            fg="white",
            width=25
        )
        export_btn.grid(row=0, column=3, padx=10)

        # Assumptions Frame
        assumptions_frame = tk.LabelFrame(
            self.root,
            text="Macroeconomic and FLI Inputs",
            padx=10,
            pady=10
        )
        assumptions_frame.pack(fill="x", padx=20, pady=10)

        # GDP
        tk.Label(assumptions_frame, text="GDP Growth (%)").grid(row=0, column=0)
        self.gdp_entry = tk.Entry(assumptions_frame)
        self.gdp_entry.insert(0, "2.5")
        self.gdp_entry.grid(row=0, column=1)

        # Inflation
        tk.Label(assumptions_frame, text="Inflation (%)").grid(row=0, column=2)
        self.inflation_entry = tk.Entry(assumptions_frame)
        self.inflation_entry.insert(0, "3.0")
        self.inflation_entry.grid(row=0, column=3)

        # Unemployment
        tk.Label(assumptions_frame, text="Unemployment (%)").grid(row=1, column=0)
        self.unemployment_entry = tk.Entry(assumptions_frame)
        self.unemployment_entry.insert(0, "5.5")
        self.unemployment_entry.grid(row=1, column=1)

        # Interest Rate
        tk.Label(assumptions_frame, text="Interest Rate (%)").grid(row=1, column=2)
        self.interest_entry = tk.Entry(assumptions_frame)
        self.interest_entry.insert(0, "4.0")
        self.interest_entry.grid(row=1, column=3)

        # FLI Multiplier
        tk.Label(assumptions_frame, text="FLI Multiplier").grid(row=2, column=0)
        self.fli_entry = tk.Entry(assumptions_frame)
        self.fli_entry.insert(0, "1.0")
        self.fli_entry.grid(row=2, column=1)

        # Results Table
        self.tree = ttk.Treeview(self.root)
        self.tree.pack(fill="both", expand=True, padx=20, pady=20)

        # Status
        self.status_label = tk.Label(
            self.root,
            text="Ready",
            anchor="w",
            fg="blue"
        )
        self.status_label.pack(fill="x")

    def load_csv(self):
        file_path = filedialog.askopenfilename(
            filetypes=[("CSV Files", "*.csv")]
        )

        if file_path:
            self.data = pd.read_csv(file_path)
            self.status_label.config(
                text=f"Loaded data: {len(self.data)} rows"
            )
            self.display_data(self.data.head(20))

    def train_model(self):

        if self.data is None:
            messagebox.showerror("Error", "Please load data first")
            return

        try:
            accuracy = self.engine.train_pd_model(
                self.data,
                target_col="DefaultFlag"
            )

            self.status_label.config(
                text=f"PD Model trained successfully | Accuracy: {accuracy:.2f}"
            )

        except Exception as e:
            messagebox.showerror("Training Error", str(e))

    def calculate_ecl(self):

        if self.data is None:
            messagebox.showerror("Error", "Please load data first")
            return

        try:
            # Economic assumptions
            gdp = float(self.gdp_entry.get())
            inflation = float(self.inflation_entry.get())
            unemployment = float(self.unemployment_entry.get())
            interest = float(self.interest_entry.get())
            fli_multiplier = float(self.fli_entry.get())

            # Features for PD prediction
            feature_cols = [
                col for col in self.data.columns
                if col not in ["DefaultFlag", "LGD", "EAD"]
            ]

            features_df = self.data[feature_cols]

            # Predict PD
            pd_values = self.engine.predict_pd(features_df)

            # Macro adjustment factor
            macro_factor = (
                1
                + (unemployment / 100)
                + (interest / 100)
                - (gdp / 100)
                + (inflation / 100)
            )

            adjusted_pd = pd_values * macro_factor * fli_multiplier

            adjusted_pd = np.clip(adjusted_pd, 0, 1)

            # Calculate ECL
            ecl_values = self.engine.calculate_ecl(
                adjusted_pd,
                self.data["LGD"],
                self.data["EAD"]
            )

            self.data["PD"] = adjusted_pd
            self.data["ECL"] = ecl_values

            total_ecl = self.data["ECL"].sum()

            self.display_data(self.data.head(50))

            self.status_label.config(
                text=f"Total Portfolio ECL: {total_ecl:,.2f}"
            )

        except Exception as e:
            messagebox.showerror("Calculation Error", str(e))

    def display_data(self, dataframe):

        self.tree.delete(*self.tree.get_children())

        self.tree["columns"] = list(dataframe.columns)
        self.tree["show"] = "headings"

        for col in dataframe.columns:
            self.tree.heading(col, text=col)
            self.tree.column(col, width=120)

        for _, row in dataframe.iterrows():
            self.tree.insert("", "end", values=list(row))

    def export_results(self):

        if self.data is None:
            messagebox.showerror("Error", "No results available")
            return

        save_path = filedialog.asksaveasfilename(
            defaultextension=".csv",
            filetypes=[("CSV Files", "*.csv")]
        )

        if save_path:
            self.data.to_csv(save_path, index=False)
            messagebox.showinfo(
                "Success",
                f"Results exported to:\n{save_path}"
            )


if __name__ == "__main__":

    root = tk.Tk()
    app = ECLApp(root)
    root.mainloop()
