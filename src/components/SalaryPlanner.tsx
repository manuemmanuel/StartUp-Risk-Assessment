"use client";

import { useState, useEffect } from "react";

type SalaryRow = {
  id: number;
  name: string;
  monthlySalaries: number[];
};

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

function saveToStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export default function SalaryPlanner() {
  const STORAGE_KEY = "salary_planner";

  const defaultData = {
    rows: [
      { id: 1, name: "Saylee - CEO", monthlySalaries: Array(12).fill(0) },
      { id: 2, name: "Suvendu - COO", monthlySalaries: Array(12).fill(0) },
      { id: 3, name: "Founder 3 - CMO", monthlySalaries: Array(12).fill(0) },
    ],
  };

  const [data, setData] = useState(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setData(loadFromStorage(STORAGE_KEY, defaultData));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    saveToStorage(STORAGE_KEY, data);
  }, [data]);

  const addNewRow = () => {
    const newId = data.rows.length + 1;
    const newRow: SalaryRow = {
      id: newId,
      name: `Emp ${newId}`,
      monthlySalaries: Array(12).fill(0),
    };
    setData((prev) => ({
      ...prev,
      rows: [...prev.rows, newRow],
    }));
  };

  const updateCell = (id: number, monthIndex: number, value: string) => {
    setData((prev) => ({
      ...prev,
      rows: prev.rows.map((row) =>
        row.id === id
          ? {
              ...row,
              monthlySalaries: row.monthlySalaries.map((v, i) =>
                i === monthIndex ? parseFloat(value) || 0 : v
              ),
            }
          : row
      ),
    }));
  };

  const updateName = (id: number, name: string) => {
    setData((prev) => ({
      ...prev,
      rows: prev.rows.map((row) => (row.id === id ? { ...row, name } : row)),
    }));
  };

  const totalPerMonth = (monthIndex: number) =>
    data.rows.reduce((sum, row) => sum + row.monthlySalaries[monthIndex], 0);

  if (!isLoaded) return null;

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-foreground bg-transparent">
          <thead>
            <tr className="border-b border-border">
              <th className="p-3 font-semibold text-lg">Employee</th>
              {months.map((month) => (
                <th key={month} className="p-3 font-semibold text-center">
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="space-y-2">
            {data.rows.map((row) => (
              <tr key={row.id} className="border-b border-border/30">
                <td className="p-3">
                  <input
                    value={row.name}
                    onChange={(e) => updateName(row.id, e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                    placeholder="Employee name"
                  />
                </td>
                {row.monthlySalaries.map((salary, idx) => (
                  <td key={idx} className="p-3">
                    <input
                      type="number"
                      value={salary}
                      onChange={(e) => updateCell(row.id, idx, e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-right text-foreground font-mono"
                      placeholder="0"
                    />
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-primary/10 font-semibold border-b border-border/50">
              <td className="p-3 text-lg">Total Salaries</td>
              {months.map((_, idx) => (
                <td key={idx} className="p-3 text-center font-mono text-lg">
                  ₹{totalPerMonth(idx).toLocaleString()}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={addNewRow}
          className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          + Add Employee
        </button>
      </div>
    </div>
  );
}
