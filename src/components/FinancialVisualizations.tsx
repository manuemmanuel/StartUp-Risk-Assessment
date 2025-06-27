'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface FinancialData {
  month: string;
  cashSales: number;
  totalExpenses: number;
  netProfitLoss: number;
  grossProfitMargin: number;
  netProfitMargin: number;
}

interface FinancialVisualizationsProps {
  data: FinancialData[];
}

const COLORS = {
  cashSales: '#3b82f6',
  totalExpenses: '#ef4444',
  netProfitLoss: '#10b981',
  grossProfitMargin: '#8b5cf6',
  netProfitMargin: '#f59e0b',
};

export default function FinancialVisualizations({ data }: FinancialVisualizationsProps) {
  // Calculate summary statistics
  const totalCashSales = data.reduce((sum, item) => sum + item.cashSales, 0);
  const totalExpenses = data.reduce((sum, item) => sum + item.totalExpenses, 0);
  const totalNetProfit = data.reduce((sum, item) => sum + item.netProfitLoss, 0);
  const avgGrossMargin = data.reduce((sum, item) => sum + item.grossProfitMargin, 0) / data.length;
  const avgNetMargin = data.reduce((sum, item) => sum + item.netProfitMargin, 0) / data.length;

  // Prepare data for pie chart (Revenue vs Expenses)
  const pieData = [
    { name: 'Total Expenses', value: totalExpenses, color: COLORS.totalExpenses },
    { name: 'Net Profit', value: Math.max(0, totalNetProfit), color: COLORS.netProfitLoss },
  ];

  // Prepare data for margin comparison
  const marginData = data.map(item => ({
    month: item.month,
    'Gross Profit Margin': (item.grossProfitMargin * 100).toFixed(1),
    'Net Profit Margin': (item.netProfitMargin * 100).toFixed(1),
  }));

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg">
          <h3 className="text-sm font-medium opacity-90">Total Revenue</h3>
          <p className="text-2xl font-bold">₹{totalCashSales.toLocaleString('en-IN')}</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-4 rounded-xl shadow-lg">
          <h3 className="text-sm font-medium opacity-90">Total Expenses</h3>
          <p className="text-2xl font-bold">₹{totalExpenses.toLocaleString('en-IN')}</p>
        </div>
        
        <div className={`bg-gradient-to-br ${totalNetProfit >= 0 ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'} text-white p-4 rounded-xl shadow-lg`}>
          <h3 className="text-sm font-medium opacity-90">Net Profit/Loss</h3>
          <p className="text-2xl font-bold">₹{totalNetProfit.toLocaleString('en-IN')}</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl shadow-lg">
          <h3 className="text-sm font-medium opacity-90">Avg Gross Margin</h3>
          <p className="text-2xl font-bold">{(avgGrossMargin * 100).toFixed(1)}%</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-xl shadow-lg">
          <h3 className="text-sm font-medium opacity-90">Avg Net Margin</h3>
          <p className="text-2xl font-bold">{(avgNetMargin * 100).toFixed(1)}%</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue vs Expenses Line Chart */}
        <div className="bg-background border border-border rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Revenue vs Expenses Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--foreground)"
                fontSize={12}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, '']}
                labelStyle={{ color: 'var(--foreground)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="cashSales" 
                stroke={COLORS.cashSales} 
                strokeWidth={3}
                name="Cash Sales"
              />
              <Line 
                type="monotone" 
                dataKey="totalExpenses" 
                stroke={COLORS.totalExpenses} 
                strokeWidth={3}
                name="Total Expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Net Profit/Loss Bar Chart */}
        <div className="bg-background border border-border rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Net Profit/Loss by Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--foreground)"
                fontSize={12}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, '']}
                labelStyle={{ color: 'var(--foreground)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="netProfitLoss" 
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.netProfitLoss >= 0 ? COLORS.netProfitLoss : COLORS.totalExpenses} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Profit Margins Line Chart */}
        <div className="bg-background border border-border rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Profit Margins Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={marginData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--foreground)"
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value: string) => [`${value}%`, '']}
                labelStyle={{ color: 'var(--foreground)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="Gross Profit Margin" 
                stroke={COLORS.grossProfitMargin} 
                strokeWidth={3}
              />
              <Line 
                type="monotone" 
                dataKey="Net Profit Margin" 
                stroke={COLORS.netProfitMargin} 
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue vs Expenses Pie Chart */}
        <div className="bg-background border border-border rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Revenue Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, '']}
                labelStyle={{ color: 'var(--foreground)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-border rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-foreground">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-foreground/80">
              <span className="font-semibold">Best Month:</span> {data.reduce((max, item) => item.netProfitLoss > max.netProfitLoss ? item : max).month} 
              (₹{Math.max(...data.map(item => item.netProfitLoss)).toLocaleString('en-IN')})
            </p>
            <p className="text-sm text-foreground/80">
              <span className="font-semibold">Worst Month:</span> {data.reduce((min, item) => item.netProfitLoss < min.netProfitLoss ? item : min).month} 
              (₹{Math.min(...data.map(item => item.netProfitLoss)).toLocaleString('en-IN')})
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-foreground/80">
              <span className="font-semibold">Profitability:</span> {totalNetProfit >= 0 ? 'Profitable' : 'Loss-making'} 
              ({totalNetProfit >= 0 ? 'Positive' : 'Negative'} cash flow)
            </p>
            <p className="text-sm text-foreground/80">
              <span className="font-semibold">Efficiency:</span> {avgGrossMargin > 0.3 ? 'High' : avgGrossMargin > 0.15 ? 'Medium' : 'Low'} 
              gross margin efficiency
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 