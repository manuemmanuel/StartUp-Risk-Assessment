// app/salary/page.tsx
import SalaryPlanner from '@/components/SalaryPlanner';
import Link from 'next/link';

export default function SalaryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/10 to-background flex flex-col items-center justify-center py-12 px-4 sm:px-8">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-tight">Monthly Salary Dashboard</h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Plan and manage your team's monthly salaries, including base pay, benefits, and other compensation. This helps you forecast your personnel costs accurately.
          </p>
        </div>
        <SalaryPlanner />
        <div className="mt-10 flex justify-between items-center">
          <Link href="/sales-forecast" className="text-primary hover:underline">&larr; Back to Sales Forecast</Link>
          <Link href="/startup-costs" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">Next: Startup Costs</Link>
        </div>
      </div>
    </div>
  );
}
