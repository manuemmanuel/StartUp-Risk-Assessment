'use client';

import { useState } from 'react';

type CostItem = {
  id: number;
  name: string;
  cost: number;
};

export default function VariableCostsTable() {
  const [costItems, setCostItems] = useState<CostItem[]>([
    { id: 1, name: 'Raw material', cost: 0 },
    { id: 2, name: 'Packaging', cost: 0 },
    { id: 3, name: 'Labour cost', cost: 0 },
  ]);

  const handleChange = (id: number, field: 'name' | 'cost', value: string) => {
    setCostItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, [field]: field === 'cost' ? parseFloat(value) || 0 : value }
          : item
      )
    );
  };

  const addNewRow = () => {
    const newId = costItems.length + 1;
    setCostItems(prev => [...prev, { id: newId, name: '', cost: 0 }]);
  };

  const totalCOGS = costItems.reduce((acc, item) => acc + item.cost, 0);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Variable Costs of Products</h2>
      <table className="w-full border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Item</th>
            <th className="p-2 border">Cost (₹)</th>
          </tr>
        </thead>
        <tbody>
          {costItems.map(item => (
            <tr key={item.id}>
              <td className="p-2 border">
                <input
                  type="text"
                  value={item.name}
                  onChange={e => handleChange(item.id, 'name', e.target.value)}
                  className="w-full border px-2 py-1"
                  placeholder="Enter item name"
                />
              </td>
              <td className="p-2 border">
                <input
                  type="number"
                  value={item.cost}
                  onChange={e => handleChange(item.id, 'cost', e.target.value)}
                  className="w-full border px-2 py-1"
                  placeholder="₹ 0"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addNewRow}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Add New Row
      </button>
      <div className="text-right font-semibold text-lg">
        Cost of Goods Sold (COGS) per Unit: ₹ {totalCOGS.toFixed(2)}
      </div>
    </div>
  );
}

