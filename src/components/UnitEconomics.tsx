'use client';

import { useState, useMemo } from 'react';

export default function UnitEconomics() {
  const [revenue, setRevenue] = useState(119);
  const [cogs, setCogs] = useState(0);
  const [opCost, setOpCost] = useState(0);
  const [arpu, setArpu] = useState(3);
  const [cac, setCac] = useState(0);
  const [purchases, setPurchases] = useState(5000);
  const [uniqueCustomers, setUniqueCustomers] = useState(100);
  const [custStart, setCustStart] = useState(0);
  const [custEnd, setCustEnd] = useState(0);
  const [customRows, setCustomRows] = useState<{ label: string, value: number }[]>([]);

  const grossProfit = revenue - cogs;
  const grossMargin = revenue !== 0 ? (grossProfit / revenue) * 100 : 0;
  const operatingProfit = revenue - opCost;

  const apv = revenue / purchases || 0;
  const apf = purchases / uniqueCustomers || 0;
  const churnRate = custStart !== 0 ? (custStart - custEnd) / custStart : 0;
  const acl = churnRate !== 0 ? 1 / churnRate : 0;
  const clv = apv * apf * acl * (grossProfit / revenue || 0);

  const addRow = () => {
    setCustomRows([...customRows, { label: 'New Row', value: 0 }]);
  };

  const updateRow = (index: number, field: 'label' | 'value', value: string) => {
    setCustomRows(prev => {
      const updated = [...prev];
      updated[index][field] = field === 'value' ? parseFloat(value) || 0 : value;
      return updated;
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-sm space-y-6">
      <h2 className="text-xl font-bold">P&L and Unit Economics (2022)</h2>

      <table className="w-full border">
        <tbody>
          <tr><td className="border px-2">Revenue</td><td><input type="number" value={revenue} onChange={e => setRevenue(+e.target.value)} /></td></tr>
          <tr><td className="border px-2">COGS</td><td><input type="number" value={cogs} onChange={e => setCogs(+e.target.value)} /></td></tr>
          <tr><td className="border px-2">Gross Profit</td><td>₹ {grossProfit.toFixed(2)}</td></tr>
          <tr><td className="border px-2">Gross Margin</td><td>{grossMargin.toFixed(2)}%</td></tr>
          <tr><td className="border px-2">Operating Costs</td><td><input type="number" value={opCost} onChange={e => setOpCost(+e.target.value)} /></td></tr>
          <tr><td className="border px-2 font-medium">Operating Profit</td><td>₹ {operatingProfit.toFixed(2)}</td></tr>
        </tbody>
      </table>

      <h3 className="text-lg font-semibold mt-6">Unit Economics</h3>
      <table className="w-full border">
        <tbody>
          <tr><td className="border px-2">CAC</td><td><input type="number" value={cac} onChange={e => setCac(+e.target.value)} /></td></tr>
          <tr><td className="border px-2">ARPU</td><td><input type="number" value={arpu} onChange={e => setArpu(+e.target.value)} /></td></tr>
          <tr><td className="border px-2">Total Purchases</td><td><input type="number" value={purchases} onChange={e => setPurchases(+e.target.value)} /></td></tr>
          <tr><td className="border px-2">Unique Customers</td><td><input type="number" value={uniqueCustomers} onChange={e => setUniqueCustomers(+e.target.value)} /></td></tr>
          <tr><td className="border px-2">Customers (Start of Month)</td><td><input type="number" value={custStart} onChange={e => setCustStart(+e.target.value)} /></td></tr>
          <tr><td className="border px-2">Customers (End of Month)</td><td><input type="number" value={custEnd} onChange={e => setCustEnd(+e.target.value)} /></td></tr>

          <tr><td className="border px-2 font-medium">APV (Avg Purchase Value)</td><td>₹ {apv.toFixed(2)}</td></tr>
          <tr><td className="border px-2 font-medium">APF (Avg Purchase Frequency)</td><td>{apf.toFixed(2)}</td></tr>
          <tr><td className="border px-2 font-medium">Churn Rate</td><td>{churnRate.toFixed(2)}</td></tr>
          <tr><td className="border px-2 font-medium">ACL (Avg Customer Lifespan)</td><td>{acl.toFixed(2)}</td></tr>
          <tr><td className="border px-2 font-bold">CLV (Customer Lifetime Value)</td><td>₹ {clv.toFixed(2)}</td></tr>
        </tbody>
      </table>

      <h3 className="text-lg font-semibold">Additional Assumptions / Rows</h3>
      <table className="w-full border">
        <tbody>
          {customRows.map((row, idx) => (
            <tr key={idx}>
              <td className="border px-2"><input value={row.label} onChange={e => updateRow(idx, 'label', e.target.value)} /></td>
              <td><input type="number" value={row.value} onChange={e => updateRow(idx, 'value', e.target.value)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={addRow}
      >
        + Add Row
      </button>
    </div>
  );
}
