// app/breakeven/page.tsx (for App Router)
import BreakEvenCalculator from "@/components/BreakEvenCalculator";

export default function BreakEvenPage() {
  return (
    <main className="max-w-2xl mx-auto p-6 shadow rounded-lg ">
      <div className="w-full max-w-2xl rounded-3xl shadow-2xl border border-border bg-background/90 backdrop-blur-lg p-8 sm:p-12">
        <BreakEvenCalculator />
      </div>
    </main>
  );
}
