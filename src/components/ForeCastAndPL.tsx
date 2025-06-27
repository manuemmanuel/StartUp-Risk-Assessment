"use client";

import { useState, useEffect } from "react";
import FinancialVisualizations from './FinancialVisualizations';
import FinancialPredictions from './FinancialPredictions';

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

const defaultSalesData = {
  unitsSold: Array(12).fill(100),
  pricePerUnit: Array(12).fill(50),
  costPerUnit: Array(12).fill(20),
};

const defaultSalaryRows = {
  rows: [],
};

const defaultExpenseRows = [
  { label: "Marketing & Promotions", values: Array(12).fill(0) },
  { label: "Utilities", values: Array(12).fill(0) },
  { label: "Customer Service", values: Array(12).fill(0) },
  { label: "Rent", values: Array(12).fill(0) },
];

export default function ForecastPL() {
  const [salesData, setSalesData] = useState(defaultSalesData);
  const [salaryRows, setSalaryRows] = useState(defaultSalaryRows);
  const [expenseRows, setExpenseRows] = useState(defaultExpenseRows);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setSalesData(loadFromStorage("sales_forecast_table", defaultSalesData));
    setSalaryRows(loadFromStorage("salary_planner", defaultSalaryRows));
  }, []);

  // Save all relevant Forecast & P&L data as a single object in localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = {
        salesData,
        salaryRows,
        expenseRows,
      };
      localStorage.setItem("forecast_pl_data", JSON.stringify(data));
    }
  }, [salesData, salaryRows, expenseRows]);

  // Compute salary totals per month
  const totalSalariesPerMonth = Array(12)
    .fill(0)
    .map((_, monthIdx) =>
      salaryRows.rows.reduce(
        (sum: number, row: any) => sum + (row.monthlySalaries?.[monthIdx] || 0),
        0
      )
    );

  const addExpenseRow = () => {
    setExpenseRows([...expenseRows, { label: "", values: Array(12).fill(0) }]);
  };

  const removeExpenseRow = (idx: number) => {
    setExpenseRows(expenseRows.filter((_, i) => i !== idx));
  };

  const handleExpenseChange = (
    rowIdx: number,
    monthIdx: number,
    value: string
  ) => {
    const updated = [...expenseRows];
    updated[rowIdx].values[monthIdx] = parseFloat(value) || 0;
    setExpenseRows(updated);
  };

  const handleLabelChange = (rowIdx: number, value: string) => {
    const updated = [...expenseRows];
    updated[rowIdx].label = value;
    setExpenseRows(updated);
  };

  const results = months.map((_, i) => {
    const no_of_customers = salesData.unitsSold[i];
    const price_per_unit = salesData.pricePerUnit[i];
    const cost_per_unit = salesData.costPerUnit[i];
    const cash_sales = no_of_customers * price_per_unit;
    const cost_of_services = no_of_customers * cost_per_unit;
    const gross_profit = cash_sales - cost_of_services;
    const salary = totalSalariesPerMonth[i];
    const additional_expenses = expenseRows.reduce(
      (sum, row) => sum + row.values[i],
      0
    );
    const total_expenses = salary + additional_expenses;
    const net_profit_or_loss = gross_profit - total_expenses;
    const gross_profit_margin = cash_sales ? gross_profit / cash_sales : 0;
    const net_profit_margin = cash_sales ? net_profit_or_loss / cash_sales : 0;

    return {
      cash_sales,
      cost_of_services,
      gross_profit,
      salary,
      total_expenses,
      net_profit_or_loss,
      gross_profit_margin,
      net_profit_margin,
    };
  });

  // Save results to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("forecast_pl_results", JSON.stringify(results));
    }
  }, [results]);

  // Don't render until client-side
  if (!isClient) {
    return (
      <div className="w-full rounded-3xl shadow-2xl border border-border bg-background/90 backdrop-blur-lg p-8 sm:p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground/80">Loading Forecast & P&L...</p>
        </div>
      </div>
    );
  }

  // Prepare data for visualizations
  const vizData = months.map((month, i) => ({
    month,
    cashSales: results[i].cash_sales,
    totalExpenses: results[i].total_expenses,
    netProfitLoss: results[i].net_profit_or_loss,
    grossProfitMargin: results[i].gross_profit_margin,
    netProfitMargin: results[i].net_profit_margin,
  }));

  return (
    <div className="space-y-12">
      {/* Financial Visualizations Section */}
      <div className="bg-background/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
          Financial Overview & Trends
        </h2>
        <FinancialVisualizations data={vizData} />
      </div>

      {/* Financial Predictions Section */}
      <div className="bg-background/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
          AI-Powered Financial Predictions
        </h2>
        <FinancialPredictions data={vizData} />
      </div>

      {/* Detailed Financial Table Section */}
      <div className="bg-background/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
          Detailed Monthly Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-foreground bg-transparent">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 font-semibold text-lg">Section</th>
                {months.map((m) => (
                  <th key={m} className="p-3 font-semibold text-center">
                    {m}
                  </th>
                ))}
                <th className="w-16"></th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              <tr className="bg-primary/10 font-semibold border-b border-border/50">
                <td className="p-3 text-lg">Cash Sales</td>
                {results.map((r, i) => (
                  <td key={i} className="p-3 text-center font-mono">
                    ₹{r.cash_sales.toLocaleString("en-IN")}
                  </td>
                ))}
                <td></td>
              </tr>

              <tr className="border-b border-border/30">
                <td className="p-3">Cost of Services</td>
                {results.map((r, i) => (
                  <td key={i} className="p-3 text-center font-mono text-red-600">
                    ₹{r.cost_of_services.toLocaleString("en-IN")}
                  </td>
                ))}
                <td></td>
              </tr>

              <tr className="bg-primary/10 font-semibold border-b border-border/50">
                <td className="p-3 text-lg">Gross Profit</td>
                {results.map((r, i) => (
                  <td key={i} className="p-3 text-center font-mono text-green-600">
                    ₹{r.gross_profit.toLocaleString("en-IN")}
                  </td>
                ))}
                <td></td>
              </tr>

              <tr className="border-b border-border/30">
                <td className="p-3">Salary</td>
                {totalSalariesPerMonth.map((val: number, i: number) => (
                  <td key={i} className="p-3 text-center font-mono text-red-600">
                    ₹{val.toLocaleString("en-IN")}
                  </td>
                ))}
                <td></td>
              </tr>

              {expenseRows.map((row, rowIdx) => (
                <tr key={rowIdx} className="border-b border-border/20">
                  <td className="p-3">
                    <input
                      type="text"
                      className="border border-border rounded-lg p-2 w-full bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={row.label}
                      onChange={(e) =>
                        handleLabelChange(rowIdx, e.target.value)
                      }
                      placeholder="Expense category"
                    />
                  </td>
                  {row.values.map((val, i) => (
                    <td key={i} className="p-3">
                      <input
                        type="number"
                        min={0}
                        className="border border-border rounded-lg p-2 w-full text-right font-mono bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={val}
                        onChange={(e) =>
                          handleExpenseChange(rowIdx, i, e.target.value)
                        }
                        placeholder="0"
                      />
                    </td>
                  ))}
                  <td className="p-3">
                    <button
                      type="button"
                      className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                      onClick={() => removeExpenseRow(rowIdx)}
                      aria-label="Remove row"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan={months.length + 1} className="p-4">
                  <button
                    type="button"
                    className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors"
                    onClick={addExpenseRow}
                  >
                    + Add New Expense Row
                  </button>
                </td>
              </tr>

              <tr className="bg-secondary/80 font-semibold border-b border-border/50">
                <td className="p-3 text-lg">Total Expenses</td>
                {results.map((r, i) => (
                  <td key={i} className="p-3 text-center font-mono text-red-600">
                    ₹{r.total_expenses.toLocaleString("en-IN")}
                  </td>
                ))}
                <td></td>
              </tr>

              <tr className="bg-accent/50 font-semibold border-b border-border/50">
                <td className="p-3 text-lg">Net Profit/Loss</td>
                {results.map((r, i) => (
                  <td key={i} className={`p-3 text-center font-mono text-lg ${r.net_profit_or_loss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{r.net_profit_or_loss.toLocaleString("en-IN")}
                  </td>
                ))}
                <td></td>
              </tr>

              <tr className="border-b border-border/30">
                <td className="p-3">Gross Profit Margin</td>
                {results.map((r, i) => (
                  <td key={i} className="p-3 text-center font-mono text-green-600">
                    {(r.gross_profit_margin * 100).toFixed(2)}%
                  </td>
                ))}
                <td></td>
              </tr>

              <tr className="border-b border-border/30">
                <td className="p-3">Net Profit Margin</td>
                {results.map((r, i) => (
                  <td key={i} className={`p-3 text-center font-mono ${r.net_profit_margin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {(r.net_profit_margin * 100).toFixed(2)}%
                  </td>
                ))}
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
