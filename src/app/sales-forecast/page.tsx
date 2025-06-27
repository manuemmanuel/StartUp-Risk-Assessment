import SalesForecastTable from '../../components/SalesForecastTable';
import Link from 'next/link';

export default function SalesForecastPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/10 to-background flex flex-col items-center justify-center py-12 px-4 sm:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-tight">Sales Forecast</h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Enter your monthly sales projections, price per unit, and COGS to forecast your revenue and costs for the year.
          </p>
        </div>
        <SalesForecastTable />
        <div className="mt-10 flex justify-between items-center">
          <Link href="/cogs-calculator" className="text-primary hover:underline">&larr; Back to COGS Calculator</Link>
          <Link href="/salaries" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">Next: Salaries</Link>
        </div>
      </div>
    </div>
  );
} 