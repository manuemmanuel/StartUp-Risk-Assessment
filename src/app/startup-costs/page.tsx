import StartupCostsTable from '../../components/StartupCostsTable';
import Link from 'next/link';

export default function StartupCostsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/10 to-background flex flex-col items-center justify-center py-12 px-4 sm:px-8">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-tight">Startup Costs</h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Enter your startup costs below, including initial expenses, capital work in progress, and budgeted operations. This will help you understand your total funding needs.
          </p>
        </div>
        <StartupCostsTable />
        <div className="mt-10 flex justify-between items-center">
          <Link href="/instructions" className="text-primary hover:underline">&larr; Back to Instructions</Link>
          <Link href="/cogs-calculator" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">Next: COGS Calculator</Link>
        </div>
      </div>
    </div>
  );
} 