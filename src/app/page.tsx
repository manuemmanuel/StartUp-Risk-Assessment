"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const features = [
    {
      title: "Instructions",
      description:
        "Step-by-step guidance for conducting comprehensive risk assessments",
      icon: "📋",
      href: "#instructions",
    },
    {
      title: "Startup Costs",
      description: "Calculate and analyze initial investment requirements",
      icon: "💰",
      href: "#startup-costs",
    },
    {
      title: "COGS Calculator",
      description: "Determine cost of goods sold and gross margins",
      icon: "🧮",
      href: "#cogs-calculator",
    },
    {
      title: "Sales Forecast",
      description: "Project revenue streams and market potential",
      icon: "📈",
      href: "#sales-forecast",
    },
    {
      title: "Salaries",
      description: "Plan workforce costs and compensation structure",
      icon: "👥",
      href: "#salaries",
    },
    {
      title: "Forecast P&L",
      description: "Project profit and loss statements",
      icon: "📊",
      href: "#forecast-pl",
    },
    {
      title: "Break-even Analysis",
      description: "Calculate when your business becomes profitable",
      icon: "⚖️",
      href: "#break-even",
    },
  ];

  const handleStartAssessment = () => {
    router.push("/instructions");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-foreground">
                RiskAssess Pro
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-foreground hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-foreground hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:text-primary transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
                <a
                  href="#features"
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                >
                  Features
                </a>
                <a
                  href="#about"
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                >
                  Contact
                </a>
                <button className="w-full mt-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Comprehensive
              <span className="text-primary block">Risk Assessment</span>
              for Startups
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
              Make informed business decisions with our suite of professional
              risk assessment tools. From startup costs to unit economics, we've
              got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
                onClick={handleStartAssessment}
              >
                Start Assessment
              </button>
              <button className="border border-border text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-secondary transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        id="features"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Complete Risk Assessment Toolkit
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Everything you need to evaluate and mitigate risks in your startup
              journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* COGS Calculator */}
            <div className="bg-background p-6 rounded-xl border border-border shadow hover:shadow-lg transition-all flex flex-col">
              <div className="text-4xl mb-4">🧮</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">COGS Calculator</h3>
              <p className="text-foreground/70 text-sm mb-4">Quickly calculate your true product costs so you can set profitable prices and understand your margins. This helps you avoid underpricing and ensures your business is sustainable.</p>
              <a href="/cogs-calculator" className="mt-auto text-primary hover:underline font-semibold">Learn more →</a>
            </div>
            {/* Sales Forecast */}
            <div className="bg-background p-6 rounded-xl border border-border shadow hover:shadow-lg transition-all flex flex-col">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Sales Forecast</h3>
              <p className="text-foreground/70 text-sm mb-4">Project your future sales to plan inventory, staffing, and funding needs. Accurate forecasts help you make confident business decisions and spot growth opportunities.</p>
              <a href="/sales-forecast" className="mt-auto text-primary hover:underline font-semibold">Learn more →</a>
            </div>
            {/* Salary Planning */}
            <div className="bg-background p-6 rounded-xl border border-border shadow hover:shadow-lg transition-all flex flex-col">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Salary Planning</h3>
              <p className="text-foreground/70 text-sm mb-4">Plan your team's compensation to attract and retain talent while keeping your business financially healthy. Understand the impact of salaries on your cash flow.</p>
              <a href="/salaries" className="mt-auto text-primary hover:underline font-semibold">Learn more →</a>
            </div>
            {/* Forecast P&L */}
            <div className="bg-background p-6 rounded-xl border border-border shadow hover:shadow-lg transition-all flex flex-col">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Forecast P&L</h3>
              <p className="text-foreground/70 text-sm mb-4">See your projected profits and losses to identify when your business will become profitable and what drives your bottom line. Make adjustments before problems arise.</p>
              <a href="/forecast_pl" className="mt-auto text-primary hover:underline font-semibold">Learn more →</a>
            </div>
            {/* Break-even Analysis */}
            <div className="bg-background p-6 rounded-xl border border-border shadow hover:shadow-lg transition-all flex flex-col">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Break-even Analysis</h3>
              <p className="text-foreground/70 text-sm mb-4">Find out how many sales you need to cover your costs. This helps you set realistic goals and track your progress toward profitability.</p>
              <a href="/BreakEvenCalculator" className="mt-auto text-primary hover:underline font-semibold">Learn more →</a>
            </div>
            {/* Funding Analysis */}
            <div className="bg-background p-6 rounded-xl border border-border shadow hover:shadow-lg transition-all flex flex-col">
              <div className="text-4xl mb-4">🏦</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Funding Analysis</h3>
              <p className="text-foreground/70 text-sm mb-4">Understand how much money you need to raise and explore different funding options. This helps you avoid running out of cash and choose the best funding strategy.</p>
              <a href="/funding" className="mt-auto text-primary hover:underline font-semibold">Learn more →</a>
            </div>
            {/* Unit Economics */}
            <div className="bg-background p-6 rounded-xl border border-border shadow hover:shadow-lg transition-all flex flex-col">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Unit Economics</h3>
              <p className="text-foreground/70 text-sm mb-4">Measure the profitability of each customer or sale. This helps you optimize your business model and scale sustainably.</p>
              <a href="/UnitEconomics" className="mt-auto text-primary hover:underline font-semibold">Learn more →</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Assess Your Startup Risk?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get started with our comprehensive risk assessment tools and make
            informed business decisions.
          </p>
          <button
            className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            onClick={handleStartAssessment}
          >
            Start Your Assessment
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">RiskAssess Pro</h3>
              <p className="text-foreground/70 text-sm">
                Comprehensive risk assessment tools for startups and
                entrepreneurs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <a
                    href="/cogs-calculator"
                    className="hover:text-primary transition-colors"
                  >
                    COGS Calculator
                  </a>
                </li>
                <li>
                  <a
                    href="/sales-forecast"
                    className="hover:text-primary transition-colors"
                  >
                    Sales Forecast
                  </a>
                </li>
                <li>
                  <a
                    href="/salaries"
                    className="hover:text-primary transition-colors"
                  >
                    Salary Planning
                  </a>
                </li>
                <li>
                  <a
                    href="/forecast_pl"
                    className="hover:text-primary transition-colors"
                  >
                    Forecast P&L
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <a
                    href="/instructions"
                    className="hover:text-primary transition-colors"
                  >
                    Instructions
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-primary transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-primary transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-foreground/70 text-sm">
                Get in touch for support or questions about our risk assessment
                tools.
              </p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-foreground/70">
            <p>&copy; 2024 RiskAssess Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
