// StartUp-Risk-Assessmenent/src/app/assessment/page.tsx
import StartupCostForm from "@/components/startup_cost";
import Link from "next/link";

export default function AssessmentPage() {
  return (
    <main className="p-8">
      <StartupCostForm />
    </main>
  );
}
