import React, { useState, useEffect } from "react";
import WhyCompanySection from "../WhyUs";
import TestimonialsSection from "../TestimonialsSection";
import TrustedBy from "../../components/TrustBy";

const formatINR = (value) => {
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
  } catch {
    return `₹${Math.round(value)}`;
  }
};

const DonutChart = ({ principal, interest }) => {
  const total = principal + interest;
  if (total === 0) return null;

  const principalPercent = Math.round((principal / total) * 100);
  const interestPercent = 100 - principalPercent;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900 mb-2">Breakdown</div>
        <div className="space-y-3">
          <div className="flex items-center justify-between w-48">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span className="text-gray-900 text-sm">Principal</span>
            </div>
            <span className="text-gray-900 font-semibold">{principalPercent}%</span>
          </div>
          <div className="flex items-center justify-between w-48">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-600 rounded"></div>
              <span className="text-gray-900 text-sm">Interest</span>
            </div>
            <span className="text-gray-900 font-semibold">{interestPercent}%</span>
          </div>
        </div>
      </div>
      {/* Simple visual representation */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
        <div
          className="h-full bg-blue-600"
          style={{ width: `${principalPercent}%` }}
        ></div>
        <div
          className="h-full bg-green-600"
          style={{ width: `${interestPercent}%`, marginLeft: `${principalPercent}%` }}
        ></div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "What sort of loans can I use the EMI calculator for?",
      answer: "You can use our EMI calculator for various types of loans including home loans, personal loans, car loans, education loans, and business loans."
    },
    {
      question: "How does debt-to-income ratio affect loan chances?",
      answer: "Debt-to-income ratio is a key factor lenders consider. A ratio below 50% increases your chances of loan approval. Our EMI calculator helps you maintain this ratio by showing accurate EMI amounts."
    },
    {
      question: "What does an EMI consist of?",
      answer: "EMI consists of two parts: principal amount repayment and interest payment. The proportion of principal vs interest changes over the loan tenure."
    },
    {
      question: "What happens if I fail to pay my EMIs?",
      answer: "Failing to pay EMIs can result in penalties, increased interest rates, negative impact on credit score, and potential legal action from the lender."
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Accordion - Left Side */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-green-600 mb-8 text-center">
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-900 font-medium">{faq.question}</span>
                    <span className="text-green-600 text-xl">
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-gray-700">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Expert CTA Card - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-green-500 rounded-lg p-6 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍💻</span>
                </div>
              </div>
              <h3 className="text-gray-900 text-lg font-semibold mb-4">
                Speak Directly to our Expert Today
              </h3>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mb-4">
                Get in Touch
              </button>
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-600 text-sm">Reliable</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-600 text-sm">Affordable</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-600 text-sm">Assured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EmiCalculator = () => {
  // Inputs - matching reference defaults
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(10);

  // Results
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  // Auto-calc on change
  useEffect(() => {
    const P = Number(loanAmount) || 0;
    const R = Number(interestRate) / 12 / 100; // monthly rate
    const N = Number(tenureYears) * 12; // convert years to months

    if (P <= 0 || N <= 0) {
      setEmi(0);
      setTotalInterest(0);
      setTotalPayment(0);
      return;
    }

    if (R === 0) {
      const emiCalc = P / N;
      const totalPay = emiCalc * N;
      setEmi(emiCalc);
      setTotalPayment(totalPay);
      setTotalInterest(totalPay - P);
      return;
    }

    const emiCalc = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPay = emiCalc * N;
    setEmi(emiCalc);
    setTotalPayment(totalPay);
    setTotalInterest(totalPay - P);
  }, [loanAmount, interestRate, tenureYears]);

  // Slider ranges - matching reference
  const loanMin = 100000;
  const loanMax = 50000000; // 5 crore

  const interestMin = 1;
  const interestMax = 20;

  const tenureMin = 1;
  const tenureMax = 30;

  return (
    <div className="has-fixed-navbar">
      {/* Hero Section */}
      <section className="calculator-hero bg-gradient-to-r from-blue-900 to-blue-600 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Left Side - 60% */}
            <div className="lg:col-span-3 text-gray-900">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                EMI Calculator Tool – Calculate Now
              </h1>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="text-green-600 mr-3">✓</span>
                  Lowest Price Guarantee
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-3">✓</span>
                  Free Expert Related Guidance
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-3">✓</span>
                  Quick and Hassle-Free Process
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-3">✓</span>
                  Expert Assistance Without the Hassle
                </li>
              </ul>
              <div className="flex items-center">
                <span className="text-sm mr-2">Google</span>
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-sm ml-2">4.9</span>
              </div>
            </div>
            {/* Right Side - 40% */}
            <div className="lg:col-span-2 flex justify-end">
              <div className="calculator-form-card">
                <h3 className="text-green-600 text-lg font-semibold mb-4 text-center">Get Expert Consultation</h3>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Thank you for your interest! We will contact you soon.'); }}>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    className="w-full p-3 rounded bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    className="w-full p-3 rounded bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Mobile *"
                    className="w-full p-3 rounded bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition-colors"
                  >
                    REQUEST A CALLBACK
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <section className="calculator-main">
        <div className="max-w-6xl mx-auto px-4">
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Inputs + Results */}
              <div>
                <h2 className="text-2xl font-bold text-green-600 mb-6">EMI Calculator</h2>
                <div className="space-y-6">
                  {/* Loan Amount */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-3">
                      Loan Amount (₹)
                    </label>
                    <input
                      type="number"
                      min={loanMin}
                      max={loanMax}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg p-3 mb-3 text-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="range"
                      min={loanMin}
                      max={loanMax}
                      step={10000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>₹{loanMin.toLocaleString('en-IN')}</span>
                      <span>₹{loanMax.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Rate of Interest */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-3">
                      Rate of Interest (P.A.)
                    </label>
                    <div className="flex gap-3 items-center mb-3">
                      <input
                        type="number"
                        step="0.1"
                        min={interestMin}
                        max={interestMax}
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg p-3 text-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <span className="text-lg text-gray-600">%</span>
                    </div>
                    <input
                      type="range"
                      min={interestMin}
                      max={interestMax}
                      step={0.1}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>{interestMin}%</span>
                      <span>{interestMax}%</span>
                    </div>
                  </div>

                  {/* Loan Tenure */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-3">
                      Loan Tenure
                    </label>
                    <div className="flex gap-3 items-center mb-3">
                      <input
                        type="number"
                        min={tenureMin}
                        max={tenureMax}
                        value={tenureYears}
                        onChange={(e) => setTenureYears(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg p-3 text-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <span className="text-lg text-gray-600">Years</span>
                    </div>
                    <input
                      type="range"
                      min={tenureMin}
                      max={tenureMax}
                      value={tenureYears}
                      onChange={(e) => setTenureYears(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>{tenureMin} Years</span>
                      <span>{tenureMax} Years</span>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="mt-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-100 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Monthly EMI</div>
                      <div className="text-xl font-bold text-gray-900">{formatINR(emi || 0)}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-100 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Principal Amount</div>
                      <div className="text-xl font-bold text-gray-900">{formatINR(loanAmount)}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-100 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Total Interest</div>
                      <div className="text-xl font-bold text-gray-900">{formatINR(totalInterest || 0)}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-100 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                      <div className="text-xl font-bold text-gray-900">{formatINR(totalPayment || 0)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Donut Chart */}
              <div className="flex items-center justify-center">
                <DonutChart principal={loanAmount} interest={totalInterest || 0} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Informational Sections */}
      {/* Section 1: How can an online EMI calculator help you? */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
            How can an online EMI calculator help you?
          </h2>
          <div className="text-gray-900 space-y-4">
            <p className="text-center mb-6">
              An online EMI calculator is an essential tool for anyone considering taking a loan. It provides quick and accurate calculations to help you understand your financial commitments.
            </p>
            <ul className="list-disc list-inside space-y-2 max-w-4xl mx-auto">
              <li>Helps you plan your finances effectively by showing exact monthly payments</li>
              <li>Provides accurate EMI estimation to ensure you stay within your budget</li>
              <li>Eliminates any chance of miscalculation in complex loan computations</li>
              <li>Offers loan-specific EMI breakup tailored to different types of loans</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-8 bg-gray-50">
        <div className="border-t border-gray-300 w-full max-w-xs relative">
          <span className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-gray-50 px-2 text-gray-500 text-sm">PU</span>
        </div>
      </div>

      {/* Section 2: The formula to determine loan EMI amount */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
            The formula to determine loan EMI amount
          </h2>
          <div className="text-gray-900 space-y-6">
            <div className="bg-gray-100 p-6 rounded-lg text-center max-w-md mx-auto">
              <div className="text-2xl font-mono text-green-600">EMI = P × R × (1+R)^N / ((1+R)^N - 1)</div>
            </div>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-green-600 mb-4">Where:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-green-600">P</strong> is the principal amount (loan amount)</li>
                <li><strong className="text-green-600">R</strong> is the rate of interest per month (annual rate divided by 12)</li>
                <li><strong className="text-green-600">N</strong> is the loan tenure in months</li>
              </ul>
            </div>
            <p className="text-center max-w-4xl mx-auto">
              This is the standardized formula used by financial institutions worldwide for EMI calculations. Some lenders may add additional factors based on specific loan terms.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-8 bg-white">
        <div className="border-t border-gray-300 w-full max-w-xs relative">
          <span className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-white px-2 text-gray-500 text-sm">PU</span>
        </div>
      </div>

      {/* Section 3: How to use Professional Utilities online EMI calculator? */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
            How to use Professional Utilities online EMI calculator?
          </h2>
          <div className="text-gray-900 space-y-4">
            <p className="text-center mb-6">
              Using our EMI calculator is simple and takes just a few seconds to get accurate results.
            </p>
            <ul className="list-decimal list-inside space-y-2 max-w-4xl mx-auto">
              <li>Enter the principal loan amount you wish to borrow</li>
              <li>Input the rate of interest applicable to your loan</li>
              <li>Specify the loan tenure in years</li>
              <li>Get instant EMI calculation results with detailed breakdown</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-8 bg-gray-50">
        <div className="border-t border-gray-300 w-full max-w-xs relative">
          <span className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-gray-50 px-2 text-gray-500 text-sm">PU</span>
        </div>
      </div>

      {/* Section 4: Advantages of using Professional Utilities calculator */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
            Advantages of using Professional Utilities calculator
          </h2>
          <div className="text-gray-900">
            <ul className="list-disc list-inside space-y-2 max-w-4xl mx-auto">
              <li>Completely free to use with no hidden charges</li>
              <li>100% accurate calculations using standard financial formulas</li>
              <li>Provides instant results without any delay</li>
              <li>Can be used unlimited times for multiple calculations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 1: Frequently Asked Questions (FAQ) */}
      <FAQSection />

      {/* Section 2: Why Professional Utilities? */}
      <div className="bg-white">
        <WhyCompanySection />
      </div>

      {/* Section 3: Testimonials */}
      <TestimonialsSection />

      {/* Section 4: Trusted By */}
      <div className="bg-gray-50">
        <TrustedBy />
      </div>
    </div>
  );
};

export default EmiCalculator;