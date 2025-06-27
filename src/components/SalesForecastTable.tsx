"use client";

import { useState, useEffect } from "react";

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

export default function SalesForecastTable() {
  const STORAGE_KEY = "sales_forecast_table";

  const defaultData = {
    unitsSold: Array(12).fill(0),
    pricePerUnit: Array(12).fill(0),
    costPerUnit: Array(12).fill(0),
  };

  const [data, setData] = useState(() =>
    loadFromStorage(STORAGE_KEY, defaultData)
  );

  const { unitsSold, pricePerUnit, costPerUnit: cogs } = data;

  const revenue = unitsSold.map((units, i) => units * pricePerUnit[i]);
  const costPerUnit = unitsSold.map((units, i) =>
    units === 0 ? 0 : cogs[i] / units
  );

  const totalUnits = unitsSold.reduce((a, b) => a + b, 0);
  const totalRevenue = revenue.reduce((a, b) => a + b, 0);
  const totalCOGS = cogs.reduce((a, b) => a + b, 0);
  const totalCostPerUnit = totalUnits === 0 ? 0 : totalCOGS / totalUnits;

  const handleArrayChange = (
    key: keyof typeof data,
    idx: number,
    value: string
  ) => {
    const newValue = parseFloat(value) || 0;
    setData((prev) => {
      const updated = [...prev[key]];
      updated[idx] = newValue;
      return { ...prev, [key]: updated };
    });
  };

  useEffect(() => {
    saveToStorage(STORAGE_KEY, data);
  }, [data]);

  return (
    <div className="w-full">
      <div className="flex items-center mb-8">
        <span className="inline-block text-3xl align-middle mr-3 text-primary">
          📈
        </span>
        <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
          Sales Forecast
        </h2>
      </div>
      
      <div className="overflow-x-auto rounded-xl border border-border bg-background/30">
        <table className="w-full min-w-[900px] text-center">
          <thead>
            <tr className="bg-primary/10 border-b border-border">
              <th className="text-left px-4 py-4 border-b border-border font-bold text-lg text-foreground">
                Product Category
              </th>
              {months.map((m) => (
                <th
                  key={m}
                  className="px-3 py-4 border-b border-border font-bold text-lg text-foreground"
                >
                  {m}
                </th>
              ))}
              <th className="px-4 py-4 border-b border-border font-bold text-lg text-foreground">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {/* No of Units Sold */}
            <tr className="bg-accent/20 border-b border-border/30">
              <td className="text-left font-semibold px-4 py-4 border-b border-border/30 text-base text-foreground">
                No of Units Sold
              </td>
              {unitsSold.map((val, i) => (
                <td key={i} className="px-2 py-3 border-b border-border/30">
                  <input
                    type="number"
                    value={val}
                    min="0"
                    onChange={(e) =>
                      handleArrayChange("unitsSold", i, e.target.value)
                    }
                    className="w-20 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                    placeholder="0"
                  />
                </td>
              ))}
              <td className="bg-accent/30 font-bold text-lg px-4 py-4 border-b border-border/30">
                {totalUnits.toLocaleString()}
              </td>
            </tr>

            {/* Revenue */}
            <tr className="bg-primary/10 border-b border-border/30">
              <td className="text-left font-semibold px-4 py-4 border-b border-border/30 text-base text-foreground">
                Revenue
              </td>
              {revenue.map((val, i) => (
                <td
                  key={i}
                  className="px-2 py-3 border-b border-border/30 text-base font-semibold text-foreground font-mono"
                >
                  ₹{val.toLocaleString()}
                </td>
              ))}
              <td className="bg-primary/20 font-bold text-lg px-4 py-4 border-b border-border/30 font-mono">
                ₹{totalRevenue.toLocaleString()}
              </td>
            </tr>

            {/* Price Per Unit */}
            <tr className="bg-accent/20 border-b border-border/30">
              <td className="text-left font-semibold px-4 py-4 border-b border-border/30 text-base text-foreground">
                Price Per Unit
              </td>
              {pricePerUnit.map((val, i) => (
                <td key={i} className="px-2 py-3 border-b border-border/30">
                  <input
                    type="number"
                    value={val}
                    min="0"
                    onChange={(e) =>
                      handleArrayChange("pricePerUnit", i, e.target.value)
                    }
                    className="w-20 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                    placeholder="0"
                  />
                </td>
              ))}
              <td className="bg-accent/30 font-bold text-lg px-4 py-4 border-b border-border/30 font-mono">
                {totalUnits === 0
                  ? "₹0"
                  : `₹${(totalRevenue / totalUnits).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}`}
              </td>
            </tr>

            {/* COGS */}
            <tr className="bg-red-500/10 border-b border-border/30">
              <td className="text-left font-semibold px-4 py-4 border-b border-border/30 text-base text-foreground">
                COGS
              </td>
              {cogs.map((val, i) => (
                <td key={i} className="px-2 py-3 border-b border-border/30">
                  <input
                    type="number"
                    value={val}
                    min="0"
                    onChange={(e) =>
                      handleArrayChange("costPerUnit", i, e.target.value)
                    }
                    className="w-20 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                    placeholder="0"
                  />
                </td>
              ))}
              <td className="bg-red-500/20 font-bold text-lg px-4 py-4 border-b border-border/30 font-mono">
                ₹{totalCOGS.toLocaleString()}
              </td>
            </tr>

            {/* Cost Per Unit */}
            <tr className="bg-accent/20">
              <td className="text-left font-semibold px-4 py-4 text-base text-foreground">
                Cost Per Unit
              </td>
              {costPerUnit.map((val, i) => (
                <td
                  key={i}
                  className="px-2 py-3 text-base font-semibold text-foreground font-mono"
                >
                  {unitsSold[i] === 0
                    ? "₹0"
                    : `₹${val.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}`}
                </td>
              ))}
              <td className="bg-accent/30 font-bold text-lg px-4 py-4 font-mono">
                {totalUnits === 0
                  ? "₹0"
                  : `₹${totalCostPerUnit.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
