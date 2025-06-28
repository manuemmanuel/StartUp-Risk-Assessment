"use client";

import { useState } from "react";

interface Term {
  title: string;
  description: string;
}

export default function Glossary() {
  const [terms, setTerms] = useState<Term[]>([
    {
      title: "Accounts Payable",
      description:
        "Accounts payable (AP) is an accounting entry that represents a company's obligation to pay off a short-term debt to its creditors or suppliers. For example, when you purchase raw materials from your suppliers but pay after a month on receiving the invoice.",
    },
    {
      title: "Accounts Receivable",
      description:
        "When customers buy your products or services on credit and pay after a certain amount of time, the amount owed to you is called accounts receivable. It represents money owed to your business by customers for goods or services already delivered.",
    },
    {
      title: "Assets",
      description:
        "A company's balance sheet statement consists of its assets, liabilities, and shareholders' equity. Assets are resources owned by the company that have economic value and can be converted to cash.",
    },
    {
      title: "Balance Sheet",
      description:
        "A balance sheet reports your venture's assets, liabilities, and shareholders' equity at a specific point in time. It provides a snapshot of what your company owns and owes.",
    },
    {
      title: "Break-Even Analysis",
      description:
        "A break-even analysis is a useful tool to find out at what point your venture, or a new product or service you are thinking of introducing, will be profitable. It calculates the point where total revenue equals total costs.",
    },
    {
      title: "Cash Flow",
      description:
        "Cash flow is the amount of cash that your venture receives or pays out by the way of payment(s) to creditors. It's the net amount of cash moving in and out of your business.",
    },
    {
      title: "Cost of Goods Sold (COGS)",
      description:
        "COGS stands for the Cost of Goods Sold. It is all the direct costs attributable to the production of the goods sold by your venture, including materials and direct labor costs.",
    },
    {
      title: "Liabilities",
      description:
        "Liabilities are the money that your venture owes to outside parties from bills it has to pay to suppliers and loans you took from others, etc. They represent your company's debts and obligations.",
    },
    {
      title: "Profit & Loss Statement",
      description:
        "The profit & loss statement (or a P&L statement) is a financial statement that summarizes the revenues, costs, and expenses incurred during a specific period, showing your company's profitability.",
    },
    {
      title: "Unit Economics",
      description:
        "Unit economics refers to the direct revenues and costs associated with a particular business model expressed on a per-unit basis. It helps determine if a business model is sustainable and scalable.",
    },
    {
      title: "Burn Rate",
      description:
        "Burn rate is the rate at which a company is spending its capital to finance overhead before generating positive cash flow from operations. It's typically expressed in monthly terms.",
    },
    {
      title: "Runway",
      description:
        "Runway is the amount of time a company has before it runs out of money, calculated by dividing current cash balance by monthly burn rate. It's crucial for planning fundraising efforts.",
    },
  ]);

  const addRow = () => {
    setTerms([...terms, { title: "", description: "" }]);
  };

  const updateTerm = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    const newTerms = [...terms];
    newTerms[index][field] = value;
    setTerms(newTerms);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">Financial Terms Glossary</h1>
        <p className="text-foreground/70 text-lg">
          Essential financial terms and concepts for startup founders and entrepreneurs.
        </p>
      </div>
      
      <div className="bg-background border border-border rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary border-b border-border">
                <th className="p-4 text-left font-semibold text-foreground">Term</th>
                <th className="p-4 text-left font-semibold text-foreground">Definition</th>
              </tr>
            </thead>
            <tbody>
              {terms.map((term, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="p-4">
                    <input
                      type="text"
                      value={term.title}
                      onChange={(e) => updateTerm(idx, "title", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-foreground font-medium"
                      placeholder="Enter term..."
                    />
                  </td>
                  <td className="p-4">
                    <textarea
                      value={term.description}
                      onChange={(e) =>
                        updateTerm(idx, "description", e.target.value)
                      }
                      className="w-full bg-transparent border-none outline-none text-foreground/80 resize-none"
                      rows={3}
                      placeholder="Enter definition..."
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <button
        onClick={addRow}
        className="mt-6 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
      >
        + Add New Term
      </button>
    </div>
  );
}
