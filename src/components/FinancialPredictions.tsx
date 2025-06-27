'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
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

interface FinancialPredictionsProps {
  data: FinancialData[];
}

interface PredictionResult {
  month: string;
  actual: number;
  predicted: number;
  confidence: number;
}

const COLORS = {
  actual: '#3b82f6',
  predicted: '#ef4444',
  confidence: '#10b981',
};

// Simple linear regression implementation
class SimpleLinearRegression {
  private slope: number = 0;
  private intercept: number = 0;

  fit(x: number[], y: number[]) {
    const n = x.length;
    if (n !== y.length || n < 2) return;

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

    this.slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    this.intercept = (sumY - this.slope * sumX) / n;
  }

  predict(x: number): number {
    return this.slope * x + this.intercept;
  }

  getSlope(): number {
    return this.slope;
  }

  getIntercept(): number {
    return this.intercept;
  }
}

export default function FinancialPredictions({ data }: FinancialPredictionsProps) {
  const [predictions, setPredictions] = useState<{
    cashSales: PredictionResult[];
    totalExpenses: PredictionResult[];
    netProfitLoss: PredictionResult[];
  } | null>(null);
  const [futurePredictions, setFuturePredictions] = useState<{
    cashSales: number[];
    totalExpenses: number[];
    netProfitLoss: number[];
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (data.length >= 3) {
      calculatePredictions();
    }
  }, [data]);

  const calculatePredictions = () => {
    setIsCalculating(true);

    try {
      // Prepare data for regression (x = month index, y = value)
      const xValues = data.map((_, index) => index);
      
      // Cash Sales Regression
      const cashSalesY = data.map(item => item.cashSales);
      const cashSalesRegression = new SimpleLinearRegression();
      cashSalesRegression.fit(xValues, cashSalesY);
      
      // Total Expenses Regression
      const expensesY = data.map(item => item.totalExpenses);
      const expensesRegression = new SimpleLinearRegression();
      expensesRegression.fit(xValues, expensesY);
      
      // Net Profit/Loss Regression
      const profitY = data.map(item => item.netProfitLoss);
      const profitRegression = new SimpleLinearRegression();
      profitRegression.fit(xValues, profitY);

      // Calculate predictions for existing months
      const cashSalesPredictions: PredictionResult[] = data.map((item, index) => {
        const predicted = cashSalesRegression.predict(index);
        const actual = item.cashSales;
        const confidence = Math.max(0, 100 - Math.abs((predicted - actual) / Math.max(actual, 1)) * 100);
        return {
          month: item.month,
          actual,
          predicted: Math.max(0, predicted),
          confidence: Math.min(100, Math.max(0, confidence)),
        };
      });

      const expensesPredictions: PredictionResult[] = data.map((item, index) => {
        const predicted = expensesRegression.predict(index);
        const actual = item.totalExpenses;
        const confidence = Math.max(0, 100 - Math.abs((predicted - actual) / Math.max(actual, 1)) * 100);
        return {
          month: item.month,
          actual,
          predicted: Math.max(0, predicted),
          confidence: Math.min(100, Math.max(0, confidence)),
        };
      });

      const profitPredictions: PredictionResult[] = data.map((item, index) => {
        const predicted = profitRegression.predict(index);
        const actual = item.netProfitLoss;
        const confidence = Math.max(0, 100 - Math.abs((predicted - actual) / Math.max(Math.abs(actual), 1)) * 100);
        return {
          month: item.month,
          actual,
          predicted,
          confidence: Math.min(100, Math.max(0, confidence)),
        };
      });

      // Predict next 6 months
      const nextMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      const futureCashSales = nextMonths.map((_, index) => 
        Math.max(0, cashSalesRegression.predict(data.length + index))
      );
      const futureExpenses = nextMonths.map((_, index) => 
        Math.max(0, expensesRegression.predict(data.length + index))
      );
      const futureProfit = nextMonths.map((_, index) => 
        profitRegression.predict(data.length + index)
      );

      setPredictions({
        cashSales: cashSalesPredictions,
        totalExpenses: expensesPredictions,
        netProfitLoss: profitPredictions,
      });

      setFuturePredictions({
        cashSales: futureCashSales,
        totalExpenses: futureExpenses,
        netProfitLoss: futureProfit,
      });

    } catch (error) {
      console.error('Error calculating predictions:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  if (data.length < 3) {
    return (
      <div className="bg-background border border-border rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-foreground">Financial Predictions</h3>
        <p className="text-foreground/80">Need at least 3 months of data to generate predictions.</p>
      </div>
    );
  }

  if (isCalculating) {
    return (
      <div className="bg-background border border-border rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-foreground">Financial Predictions</h3>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground/80">Calculating predictions...</p>
        </div>
      </div>
    );
  }

  if (!predictions || !futurePredictions) {
    return null;
  }

  // Prepare data for charts
  const chartData = data.map((item, index) => ({
    month: item.month,
    actualCashSales: item.cashSales,
    predictedCashSales: predictions.cashSales[index]?.predicted || 0,
    actualExpenses: item.totalExpenses,
    predictedExpenses: predictions.totalExpenses[index]?.predicted || 0,
    actualProfit: item.netProfitLoss,
    predictedProfit: predictions.netProfitLoss[index]?.predicted || 0,
  }));

  const futureData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => ({
    month: `Future ${month}`,
    predictedCashSales: futurePredictions.cashSales[index],
    predictedExpenses: futurePredictions.totalExpenses[index],
    predictedProfit: futurePredictions.netProfitLoss[index],
  }));

  // Calculate model accuracy
  const avgCashSalesAccuracy = predictions.cashSales.reduce((sum, p) => sum + p.confidence, 0) / predictions.cashSales.length;
  const avgExpensesAccuracy = predictions.totalExpenses.reduce((sum, p) => sum + p.confidence, 0) / predictions.totalExpenses.length;
  const avgProfitAccuracy = predictions.netProfitLoss.reduce((sum, p) => sum + p.confidence, 0) / predictions.netProfitLoss.length;

  return (
    <div className="space-y-8">
      {/* Model Accuracy Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg">
          <h3 className="text-sm font-medium opacity-90">Cash Sales Model Accuracy</h3>
          <p className="text-2xl font-bold">{avgCashSalesAccuracy.toFixed(1)}%</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-4 rounded-xl shadow-lg">
          <h3 className="text-sm font-medium opacity-90">Expenses Model Accuracy</h3>
          <p className="text-2xl font-bold">{avgExpensesAccuracy.toFixed(1)}%</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-xl shadow-lg">
          <h3 className="text-sm font-medium opacity-90">Profit Model Accuracy</h3>
          <p className="text-2xl font-bold">{avgProfitAccuracy.toFixed(1)}%</p>
        </div>
      </div>

      {/* Historical vs Predicted Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cash Sales Prediction */}
        <div className="bg-background border border-border rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Cash Sales: Actual vs Predicted</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--foreground)" fontSize={12} />
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
                dataKey="actualCashSales" 
                stroke={COLORS.actual} 
                strokeWidth={3}
                name="Actual"
              />
              <Line 
                type="monotone" 
                dataKey="predictedCashSales" 
                stroke={COLORS.predicted} 
                strokeWidth={3}
                strokeDasharray="5 5"
                name="Predicted"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Net Profit Prediction */}
        <div className="bg-background border border-border rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Net Profit/Loss: Actual vs Predicted</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--foreground)" fontSize={12} />
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
                dataKey="actualProfit" 
                stroke={COLORS.actual} 
                strokeWidth={3}
                name="Actual"
              />
              <Line 
                type="monotone" 
                dataKey="predictedProfit" 
                stroke={COLORS.predicted} 
                strokeWidth={3}
                strokeDasharray="5 5"
                name="Predicted"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Future Predictions */}
      <div className="bg-background border border-border rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-foreground">6-Month Future Predictions</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={futureData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--foreground)" fontSize={12} />
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
            <Bar dataKey="predictedCashSales" fill={COLORS.actual} name="Predicted Cash Sales" />
            <Bar dataKey="predictedExpenses" fill={COLORS.predicted} name="Predicted Expenses" />
            <Bar dataKey="predictedProfit" fill={COLORS.confidence} name="Predicted Net Profit" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Prediction Insights */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-border rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-foreground">Prediction Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-foreground/80">
              <span className="font-semibold">Trend Analysis:</span> {futurePredictions.cashSales[5] > futurePredictions.cashSales[0] ? 'Growing' : 'Declining'} revenue trend predicted
            </p>
            <p className="text-sm text-foreground/80">
              <span className="font-semibold">Profitability Outlook:</span> {futurePredictions.netProfitLoss[5] > 0 ? 'Profitable' : 'Loss-making'} by month 6
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-foreground/80">
              <span className="font-semibold">Model Reliability:</span> {avgProfitAccuracy > 80 ? 'High' : avgProfitAccuracy > 60 ? 'Medium' : 'Low'} confidence in predictions
            </p>
            <p className="text-sm text-foreground/80">
              <span className="font-semibold">Recommendation:</span> {futurePredictions.netProfitLoss[5] > 0 ? 'Continue current strategy' : 'Review cost structure and pricing'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 