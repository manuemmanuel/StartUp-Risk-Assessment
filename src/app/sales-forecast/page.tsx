import SalesForecastTable from '../../components/SalesForecastTable';
import Link from 'next/link';

export default function SalesForecastPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/10 to-background">
      <div className="container mx-auto px-4 sm:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
              Sales Forecast
            </h1>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Enter your monthly sales projections, price per unit, and COGS to forecast your revenue and costs for the year. 
              This helps you understand your sales trajectory and plan your business growth.
            </p>
          </div>
          
          {/* Main Content */}
          <div className="space-y-12">
            <div className="bg-background/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8">
              <SalesForecastTable />
            </div>
          </div>
          
          {/* Navigation Section */}
          <div className="mt-20 pt-8 border-t border-border/50">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <Link 
                href="/cogs-calculator" 
                className="text-primary hover:text-primary/80 hover:underline transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to COGS Calculator
              </Link>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-foreground/60">Step 2 of 5</span>
                <Link
                  href="/salaries"
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  Next: Salaries
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 