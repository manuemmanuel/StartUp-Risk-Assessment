// app/salary/page.tsx
import SalaryPlanner from '@/components/SalaryPlanner';

export default function SalaryPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Monthly Salary Dashboard</h1>
      <SalaryPlanner />
    </main>
  );
}
