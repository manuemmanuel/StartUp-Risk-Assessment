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
    <div className="overflow-x-auto p-4 max-w-full">
      <h2 className="text-2xl font-bold mb-4">Salaries Planner</h2>
      <table className="min-w-max border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Employee</th>
            {months.map((month) => (
              <th key={month} className="border p-2">
                {month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <tr key={row.id}>
              <td className="border p-1">
                <input
                  value={row.name}
                  onChange={(e) => updateName(row.id, e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              {row.monthlySalaries.map((salary, idx) => (
                <td key={idx} className="border p-1">
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => updateCell(row.id, idx, e.target.value)}
                    className="w-full px-2 py-1 border rounded text-right"
                    placeholder="₹ 0"
                  />
                </td>
              ))}
            </tr>
          ))}
          <tr className="bg-yellow-100 font-semibold">
            <td className="border p-2 text-right">Total Salaries</td>
            {months.map((_, idx) => (
              <td key={idx} className="border p-2 text-right">
                ₹ {totalPerMonth(idx).toLocaleString()}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <button
        onClick={addNewRow}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Add Employee
      </button>
    </div>
  );
}
