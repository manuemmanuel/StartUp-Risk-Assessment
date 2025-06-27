'use client';

import { useState } from 'react';

export default function FinancialTerms() {
  const [terms, setTerms] = useState([
    {
      title: 'Accounts Payable',
      description: 'Accounts payable (AP) is an accounting entry that represents a company\'s obligation to pay off a short-term debt to its creditors or suppliers. For example, when you purchase raw materials from your suppliers but pay after a month on receiving the invoice.'
    },
    {
      title: 'Accounts Receivable',
      description: 'When customers buy your products or services on credit and pay after a certain amount of time...'
    },
    {
      title: 'Assets',
      description: 'A company\'s balance sheet statement consists of its assets, liabilities, and shareholders\' equity...'
    },
    {
      title: 'Balance Sheet',
      description: 'A balance sheet reports your venture’s assets, liabilities, and shareholders\' equity at a specific point in time...'
    },
    {
      title: 'Break-Even Analysis',
      description: 'A break-even analysis is a useful tool to find out at what point your venture, or a new product or service you are thinking of introducing, will be profitable...'
    },
    {
      title: 'Cash Flow',
      description: 'Cash flow is the amount of cash that your venture receives or pays out by the way of payment(s) to creditors...'
    },
    {
      title: 'Cost of Goods or COGs',
      description: 'COGS stands for the Cost of Goods Sold. It is all the direct costs attributable to the production of the goods sold by your venture...'
    },
    {
      title: 'Liabilities',
      description: 'Liabilities are the money that your venture owes to outside parties from bills it has to pay to suppliers and loans you took from others, etc.'
    },
    {
      title: 'Profit & Loss Statement',
      description: 'The profit & loss statement (or a P&L statement) is a financial statement that summarizes the revenues, costs, and expenses incurred during a specific period...'
    }
  ]);

  const addRow = () => {
    setTerms([...terms, { title: '', description: '' }]);
  };

  const updateTerm = (index: number, field: 'title' | 'description', value: string) => {
    const newTerms = [...terms];
    newTerms[index][field] = value;
    setTerms(newTerms);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Finance Glossary</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Term</th>
            <th className="p-2 text-left">Definition</th>
          </tr>
        </thead>
        <tbody>
          {terms.map((term, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">
                <input
                  type="text"
                  value={term.title}
                  onChange={e => updateTerm(idx, 'title', e.target.value)}
                  className="w-full border px-2 py-1"
                />
              </td>
              <td className="p-2">
                <textarea
                  value={term.description}
                  onChange={e => updateTerm(idx, 'description', e.target.value)}
                  className="w-full border px-2 py-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addRow}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add Term
      </button>
    </div>
  );
}
