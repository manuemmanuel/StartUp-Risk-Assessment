"use client";
import { useState, useEffect } from "react";

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

type CostRow = { label: string; value: number };

type Group = {
  title: string;
  key: string;
  defaultLabel: string;
};

const groups: Group[] = [
  { title: "Startup Cost", key: "startupCost", defaultLabel: " " },
  {
    title: "Capital Work in Progress (Fixed Asset)",
    key: "capWork",
    defaultLabel: " ",
  },
  {
    title: "Start-up Capital",
    key: "startUpCapital",
    defaultLabel: " ",
  },
];

const initialRows: Record<string, CostRow[]> = {
  startupCost: [{ label: "Registration", value: 0 }],
  capWork: [{ label: "", value: 0 }],
  startUpCapital: [{ label: "Share Capital", value: 0 }],
};

export default function StartupCostForm() {
  const STORAGE_KEY = "startup_cost_rows";
  const [rows, setRows] = useState(() =>
    loadFromStorage(STORAGE_KEY, initialRows)
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEY, rows);
  }, [rows]);

  // Find the value for calculation
  const getValue = (groupKey: string, label: string) =>
    rows[groupKey].find((row) => row.label === label)?.value || 0;

  // For calculation
  const startupCap = getValue("startUpCapital", "Start-up Capital");
  const capWork = getValue("capWork", "Capital Work in Progress (Fixed Asset)");
  const registration = getValue("startupCost", "Registration");
  const startingOps = startupCap - (capWork + registration);

  // For total (all values)
  const total = Object.values(rows)
    .flat()
    .reduce((sum, row) => sum + row.value, 0);

  // Handlers
  const handleChange = (
    groupKey: string,
    idx: number,
    field: "label" | "value",
    value: string
  ) => {
    setRows((prev) => {
      const updated = [...prev[groupKey]];
      if (field === "value") {
        updated[idx].value = Math.max(0, parseInt(value) || 0);
      } else {
        updated[idx].label = value;
      }
      return { ...prev, [groupKey]: updated };
    });
  };

  const handleAddRow = (groupKey: string, defaultLabel: string) => {
    setRows((prev) => ({
      ...prev,
      [groupKey]: [...prev[groupKey], { label: defaultLabel, value: 0 }],
    }));
  };

  const handleRemoveRow = (groupKey: string, idx: number) => {
    setRows((prev) => {
      const updated = [...prev[groupKey]];
      updated.splice(idx, 1);
      return { ...prev, [groupKey]: updated };
    });
  };

  return (
    <div className="w-full">
      <div className="flex items-center mb-8">
        <span className="inline-block text-3xl align-middle mr-3 text-primary">
          💰
        </span>
        <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
          Startup Cost Entry
        </h2>
      </div>
      
      <div className="space-y-8">
        {groups.map((group, groupIdx) => (
          <div
            key={group.key}
            className="bg-background/30 rounded-xl border border-border p-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-foreground">{group.title}</h3>
            <div className="space-y-3">
              {rows[group.key].map((row, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3"
                >
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={row.label}
                    onChange={(e) =>
                      handleChange(group.key, idx, "label", e.target.value)
                    }
                    placeholder="Enter cost item"
                  />
                  <input
                    type="number"
                    min={0}
                    className="w-32 px-3 py-2 border border-border rounded-lg bg-background text-foreground text-right font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={row.value}
                    onChange={(e) =>
                      handleChange(group.key, idx, "value", e.target.value)
                    }
                    placeholder="0"
                  />
                  <button
                    type="button"
                    className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => handleRemoveRow(group.key, idx)}
                    aria-label="Remove row"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => handleAddRow(group.key, group.defaultLabel)}
            >
              + Add New Row
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-primary/10 rounded-xl border border-border/50">
        <div className="flex justify-between items-center text-xl font-bold text-foreground">
          <span>Starting Operations (Budgeted)</span>
          <span className="text-primary font-mono">₹{startingOps.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  );
}
