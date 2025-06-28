"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ContactForm from "@/components/ContactForm";

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
    {
      title: "Glossary",
      description: "Essential financial terms and concepts for entrepreneurs",
      icon: "📚",
      href: "/Glossary",
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
            {/* Glossary */}
            <div className="bg-background p-6 rounded-xl border border-border shadow hover:shadow-lg transition-all flex flex-col">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Financial Glossary</h3>
              <p className="text-foreground/70 text-sm mb-4">Essential financial terms and concepts explained in simple terms. Perfect for entrepreneurs learning the language of business finance.</p>
              <a href="/Glossary" className="mt-auto text-primary hover:underline font-semibold">Learn more →</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                About RiskAssess Pro
              </h2>
              <p className="text-lg text-foreground/80 mb-6">
                RiskAssess Pro is a comprehensive risk assessment platform designed specifically for startups and entrepreneurs. We understand that launching and scaling a business comes with inherent risks, and our mission is to help you identify, analyze, and mitigate these risks through data-driven insights.
              </p>
              <p className="text-lg text-foreground/80 mb-6">
                Our suite of professional tools covers every aspect of startup risk assessment - from initial cost analysis to unit economics, helping you make informed decisions that drive sustainable growth and profitability.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Comprehensive Analysis</h3>
                    <p className="text-foreground/70 text-sm">From startup costs to break-even analysis, we cover all critical financial aspects.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">User-Friendly Interface</h3>
                    <p className="text-foreground/70 text-sm">Intuitive tools designed for entrepreneurs, not financial experts.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Educational Resources</h3>
                    <p className="text-foreground/70 text-sm">Comprehensive glossary and step-by-step instructions to build your financial knowledge.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/20 rounded-2xl p-8 border border-border">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📊</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Risk Assessment</h3>
                      <p className="text-foreground/70 text-sm">Identify potential risks before they become problems</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Strategic Planning</h3>
                      <p className="text-foreground/70 text-sm">Make data-driven decisions for your business growth</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-2xl">💰</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Financial Health</h3>
                      <p className="text-foreground/70 text-sm">Monitor and improve your startup's financial position</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary rounded-full opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Have questions about risk assessment or need help with your startup? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Let's Start a Conversation
              </h3>
              <p className="text-foreground/80 mb-6">
                Whether you're just starting your entrepreneurial journey or looking to optimize your existing business, our team is ready to provide guidance and support.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email Support</h4>
                    <p className="text-foreground/70 text-sm">Get detailed responses to your questions within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Expert Guidance</h4>
                    <p className="text-foreground/70 text-sm">Receive personalized advice from startup and financial experts</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Quick Response</h4>
                    <p className="text-foreground/70 text-sm">We typically respond to all inquiries within a few hours</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-background p-8 rounded-xl border border-border shadow-sm">
              <ContactForm />
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
                    href="/Glossary"
                    className="hover:text-primary transition-colors"
                  >
                    Glossary
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
