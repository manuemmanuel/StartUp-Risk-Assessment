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
    <div className="max-w-xl mx-auto p-6 shadow rounded-lg ">
      <div className="w-full max-w-2xl rounded-3xl shadow-2xl border border-border bg-background/90 backdrop-blur-lg p-8 sm:p-12">
        <h1 className="text-2xl font-bold mb-4">Startup Cost Entry</h1>
        <form className="divide-y">
          {groups.map((group, groupIdx) => (
            <div
              key={group.key}
              className={groupIdx < groups.length - 1 ? "mb-4" : ""}
            >
              <h2 className="text-lg font-semibold mb-2">{group.title}</h2>
              {rows[group.key].map((row, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2 gap-2"
                >
                  <input
                    type="text"
                    className="border rounded p-1 w-2/5"
                    value={row.label}
                    onChange={(e) =>
                      handleChange(group.key, idx, "label", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    min={0}
                    className="border rounded p-1 w-1/3 text-right"
                    value={row.value}
                    onChange={(e) =>
                      handleChange(group.key, idx, "value", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleRemoveRow(group.key, idx)}
                    aria-label="Remove row"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mt-2 px-4 py-1 bg-primary text-white rounded"
                onClick={() => handleAddRow(group.key, group.defaultLabel)}
              >
                + Add New Row
              </button>
            </div>
          ))}
        </form>
        <div className="flex justify-between mt-6 text-xl font-bold border-t pt-4">
          <span>Starting Operations (Budgeted)</span>
          <span>₹{startingOps.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  );
}
