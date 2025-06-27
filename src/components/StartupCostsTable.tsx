"use client";

import { useState } from "react";

const sections = [
  {
    key: "capital",
    label: "Start-up capital",
    subLabel: "Share Capital",
  },
  {
    key: "startupCost",
    label: "Startup Cost",
  },
  {
    key: "capitalWork",
    label: "Capital Work in Progress ( Fixed Asset )",
  },
  {
    key: "operations",
    label: "Starting Operations ( Budgeted )",
  },
];

type CostItem = {
  name: string;
  cost: number;
  fixed?: boolean;
};

type SectionState = Record<string, CostItem[]>;

export default function StartupCostsTable() {
  const [costs, setCosts] = useState<SectionState>(() => {
    const initial: SectionState = {};
    sections.forEach((section) => {
      if (section.key === "capital" && section.subLabel) {
        initial[section.key] = [{ name: section.subLabel, cost: 0 }];
      } else {
        initial[section.key] = [{ name: "", cost: 0 }];
      }
    });
    return initial;
  });

  const handleChange = (
    sectionKey: string,
    idx: number,
    field: "name" | "cost",
    value: string
  ) => {
    setCosts((prev) => ({
      ...prev,
      [sectionKey]: prev[sectionKey].map((item, i) =>
        i === idx
          ? {
              ...item,
              [field]: field === "cost" ? parseFloat(value) || 0 : value,
            }
          : item
      ),
    }));
  };

  const addRow = (sectionKey: string) => {
    setCosts((prev) => ({
      ...prev,
      [sectionKey]: [...prev[sectionKey], { name: "", cost: 0 }],
    }));
  };

  const sectionTotal = (sectionKey: string) =>
    costs[sectionKey].reduce((acc, item) => acc + item.cost, 0);
  const grandTotal = sections.reduce((acc, s) => acc + sectionTotal(s.key), 0);

  return (
    <div className="w-full max-w-2xl rounded-3xl shadow-2xl border border-border bg-background/90 backdrop-blur-lg p-8 sm:p-12 mx-auto">
      <h2 className="text-3xl font-extrabold text-foreground tracking-tight mb-8 flex items-center">
        <span className="inline-block text-3xl align-middle mr-2 text-primary">
          💸
        </span>
        Starting Costs
      </h2>
      {sections.map((section) => (
        <div key={section.key} className="mb-8">
          <div className="flex justify-between items-center bg-secondary/60 rounded-t-lg px-4 py-2 border-b border-border">
            <span className="font-bold text-lg text-foreground">
              {section.label}
            </span>
            <span className="font-bold text-lg text-primary">
              ₹ {sectionTotal(section.key).toLocaleString()}
            </span>
          </div>
          <div className="overflow-x-auto rounded-b-lg border border-t-0 border-border bg-secondary/40">
            <table className="w-full min-w-[300px] text-left text-foreground bg-transparent">
              <tbody>
                {costs[section.key].map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-accent/30 transition-colors"
                  >
                    <td className="p-2 border-b border-border w-2/3">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          handleChange(section.key, idx, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background/80 text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-sans shadow-sm"
                        placeholder="Enter item name"
                        disabled={item.fixed}
                      />
                    </td>
                    <td className="p-2 border-b border-border w-1/3">
                      <input
                        type="number"
                        value={item.cost}
                        onChange={(e) =>
                          handleChange(section.key, idx, "cost", e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background/80 text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-sans shadow-sm"
                        placeholder="₹ 0"
                        min="0"
                        disabled={item.fixed}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {
            <button
              onClick={() => addRow(section.key)}
              className="mt-2 px-4 py-1.5 bg-primary text-primary-foreground rounded-lg font-semibold shadow hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            >
              + Add Row
            </button>
          }
        </div>
      ))}
      {/* <div className="text-right font-extrabold text-2xl text-primary bg-secondary/80 rounded-lg px-8 py-5 border border-border shadow mt-8">
        Total Starting Costs:{" "}
        <span className="text-primary">₹ {grandTotal.toLocaleString()}</span>
      </div> */}
    </div>
  );
}
