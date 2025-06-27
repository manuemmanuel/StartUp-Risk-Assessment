"use client";

import { useEffect, useState } from "react";

type ExpenseRow = { label: string; values: number[] };

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

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

export default function BreakEvenAnalysis() {
  const [salesData, setSalesData] = useState(() =>
    loadFromStorage("sales_forecast_table", {
      unitsSold: Array(12).fill(0),
      pricePerUnit: Array(12).fill(0),
      costPerUnit: Array(12).fill(0),
    })
  );

  const [salaryRows, setSalaryRows] = useState(() =>
    loadFromStorage("salary_planner", { rows: [] })
  );

  const [expenseRows, setExpenseRows] = useState<ExpenseRow[]>(() =>
    loadFromStorage("forecast_expense_rows", [])
  );

  const yearlyUnits = salesData.unitsSold.reduce((a, b) => a + b, 0);
  const yearlyRevenue = salesData.unitsSold.reduce(
    (sum, val, i) => sum + val * salesData.pricePerUnit[i],
    0
  );
  const yearlyCOGS = salesData.unitsSold.reduce(
    (sum, val, i) => sum + val * salesData.costPerUnit[i],
    0
  );
  const grossProfit = yearlyRevenue - yearlyCOGS;
  const grossMarginPct = yearlyRevenue
    ? (grossProfit / yearlyRevenue) * 100
    : 0;

  const totalSalaries = Array(12)
    .fill(0)
    .map((_, monthIdx) =>
      salaryRows.rows.reduce(
        (sum: number, row: any) => sum + (row.monthlySalaries?.[monthIdx] || 0),
        0
      )
    );

  const totalExpenses = Array(12)
    .fill(0)
    .map((_, monthIdx) =>
      expenseRows.reduce((sum, row) => sum + (row.values?.[monthIdx] || 0), 0)
    );

  const totalFixedExpenses =
    totalSalaries.reduce((a, b) => a + b, 0) +
    totalExpenses.reduce((a, b) => a + b, 0);

  const contributionMarginPct = yearlyRevenue
    ? ((yearlyRevenue - yearlyCOGS) / yearlyRevenue) * 100
    : 0;

  const breakevenSales = contributionMarginPct
    ? totalFixedExpenses / (contributionMarginPct / 100)
    : 0;

  const breakevenUnits = yearlyRevenue
    ? breakevenSales / (yearlyRevenue / yearlyUnits || 1)
    : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Break-Even Analysis</h2>

      <table className="table-auto w-full text-left border-collapse">
        <tbody>
          <tr className="border-b">
            <td className="py-2 font-semibold">Average Sales Price per Unit</td>
            <td>
              ₹ {yearlyUnits ? (yearlyRevenue / yearlyUnits).toFixed(2) : "0"}
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-semibold">Average Cost per Unit</td>
            <td>
              ₹ {yearlyUnits ? (yearlyCOGS / yearlyUnits).toFixed(2) : "0"}
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-semibold">Gross Profit Margin</td>
            <td>{grossMarginPct.toFixed(2)}%</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-semibold">
              Total Fixed Costs (Salaries + Expenses)
            </td>
            <td>₹ {totalFixedExpenses.toLocaleString("en-IN")}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-semibold">Contribution Margin %</td>
            <td>{contributionMarginPct.toFixed(2)}%</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-semibold">Breakeven Sales (₹)</td>
            <td>
              ₹{" "}
              {breakevenSales.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-semibold">Breakeven Units</td>
            <td>{Math.ceil(breakevenUnits)}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-semibold">Monthly Breakeven Sales</td>
            <td>
              ₹{" "}
              {(breakevenSales / 12).toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
