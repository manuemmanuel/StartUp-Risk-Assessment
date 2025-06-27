'use client';

import { useState } from 'react';

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function SalesForecastTable() {
  // State for editable fields
  const [unitsSold, setUnitsSold] = useState(Array(12).fill(0));
  const [pricePerUnit, setPricePerUnit] = useState(Array(12).fill(0));
  const [cogs, setCogs] = useState(Array(12).fill(0));

  // Calculated fields
  const revenue = unitsSold.map((units, i) => units * pricePerUnit[i]);
  const costPerUnit = unitsSold.map((units, i) => units === 0 ? 0 : cogs[i] / units);

  // Totals
  const totalUnits = unitsSold.reduce((a, b) => a + b, 0);
  const totalRevenue = revenue.reduce((a, b) => a + b, 0);
  const totalCOGS = cogs.reduce((a, b) => a + b, 0);
  const totalCostPerUnit = totalUnits === 0 ? 0 : totalCOGS / totalUnits;

  // Handlers
  const handleArrayChange = (setter: any, idx: number, value: string) => {
    setter((prev: number[]) => prev.map((v, i) => i === idx ? parseFloat(value) || 0 : v));
  };

  return (
    <div className="w-full max-w-5xl rounded-3xl shadow-2xl border border-border bg-background/90 backdrop-blur-lg p-8 sm:p-12 mx-auto">
      <div className="flex items-center mb-8">
        <span className="inline-block text-3xl align-middle mr-2 text-primary">📈</span>
        <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Sales Forecast</h2>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border bg-secondary/40">
        <table className="w-full min-w-[900px] text-center">
          <thead>
            <tr className="bg-secondary/90">
              <th className="text-left px-3 py-3 border-b border-border font-bold text-lg text-foreground">Product category</th>
              {months.map(m => (
                <th key={m} className="px-3 py-3 border-b border-border font-bold text-lg text-foreground">{m}</th>
              ))}
              <th className="px-3 py-3 border-b border-border font-bold text-lg text-foreground">Total</th>
            </tr>
          </thead>
          <tbody>
            {/* No of Units Sold */}
            <tr className="bg-yellow-200">
              <td className="text-left font-semibold px-3 py-3 border-b border-border text-base text-foreground">No of Units sold</td>
              {unitsSold.map((val, i) => (
                <td key={i} className="px-2 py-2 border-b border-border">
                  <input
                    type="number"
                    value={val}
                    min="0"
                    onChange={e => handleArrayChange(setUnitsSold, i, e.target.value)}
                    className="w-20 px-3 py-2 rounded-lg border border-border bg-yellow-50 text-foreground text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                  />
                </td>
              ))}
              <td className="bg-yellow-300 font-bold text-lg">{totalUnits}</td>
            </tr>
            {/* Revenue */}
            <tr className="bg-primary/20">
              <td className="text-left font-semibold px-3 py-3 border-b border-border text-base text-foreground">Revenue</td>
              {revenue.map((val, i) => (
                <td key={i} className="px-2 py-2 border-b border-border text-base font-semibold text-foreground">{val.toLocaleString()}</td>
              ))}
              <td className="bg-primary/30 font-bold text-lg">{totalRevenue.toLocaleString()}</td>
            </tr>
            {/* Price Per Unit */}
            <tr className="bg-accent/30">
              <td className="text-left font-semibold px-3 py-3 border-b border-border text-base text-foreground">Price Per Unit</td>
              {pricePerUnit.map((val, i) => (
                <td key={i} className="px-2 py-2 border-b border-border">
                  <input
                    type="number"
                    value={val}
                    min="0"
                    onChange={e => handleArrayChange(setPricePerUnit, i, e.target.value)}
                    className="w-20 px-3 py-2 rounded-lg border border-border bg-accent/10 text-foreground text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                  />
                </td>
              ))}
              <td className="bg-accent/40 font-bold text-lg">{totalUnits === 0 ? '#DIV/0!' : (totalRevenue / totalUnits).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
            </tr>
            {/* COGS */}
            <tr className="bg-red-200">
              <td className="text-left font-semibold px-3 py-3 border-b border-border text-base text-foreground">COGS</td>
              {cogs.map((val, i) => (
                <td key={i} className="px-2 py-2 border-b border-border">
                  <input
                    type="number"
                    value={val}
                    min="0"
                    onChange={e => handleArrayChange(setCogs, i, e.target.value)}
                    className="w-20 px-3 py-2 rounded-lg border border-border bg-red-50 text-foreground text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                  />
                </td>
              ))}
              <td className="bg-red-300 font-bold text-lg">{totalCOGS.toLocaleString()}</td>
            </tr>
            {/* Cost Per Unit */}
            <tr className="bg-accent/30">
              <td className="text-left font-semibold px-3 py-3 border-b border-border text-base text-foreground">Cost Per Unit</td>
              {costPerUnit.map((val, i) => (
                <td key={i} className="px-2 py-2 border-b border-border text-base font-semibold text-foreground">{unitsSold[i] === 0 ? '#DIV/0!' : val.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
              ))}
              <td className="bg-accent/40 font-bold text-lg">{totalUnits === 0 ? '#DIV/0!' : totalCostPerUnit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 