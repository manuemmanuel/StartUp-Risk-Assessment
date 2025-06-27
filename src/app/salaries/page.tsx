// app/salary/page.tsx
import SalaryPlanner from "@/components/SalaryPlanner";
import Link from "next/link";

export default function SalaryPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Monthly Salary Dashboard</h1>
      <SalaryPlanner />
      <div className="mt-10 flex justify-between items-center">
        <Link href="/instructions" className="text-primary hover:underline">
          &larr; Back to Instructions
        </Link>
        <Link
          href="/cogs-calculator"
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Next: Forecast and PL
        </Link>
      </div>
    </main>
  );
}
