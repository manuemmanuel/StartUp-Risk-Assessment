'use client';

import { useState } from 'react';

// You can swap this for any icon you like
const TableIcon = () => (
  <span className="inline-block text-3xl align-middle mr-2 text-primary">🧮</span>
);

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
    <div className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/10 to-background py-12 px-2 sm:px-0">
      <div className="w-full max-w-2xl rounded-3xl shadow-2xl border border-border bg-background/90 backdrop-blur-lg p-8 sm:p-12">
        <div className="flex items-center mb-8">
          <TableIcon />
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Variable Costs of Products</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border mb-8 bg-secondary/60">
          <table className="w-full min-w-[400px] text-left text-foreground bg-transparent">
            <thead>
              <tr className="bg-secondary/80">
                <th className="p-3 font-semibold border-b border-border">Item</th>
                <th className="p-3 font-semibold border-b border-border">Cost (₹)</th>
              </tr>
            </thead>
            <tbody>
              {costItems.map(item => (
                <tr key={item.id} className="hover:bg-accent/40 transition-colors">
                  <td className="p-2 border-b border-border">
                    <input
                      type="text"
                      value={item.name}
                      onChange={e => handleChange(item.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background/80 text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-sans shadow-sm"
                      placeholder="Enter item name"
                    />
                  </td>
                  <td className="p-2 border-b border-border">
                    <input
                      type="number"
                      value={item.cost}
                      onChange={e => handleChange(item.id, 'cost', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background/80 text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-sans shadow-sm"
                      placeholder="₹ 0"
                      min="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={addNewRow}
          className="mb-8 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold shadow-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        >
          + Add New Row
        </button>
        <div className="text-right font-extrabold text-2xl text-primary bg-secondary/80 rounded-lg px-8 py-5 border border-border shadow">
          Cost of Goods Sold (COGS) per Unit: <span className="text-primary">₹ {totalCOGS.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

