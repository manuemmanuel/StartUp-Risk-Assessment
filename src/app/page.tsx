'use client';

import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      title: "Instructions",
      description: "Step-by-step guidance for conducting comprehensive risk assessments",
      icon: "📋",
      href: "#instructions"
    },
    {
      title: "Startup Costs",
      description: "Calculate and analyze initial investment requirements",
      icon: "💰",
      href: "#startup-costs"
    },
    {
      title: "COGS Calculator",
      description: "Determine cost of goods sold and gross margins",
      icon: "🧮",
      href: "#cogs-calculator"
    },
    {
      title: "Sales Forecast",
      description: "Project revenue streams and market potential",
      icon: "📈",
      href: "#sales-forecast"
    },
    {
      title: "Salaries",
      description: "Plan workforce costs and compensation structure",
      icon: "👥",
      href: "#salaries"
    },
    {
      title: "Forecast P&L",
      description: "Project profit and loss statements",
      icon: "📊",
      href: "#forecast-pl"
    },
    {
      title: "Break-even Analysis",
      description: "Calculate when your business becomes profitable",
      icon: "⚖️",
      href: "#break-even"
    },
    {
      title: "Funding",
      description: "Analyze funding requirements and sources",
      icon: "🏦",
      href: "#funding"
    },
    {
      title: "Unit Economics",
      description: "Understand profitability per customer/transaction",
      icon: "🎯",
      href: "#unit-economics"
    },
    {
      title: "Glossary",
      description: "Comprehensive business and financial terms",
      icon: "📚",
      href: "#glossary"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-foreground">RiskAssess Pro</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
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
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
                <a href="#features" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">Features</a>
                <a href="#about" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">About</a>
                <a href="#contact" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">Contact</a>
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
              Make informed business decisions with our suite of professional risk assessment tools. 
              From startup costs to unit economics, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
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
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Complete Risk Assessment Toolkit
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Everything you need to evaluate and mitigate risks in your startup journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group cursor-pointer"
                onClick={() => document.getElementById(feature.href.slice(1))?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Instructions Section */}
          <div id="instructions" className="scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Step-by-Step Instructions</h2>
                <p className="text-foreground/80 mb-6">
                  Follow our comprehensive guide to conduct a thorough risk assessment for your startup. 
                  Our structured approach ensures you don't miss any critical factors.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-3">✓</span>
                    <span>Define your business model and target market</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">✓</span>
                    <span>Identify key risk factors and assumptions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">✓</span>
                    <span>Gather financial and market data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">✓</span>
                    <span>Run comprehensive analysis</span>
                  </li>
                </ul>
              </div>
              <div className="bg-secondary p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Quick Start Guide</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-background rounded-lg">
                    <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">1</span>
                    <span>Complete startup costs assessment</span>
                  </div>
                  <div className="flex items-center p-4 bg-background rounded-lg">
                    <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">2</span>
                    <span>Calculate COGS and margins</span>
                  </div>
                  <div className="flex items-center p-4 bg-background rounded-lg">
                    <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">3</span>
                    <span>Project sales and revenue</span>
                  </div>
                  <div className="flex items-center p-4 bg-background rounded-lg">
                    <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">4</span>
                    <span>Analyze break-even point</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Startup Costs Section */}
          <div id="startup-costs" className="scroll-mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Startup Costs Calculator</h2>
              <p className="text-foreground/80 max-w-2xl mx-auto">
                Calculate all initial costs required to launch your business, from legal fees to equipment and marketing.
              </p>
            </div>
            <div className="bg-secondary p-8 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-background p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Legal & Administrative</h3>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    <li>• Business registration</li>
                    <li>• Legal consultation</li>
                    <li>• Insurance policies</li>
                    <li>• Permits & licenses</li>
                  </ul>
                </div>
                <div className="bg-background p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Equipment & Technology</h3>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    <li>• Office equipment</li>
                    <li>• Software licenses</li>
                    <li>• IT infrastructure</li>
                    <li>• Production tools</li>
                  </ul>
                </div>
                <div className="bg-background p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Marketing & Branding</h3>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    <li>• Website development</li>
                    <li>• Brand identity</li>
                    <li>• Marketing materials</li>
                    <li>• Launch campaigns</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* COGS Calculator Section */}
          <div id="cogs-calculator" className="scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">COGS Calculator</h2>
                <p className="text-foreground/80 mb-6">
                  Determine your Cost of Goods Sold to understand your gross margins and pricing strategy. 
                  Essential for product-based businesses.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                    <span>Direct Materials</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                    <span>Direct Labor</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                    <span>Manufacturing Overhead</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-primary text-primary-foreground rounded-lg">
                    <span>Total COGS</span>
                    <span className="font-bold">$0.00</span>
                  </div>
                </div>
              </div>
              <div className="bg-secondary p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Gross Margin Analysis</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">0%</div>
                    <div className="text-sm text-foreground/70">Gross Margin</div>
                  </div>
                  <div className="h-4 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <p className="text-sm text-foreground/70">
                    A healthy gross margin typically ranges from 20-80% depending on your industry and business model.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sales Forecast Section */}
          <div id="sales-forecast" className="scroll-mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Sales Forecast</h2>
              <p className="text-foreground/80 max-w-2xl mx-auto">
                Project your revenue streams and understand your market potential with our advanced forecasting tools.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-secondary p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-primary mb-2">Year 1</div>
                <div className="text-2xl font-semibold mb-2">$0</div>
                <div className="text-sm text-foreground/70">Projected Revenue</div>
              </div>
              <div className="bg-secondary p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-primary mb-2">Year 2</div>
                <div className="text-2xl font-semibold mb-2">$0</div>
                <div className="text-sm text-foreground/70">Projected Revenue</div>
              </div>
              <div className="bg-secondary p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-primary mb-2">Year 3</div>
                <div className="text-2xl font-semibold mb-2">$0</div>
                <div className="text-sm text-foreground/70">Projected Revenue</div>
              </div>
            </div>
          </div>

          {/* Salaries Section */}
          <div id="salaries" className="scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Salary Planning</h2>
                <p className="text-foreground/80 mb-6">
                  Plan your workforce costs and compensation structure to ensure sustainable growth and employee satisfaction.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                    <span>Founder/CEO</span>
                    <span className="font-semibold">$0/year</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                    <span>Technical Team</span>
                    <span className="font-semibold">$0/year</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                    <span>Sales & Marketing</span>
                    <span className="font-semibold">$0/year</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                    <span>Operations</span>
                    <span className="font-semibold">$0/year</span>
                  </div>
                </div>
              </div>
              <div className="bg-secondary p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Compensation Strategy</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Base Salary</span>
                    <span className="text-sm text-foreground/70">60-80%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Equity</span>
                    <span className="text-sm text-foreground/70">10-30%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Benefits</span>
                    <span className="text-sm text-foreground/70">10-20%</span>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-foreground/70">
                      Consider market rates, experience levels, and equity distribution for early-stage companies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Forecast P&L Section */}
          <div id="forecast-pl" className="scroll-mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Forecast P&L</h2>
              <p className="text-foreground/80 max-w-2xl mx-auto">
                Project your profit and loss statements to understand your financial trajectory and identify key drivers.
              </p>
            </div>
            <div className="bg-secondary p-8 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Revenue Streams</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                      <span>Product Sales</span>
                      <span className="font-semibold">$0</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                      <span>Service Revenue</span>
                      <span className="font-semibold">$0</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                      <span>Subscription Fees</span>
                      <span className="font-semibold">$0</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-primary text-primary-foreground rounded-lg">
                      <span>Total Revenue</span>
                      <span className="font-bold">$0</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Expenses</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                      <span>COGS</span>
                      <span className="font-semibold">$0</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                      <span>Operating Expenses</span>
                      <span className="font-semibold">$0</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                      <span>Marketing & Sales</span>
                      <span className="font-semibold">$0</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-500 text-white rounded-lg">
                      <span>Total Expenses</span>
                      <span className="font-bold">$0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-6 bg-background rounded-lg text-center">
                <div className="text-2xl font-bold text-primary mb-2">Net Profit: $0</div>
                <div className="text-sm text-foreground/70">Projected annual profit/loss</div>
              </div>
            </div>
          </div>

          {/* Break-even Analysis Section */}
          <div id="break-even" className="scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Break-even Analysis</h2>
                <p className="text-foreground/80 mb-6">
                  Calculate when your business becomes profitable and understand the key metrics that drive your break-even point.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                    <span>Fixed Costs</span>
                    <span className="font-semibold">$0/month</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                    <span>Variable Costs per Unit</span>
                    <span className="font-semibold">$0</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                    <span>Selling Price per Unit</span>
                    <span className="font-semibold">$0</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-primary text-primary-foreground rounded-lg">
                    <span>Break-even Units</span>
                    <span className="font-bold">0 units</span>
                  </div>
                </div>
              </div>
              <div className="bg-secondary p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Break-even Timeline</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">0 months</div>
                    <div className="text-sm text-foreground/70">Time to break-even</div>
                  </div>
                  <div className="h-4 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Based on current projections and market assumptions. Consider multiple scenarios for better planning.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Funding Section */}
          <div id="funding" className="scroll-mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Funding Analysis</h2>
              <p className="text-foreground/80 max-w-2xl mx-auto">
                Analyze your funding requirements and explore different sources of capital for your startup.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-secondary p-6 rounded-xl text-center">
                <div className="text-2xl mb-2">💳</div>
                <h3 className="font-semibold mb-2">Bootstrapping</h3>
                <p className="text-sm text-foreground/70">Self-funding with personal savings and revenue</p>
              </div>
              <div className="bg-secondary p-6 rounded-xl text-center">
                <div className="text-2xl mb-2">👥</div>
                <h3 className="font-semibold mb-2">Friends & Family</h3>
                <p className="text-sm text-foreground/70">Early-stage funding from personal network</p>
              </div>
              <div className="bg-secondary p-6 rounded-xl text-center">
                <div className="text-2xl mb-2">🦄</div>
                <h3 className="font-semibold mb-2">Angel Investors</h3>
                <p className="text-sm text-foreground/70">Individual investors providing seed capital</p>
              </div>
              <div className="bg-secondary p-6 rounded-xl text-center">
                <div className="text-2xl mb-2">🏢</div>
                <h3 className="font-semibold mb-2">Venture Capital</h3>
                <p className="text-sm text-foreground/70">Institutional funding for growth-stage companies</p>
              </div>
            </div>
          </div>

          {/* Unit Economics Section */}
          <div id="unit-economics" className="scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Unit Economics</h2>
                <p className="text-foreground/80 mb-6">
                  Understand the profitability of each customer or transaction to optimize your business model and pricing strategy.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                    <span>Customer Acquisition Cost (CAC)</span>
                    <span className="font-semibold">$0</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                    <span>Lifetime Value (LTV)</span>
                    <span className="font-semibold">$0</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                    <span>Gross Margin per Unit</span>
                    <span className="font-semibold">$0</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-primary text-primary-foreground rounded-lg">
                    <span>LTV/CAC Ratio</span>
                    <span className="font-bold">0:1</span>
                  </div>
                </div>
              </div>
              <div className="bg-secondary p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Unit Economics Health</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">Poor</div>
                    <div className="text-sm text-foreground/70">LTV/CAC Ratio</div>
                  </div>
                  <div className="h-4 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Target LTV/CAC ratio of 3:1 or higher for sustainable growth. Focus on increasing LTV and reducing CAC.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Glossary Section */}
          <div id="glossary" className="scroll-mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Business Glossary</h2>
              <p className="text-foreground/80 max-w-2xl mx-auto">
                Essential business and financial terms to help you understand risk assessment concepts.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-secondary p-6 rounded-xl">
                <h3 className="font-semibold mb-3">Financial Terms</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>COGS:</strong> Cost of Goods Sold - direct costs of producing goods</div>
                  <div><strong>LTV:</strong> Lifetime Value - total revenue from a customer</div>
                  <div><strong>CAC:</strong> Customer Acquisition Cost - cost to acquire a customer</div>
                  <div><strong>Gross Margin:</strong> Revenue minus COGS, expressed as percentage</div>
                </div>
              </div>
              <div className="bg-secondary p-6 rounded-xl">
                <h3 className="font-semibold mb-3">Business Terms</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Break-even:</strong> Point where revenue equals total costs</div>
                  <div><strong>Unit Economics:</strong> Profitability analysis per customer/transaction</div>
                  <div><strong>Runway:</strong> Time until cash runs out</div>
                  <div><strong>Burn Rate:</strong> Rate at which company spends cash</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Assess Your Startup Risk?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get started with our comprehensive risk assessment tools and make informed business decisions.
          </p>
          <button className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
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
                Comprehensive risk assessment tools for startups and entrepreneurs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><a href="#startup-costs" className="hover:text-primary transition-colors">Startup Costs</a></li>
                <li><a href="#cogs-calculator" className="hover:text-primary transition-colors">COGS Calculator</a></li>
                <li><a href="#sales-forecast" className="hover:text-primary transition-colors">Sales Forecast</a></li>
                <li><a href="#break-even" className="hover:text-primary transition-colors">Break-even Analysis</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><a href="#instructions" className="hover:text-primary transition-colors">Instructions</a></li>
                <li><a href="#glossary" className="hover:text-primary transition-colors">Glossary</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-foreground/70 text-sm">
                Get in touch for support or questions about our risk assessment tools.
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
