'use client';

import { useState } from 'react';

const defaultYears = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];

type Row = {
  id: number;
  type: 'capital' | 'expense';
  label: string;
  values: number[];
};

export default function FinancialProjection() {
  const [sales, setSales] = useState<number[]>([6, 13, 16, 23, -12]);
  const [price, setPrice] = useState<number[]>([8, 8, 10, 10, 10]);
  const [cost, setCost] = useState<number[]>([0, 0, 0, 0, 0]);

  const [rows, setRows] = useState<Row[]>([
    { id: 1, type: 'expense', label: 'Salaries', values: Array(5).fill(0) },
    { id: 2, type: 'expense', label: 'Marketing and Promotion', values: Array(5).fill(0) },
    { id: 3, type: 'expense', label: 'Digital Marketing & Customer Services', values: Array(5).fill(0) },
    { id: 4, type: 'expense', label: 'Utilities', values: Array(5).fill(0) },
    { id: 5, type: 'expense', label: 'Office Supplies', values: Array(5).fill(0) },
    { id: 6, type: 'expense', label: 'Rent', values: Array(5).fill(0) },
  ]);

  const addRow = (type: 'capital' | 'expense') => {
    const newId = rows.length + 1;
    setRows([
      ...rows,
      { id: newId, type, label: type === 'capital' ? 'New Capital Cost' : 'New Expense', values: Array(5).fill(0) },
    ]);
  };

  const updateRow = (id: number, yearIndex: number, value: string) => {
    setRows(prev =>
      prev.map(row =>
        row.id === id
          ? {
              ...row,
              values: row.values.map((v, i) => (i === yearIndex ? parseFloat(value) || 0 : v)),
            }
          : row
      )
    );
  };

  const updateLabel = (id: number, value: string) => {
    setRows(prev => prev.map(row => (row.id === id ? { ...row, label: value } : row)));
  };

  const totalRevenue = sales.map((n, i) => n * price[i]);
  const grossProfit = sales.map((n, i) => n * (price[i] - cost[i]));

  const totalExpenses = (yearIndex: number) =>
    rows.filter(r => r.type === 'expense').reduce((sum, row) => sum + row.values[yearIndex], 0);

  const ebitda = grossProfit.map((gp, i) => gp - totalExpenses(i));

  return (
    <div className="p-6 max-w-full overflow-auto">
      <h2 className="text-2xl font-bold mb-4">5-Year Financial Projection</h2>

      <table className="border border-gray-300 w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1 text-left">Metric</th>
            {defaultYears.map(year => (
              <th key={year} className="border px-2 py-1 text-right">{year}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Sales */}
          <tr>
            <td className="border px-2 py-1">Number of Sales</td>
            {sales.map((val, i) => (
              <td key={i} className="border px-2 py-1 text-right">
                <input value={val} onChange={e => setSales(s => s.map((v, j) => j === i ? +e.target.value : v))} className="w-full text-right" />
              </td>
            ))}
          </tr>
          <tr>
            <td className="border px-2 py-1">Avg Price per Unit</td>
            {price.map((val, i) => (
              <td key={i} className="border px-2 py-1 text-right">
                <input value={val} onChange={e => setPrice(p => p.map((v, j) => j === i ? +e.target.value : v))} className="w-full text-right" />
              </td>
            ))}
          </tr>
          <tr>
            <td className="border px-2 py-1">Avg Cost per Unit</td>
            {cost.map((val, i) => (
              <td key={i} className="border px-2 py-1 text-right">
                <input value={val} onChange={e => setCost(c => c.map((v, j) => j === i ? +e.target.value : v))} className="w-full text-right" />
              </td>
            ))}
          </tr>
          <tr className="bg-green-50 font-medium">
            <td className="border px-2 py-1">Total Revenue (₹)</td>
            {totalRevenue.map((val, i) => (
              <td key={i} className="border px-2 py-1 text-right">₹ {val}</td>
            ))}
          </tr>
          <tr className="bg-green-100 font-medium">
            <td className="border px-2 py-1">Gross Profit (₹)</td>
            {grossProfit.map((val, i) => (
              <td key={i} className="border px-2 py-1 text-right">₹ {val}</td>
            ))}
          </tr>

          {/* Expenses */}
          {rows.map(row => (
            <tr key={row.id}>
              <td className="border px-2 py-1">
                <input
                  value={row.label}
                  onChange={e => updateLabel(row.id, e.target.value)}
                  className="w-full"
                />
              </td>
              {row.values.map((val, i) => (
                <td key={i} className="border px-2 py-1 text-right">
                  <input
                    type="number"
                    value={val}
                    onChange={e => updateRow(row.id, i, e.target.value)}
                    className="w-full text-right"
                  />
                </td>
              ))}
            </tr>
          ))}

          <tr className="bg-yellow-100 font-semibold">
            <td className="border px-2 py-1">Total Expenses (₹)</td>
            {defaultYears.map((_, i) => (
              <td key={i} className="border px-2 py-1 text-right">₹ {totalExpenses(i)}</td>
            ))}
          </tr>
          <tr className="bg-blue-100 font-bold">
            <td className="border px-2 py-1">Earnings (EBITDA)</td>
            {ebitda.map((val, i) => (
              <td key={i} className="border px-2 py-1 text-right">₹ {val}</td>
            ))}
          </tr>
        </tbody>
      </table>

      <div className="mt-4 flex gap-4">
        <button onClick={() => addRow('expense')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ Add Expense</button>
        <button onClick={() => addRow('capital')} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">+ Add Capital Cost</button>
      </div>
    </div>
  );
}
