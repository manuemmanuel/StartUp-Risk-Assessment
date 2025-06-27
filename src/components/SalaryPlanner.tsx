'use client';

import { useState } from 'react';

type SalaryRow = {
  id: number;
  name: string;
  monthlySalaries: number[];
};

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function SalaryPlanner() {
  const [rows, setRows] = useState<SalaryRow[]>([
    { id: 1, name: 'Saylee - CEO', monthlySalaries: Array(12).fill(0) },
    { id: 2, name: 'Suvendu - COO', monthlySalaries: Array(12).fill(0) },
    { id: 3, name: 'Founder 3 - CMO', monthlySalaries: Array(12).fill(0) },
  ]);

  const addNewRow = () => {
    const newId = rows.length + 1;
    setRows([...rows, { id: newId, name: `Emp ${newId}`, monthlySalaries: Array(12).fill(0) }]);
  };

  const updateCell = (id: number, monthIndex: number, value: string) => {
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        const updatedSalaries = [...row.monthlySalaries];
        updatedSalaries[monthIndex] = parseFloat(value) || 0;
        return { ...row, monthlySalaries: updatedSalaries };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const updateName = (id: number, name: string) => {
    setRows(prev =>
      prev.map(row => (row.id === id ? { ...row, name } : row))
    );
  };

  const totalPerMonth = (monthIndex: number) =>
    rows.reduce((sum, row) => sum + row.monthlySalaries[monthIndex], 0);

  return (
    <div className="overflow-x-auto p-4 max-w-full">
      <h2 className="text-2xl font-bold mb-4">Salaries Planner</h2>
      <table className="min-w-max border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Employee</th>
            {months.map(month => (
              <th key={month} className="border p-2">{month}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              <td className="border p-1">
                <input
                  value={row.name}
                  onChange={e => updateName(row.id, e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              {row.monthlySalaries.map((salary, idx) => (
                <td key={idx} className="border p-1">
                  <input
                    type="number"
                    value={salary}
                    onChange={e => updateCell(row.id, idx, e.target.value)}
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
