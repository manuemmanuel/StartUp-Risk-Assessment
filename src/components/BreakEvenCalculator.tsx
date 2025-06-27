'use client';

import { useState } from 'react';

export default function BreakEvenCalculator() {
  const [pricePerUnit, setPricePerUnit] = useState(8);
  const [costPerUnit, setCostPerUnit] = useState(0);
  const [fixedCosts, setFixedCosts] = useState(0);
  const [totalSales, setTotalSales] = useState(712);
  const [operatingExpenses, setOperatingExpenses] = useState(0);

  const grossProfit = pricePerUnit - costPerUnit;
  const grossMarginPercent = pricePerUnit !== 0 ? (grossProfit / pricePerUnit) * 100 : 0;
  const contributionMargin = grossMarginPercent; // same as gross margin in this case
  const breakEvenUnits = grossProfit !== 0 ? Math.ceil(fixedCosts / grossProfit) : 0;
  const breakEvenSales = grossProfit !== 0 ? breakEvenUnits * pricePerUnit : 0;

  const yearlyBreakEven = operatingExpenses / (grossMarginPercent / 100 || 1);
  const monthlyBreakEven = yearlyBreakEven / 12 || 0;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl border shadow">
      <h2 className="text-2xl font-bold mb-4">Break-even Analysis</h2>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="font-semibold">Average Sales Price per Unit (₹)</label>
          <input type="number" value={pricePerUnit} onChange={e => setPricePerUnit(+e.target.value)} className="w-full border px-3 py-1 rounded" />
        </div>
        <div>
          <label className="font-semibold">Average Cost per Unit (₹)</label>
          <input type="number" value={costPerUnit} onChange={e => setCostPerUnit(+e.target.value)} className="w-full border px-3 py-1 rounded" />
        </div>
        <div>
          <label className="font-semibold">Fixed Costs for the Year (₹)</label>
          <input type="number" value={fixedCosts} onChange={e => setFixedCosts(+e.target.value)} className="w-full border px-3 py-1 rounded" />
        </div>
        <div>
          <label className="font-semibold">Total Sales for the Year (₹)</label>
          <input type="number" value={totalSales} onChange={e => setTotalSales(+e.target.value)} className="w-full border px-3 py-1 rounded" />
        </div>
        <div>
          <label className="font-semibold">Operating Expenses (₹)</label>
          <input type="number" value={operatingExpenses} onChange={e => setOperatingExpenses(+e.target.value)} className="w-full border px-3 py-1 rounded" />
        </div>
      </div>

      {/* Output */}
      <div className="space-y-2 text-gray-800">
        <p><strong>Gross Profit Margin:</strong> {grossMarginPercent.toFixed(2)}%</p>
        <p><strong>Contribution Margin:</strong> {contributionMargin.toFixed(2)}%</p>
        <p><strong>Gross Profit for the Year:</strong> ₹{grossProfit * breakEvenUnits}</p>
        <p><strong>Sales Required to Break Even:</strong> ₹{breakEvenSales}</p>
        <p><strong>Number of Unit Sales to Break Even:</strong> {breakEvenUnits}</p>
        <p><strong>Gross Margin / Total Sales:</strong> {(grossProfit * breakEvenUnits / totalSales * 100 || 0).toFixed(2)}%</p>
        <p><strong>Yearly Break-even Amount:</strong> ₹{yearlyBreakEven.toFixed(2)}</p>
        <p><strong>Monthly Break-even Amount:</strong> ₹{monthlyBreakEven.toFixed(2)}</p>
      </div>

      {/* Hint */}
      <div className="mt-6 bg-yellow-50 p-4 border-l-4 border-yellow-400">
        <p className="text-sm text-yellow-700">
          The break-even point is the number of units you need to sell to cover your costs. Use this tool to experiment with different prices, costs, or expenses and explore “what if” scenarios.
        </p>
      </div>
    </div>
  );
}
