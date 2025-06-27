"use client";

import { useState, useEffect } from "react";

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

  useEffect(() => {
    setSalesData(loadFromStorage("sales_forecast_table", defaultSalesData));
    setSalaryRows(loadFromStorage("salary_planner", defaultSalaryRows));
  }, []);

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

  return (
    <div className="max-w-9xl mx-auto p-6 shadow rounded-lg">
      <div className="w-full rounded-3xl shadow-2xl border border-border bg-background/90 backdrop-blur-lg p-8 sm:p-12">
        <h1 className="text-2xl font-bold mb-4">
          Forecast & Profit & Loss (P&L)
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-foreground bg-transparent">
            <thead>
              <tr>
                <th className="p-2">Section</th>
                {months.map((m) => (
                  <th key={m} className="p-2">
                    {m}
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-secondary/80 font-semibold">
                <td>Cash Sales</td>
                {results.map((r, i) => (
                  <td key={i} className="p-2">
                    {r.cash_sales.toLocaleString("en-IN")}
                  </td>
                ))}
                <td></td>
              </tr>

              <tr>
                <td>Cost of Services</td>
                {results.map((r, i) => (
                  <td key={i} className="p-2">
                    {r.cost_of_services.toLocaleString("en-IN")}
                  </td>
                ))}
                <td></td>
              </tr>

              <tr className="bg-secondary/80 font-semibold">
                <td>Gross Profit</td>
                {results.map((r, i) => (
                  <td key={i} className="p-2">
                    {r.gross_profit.toLocaleString("en-IN")}
                  </td>
                ))}
                <td></td>
              </tr>

              <tr>
                <td>Salary</td>
                {totalSalariesPerMonth.map((val: number, i: number) => (
                  <td key={i} className="p-2">
                    {val.toLocaleString("en-IN")}
                  </td>
                ))}
                <td></td>
              </tr>

              {expenseRows.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  <td>
                    <input
                      type="text"
                      className="border rounded p-1 w-full"
                      value={row.label}
                      onChange={(e) =>
                        handleLabelChange(rowIdx, e.target.value)
                      }
                    />
                  </td>
                  {row.values.map((val, i) => (
                    <td key={i}>
                      <input
                        type="number"
                        min={0}
                        className="border rounded p-1 w-full text-right"
                        value={val}
                        onChange={(e) =>
                          handleExpenseChange(rowIdx, i, e.target.value)
                        }
                      />
                    </td>
                  ))}
                  <td>
                    <button
                      type="button"
                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => removeExpenseRow(rowIdx)}
                      aria-label="Remove row"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan={months.length + 1}>
                  <button
                    type="button"
                    className="mt-2 px-4 py-1 bg-primary text-white rounded"
                    onClick={addExpenseRow}
                  >
                    + Add New Row
                  </button>
                </td>
              </tr>

              <tr className="bg-secondary/80 font-semibold">
                <td>Total Expenses</td>
                {results.map((r, i) => (
                  <td key={i} className="p-2">
                    {r.total_expenses.toLocaleString("en-IN")}
                  </td>
                ))}
                <td></td>
              </tr>

              <tr>
                <td>Net Profit/Loss</td>
                {results.map((r, i) => (
                  <td key={i} className="p-2">
                    {r.net_profit_or_loss.toLocaleString("en-IN")}
                  </td>
                ))}
                <td></td>
              </tr>

              <tr>
                <td>Gross Profit Margin</td>
                {results.map((r, i) => (
                  <td key={i} className="p-2">
                    {(r.gross_profit_margin * 100).toFixed(2)}%
                  </td>
                ))}
                <td></td>
              </tr>

              <tr>
                <td>Net Profit Margin</td>
                {results.map((r, i) => (
                  <td key={i} className="p-2">
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
