// app/salary/page.tsx
import SalaryPlanner from "@/components/SalaryPlanner";
import Link from "next/link";

export default function SalaryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/10 to-background">
      <div className="container mx-auto px-4 sm:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
              Monthly Salary Dashboard
            </h1>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Plan and manage your team's monthly salaries, including base pay, benefits, and other compensation. 
              This helps you forecast your personnel costs accurately for better financial planning.
            </p>
          </div>
          
          {/* Main Content */}
          <div className="space-y-12">
            <div className="bg-background/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                Team Salary Planning
              </h2>
              <SalaryPlanner />
            </div>
          </div>
          
          {/* Navigation Section */}
          <div className="mt-20 pt-8 border-t border-border/50">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <Link 
                href="/sales-forecast" 
                className="text-primary hover:text-primary/80 hover:underline transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Sales Forecast
              </Link>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-foreground/60">Step 3 of 5</span>
                <Link
                  href="/forecast_pl"
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  Next: Forecast & P&L
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
