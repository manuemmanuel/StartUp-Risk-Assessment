'use client';

import { useState } from 'react';

// You can swap this for any icon you like
const TableIcon = () => (
  <span className="inline-block text-3xl align-middle mr-3 text-primary">🧮</span>
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
    <div className="w-full">
      <div className="flex items-center mb-8">
        <TableIcon />
        <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Variable Costs of Products</h2>
      </div>
      
      <div className="overflow-x-auto rounded-xl border border-border bg-background/30 mb-8">
        <table className="w-full min-w-[400px] text-left text-foreground bg-transparent">
          <thead>
            <tr className="bg-primary/10 border-b border-border">
              <th className="p-4 font-semibold border-b border-border text-lg">Item</th>
              <th className="p-4 font-semibold border-b border-border text-lg">Cost (₹)</th>
            </tr>
          </thead>
          <tbody>
            {costItems.map(item => (
              <tr key={item.id} className="hover:bg-accent/20 transition-colors border-b border-border/30">
                <td className="p-3 border-b border-border/30">
                  <input
                    type="text"
                    value={item.name}
                    onChange={e => handleChange(item.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-sans shadow-sm"
                    placeholder="Enter item name"
                  />
                </td>
                <td className="p-3 border-b border-border/30">
                  <input
                    type="number"
                    value={item.cost}
                    onChange={e => handleChange(item.id, 'cost', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono shadow-sm"
                    placeholder="0"
                    min="0"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="text-center mb-8">
        <button
          onClick={addNewRow}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold shadow-lg hover:bg-primary/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          + Add New Row
        </button>
      </div>
      
      <div className="text-center font-extrabold text-2xl text-foreground bg-primary/10 rounded-xl px-8 py-6 border border-border/50 shadow-lg">
        Cost of Goods Sold (COGS) per Unit: <span className="text-primary font-mono">₹{totalCOGS.toFixed(2)}</span>
      </div>
    </div>
  );
}

