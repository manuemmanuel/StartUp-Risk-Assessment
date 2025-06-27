import React from "react";
import Link from "next/link";

export default function InstructionsPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">Instructions</h1>
        <div className="bg-secondary p-8 rounded-xl mb-8">
          <h2 className="text-2xl font-semibold mb-4">Context</h2>
          <ul className="list-disc pl-6 space-y-3 text-foreground/90">
            <li>Three students start a Mentor Connect company. It is an AI powered ecosystem connect app, and all interactions happen online through its mobile app.</li>
            <li>The basic starting cost is the website design and development cost and the cost of office computers. We have considered a fixed deposit of 6 months rentals as is the norm for office space. The cost of company registration is taken into account along with professional consultation fees.</li>
            <li>The total startup investment is INR 10,00,000. Half of the amount is invested by founders and the other half is interest-free loan from friends and family.</li>
            <li>The products being sold are 'One Hour of Mentoring' for now. These are one on one sessions that are purchased in advance and paid for by the Entrepreneur mentee. The standard size is a 10hr pack. Mentors pay a listing fee for being on the app, additional revenues by way of in-line app advertising and mentor connect event sponsorships can be factored in at later stages. For simplicity of understanding only revenues accruing from Mentoring pack sales is considered.</li>
            <li>COGS is INR 700. This includes the cost of INR 400 per hour being paid to the Mentor for the engagement.</li>
            <li>The selling price is at INR 1000. The major expenses are online marketing costs, digital support services, founder's salary, and early employees' salaries, and server costs.</li>
            <li>The founders work all by themselves till month 4, then they start adding employees. The total employee count at the end of the year is 5. Not including the founders.</li>
          </ul>
        </div>
        <div className="flex justify-between">
          <Link href="/" className="text-primary hover:underline">&larr; Back to Home</Link>
          <Link href="/startup-costs" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">Next: Startup Costs</Link>
        </div>
      </div>
    </div>
  );
} 