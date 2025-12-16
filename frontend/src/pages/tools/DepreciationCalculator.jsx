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

const DepreciationCalculator = () => {
  // Inputs
  const [purchaseAmount, setPurchaseAmount] = useState(100000);
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [depreciationRate, setDepreciationRate] = useState(15);
  const [depreciationMethod, setDepreciationMethod] = useState('WDV'); // SLM or WDV
  const [duration, setDuration] = useState(5);
  const [additionalDepreciation, setAdditionalDepreciation] = useState(false);

  // Results
  const [depreciationSchedule, setDepreciationSchedule] = useState([]);
  const [totalDepreciation, setTotalDepreciation] = useState(0);
  const [finalValue, setFinalValue] = useState(0);

  // FAQ state
  const [openFaq, setOpenFaq] = useState(null);

  // Common depreciation rates
  const commonRates = [
    { label: 'Residential Buildings', rate: 5 },
    { label: 'Commercial Buildings', rate: 10 },
    { label: 'Furniture and Fittings', rate: 10 },
    { label: 'Plant and Machinery', rate: 15 },
    { label: 'Computers and Software', rate: 40 },
    { label: 'Motor Vehicles (Commercial)', rate: 15 },
    { label: 'Motor Vehicles (Personal)', rate: 20 },
    { label: 'Intangible Assets', rate: 25 }
  ];

  // Auto-calc on change
  useEffect(() => {
    calculateDepreciation();
  }, [purchaseAmount, depreciationRate, depreciationMethod, duration, additionalDepreciation]);

  const calculateDepreciation = () => {
    const cost = Number(purchaseAmount) || 0;
    const rate = Number(depreciationRate) / 100;
    const years = Number(duration) || 1;

    if (cost <= 0 || rate <= 0) {
      setDepreciationSchedule([]);
      setTotalDepreciation(0);
      setFinalValue(cost);
      return;
    }

    const schedule = [];
    let currentValue = cost;
    let totalDep = 0;

    for (let year = 1; year <= years; year++) {
      let yearlyDep = 0;

      if (depreciationMethod === 'SLM') {
        // Straight Line Method: (Original Cost × Rate) / 100
        yearlyDep = cost * rate;
      } else {
        // Written Down Value Method: (Opening WDV × Rate) / 100
        yearlyDep = currentValue * rate;
      }

      // Apply half-year rule for first year (assuming asset used < 180 days)
      if (year === 1) {
        yearlyDep = yearlyDep / 2;
      }

      // Additional depreciation for first year (if applicable)
      let additionalDep = 0;
      if (additionalDepreciation && year === 1) {
        additionalDep = (cost * 0.20); // 20% additional depreciation
      }

      const totalYearlyDep = yearlyDep + additionalDep;
      const closingValue = Math.max(currentValue - totalYearlyDep, 1); // Minimum ₹1 residual value

      schedule.push({
        year,
        openingValue: currentValue,
        depreciation: yearlyDep,
        additionalDepreciation: additionalDep,
        totalDepreciation: totalYearlyDep,
        closingValue: closingValue
      });

      currentValue = closingValue;
      totalDep += totalYearlyDep;
    }

    setDepreciationSchedule(schedule);
    setTotalDepreciation(totalDep);
    setFinalValue(currentValue);
  };

  const handleRateSelect = (rate) => {
    setDepreciationRate(rate);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-600 h-80 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Left Side - 60% */}
            <div className="lg:col-span-3 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Depreciation Calculator as Per Income Tax Act
              </h1>
              <p className="text-lg mb-4">
                Calculate depreciation for your assets using Straight Line Method (SLM) or Written Down Value (WDV) as per Income Tax Act and Companies Act in India. Get precise calculations with year-by-year breakdown.
              </p>
              <div className="flex items-center space-x-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded text-sm">Tax Savings</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded text-sm">Accurate Calculations</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded text-sm">Year-wise Breakdown</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded text-sm">SLM & WDV Methods</span>
              </div>
              <div className="flex items-center mt-4">
                <a href="#google-reviews" className="flex items-center text-white hover:text-green-300">
                  <span className="text-yellow-400 mr-2">★★★★★</span>
                  <span>Google Reviews</span>
                  <span className="ml-2 font-bold">4.9</span>
                </a>
              </div>
            </div>
            {/* Right Side - 40% */}
            <div className="lg:col-span-2 flex justify-end">
              <div className="bg-gray-900 border-2 border-green-600 rounded-lg p-6 w-full max-w-md shadow-2xl">
                <h3 className="text-green-400 text-lg font-semibold mb-4 text-center">Get Expert Consultation</h3>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Thank you for your interest! We will contact you soon.'); }}>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Mobile *"
                    className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-3 rounded font-semibold hover:bg-green-600 transition-colors"
                  >
                    REQUEST A CALLBACK
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depreciation Calculator Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gray-900 rounded-xl shadow-2xl p-8 border border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Inputs */}
              <div>
                <h2 className="text-2xl font-bold text-teal-400 mb-6">Depreciation Calculator</h2>
                <div className="space-y-6">
                  {/* Purchase Amount */}
                  <div>
                    <label className="block text-lg font-semibold text-white mb-3">
                      Purchase Amount (₹)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={purchaseAmount}
                      onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                      className="w-full border border-gray-600 rounded-lg p-3 mb-3 text-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {/* Purchase Date */}
                  <div>
                    <label className="block text-lg font-semibold text-white mb-3">
                      Purchase Date
                    </label>
                    <input
                      type="date"
                      value={purchaseDate}
                      onChange={(e) => setPurchaseDate(e.target.value)}
                      className="w-full border border-gray-600 rounded-lg p-3 text-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {/* Depreciation Rate */}
                  <div>
                    <label className="block text-lg font-semibold text-white mb-3">
                      Depreciation Rate (%)
                    </label>
                    <div className="flex gap-3 items-center mb-3">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        step="0.1"
                        value={depreciationRate}
                        onChange={(e) => setDepreciationRate(Number(e.target.value))}
                        className="w-full border border-gray-600 rounded-lg p-3 text-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <span className="text-lg text-gray-400">%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {commonRates.map((rate) => (
                        <button
                          key={rate.label}
                          onClick={() => handleRateSelect(rate.rate)}
                          className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white p-2 rounded border border-gray-600 transition-colors"
                        >
                          {rate.label}: {rate.rate}%
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Depreciation Method */}
                  <div>
                    <label className="block text-lg font-semibold text-white mb-3">
                      Depreciation Method
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="SLM"
                          checked={depreciationMethod === 'SLM'}
                          onChange={(e) => setDepreciationMethod(e.target.value)}
                          className="mr-3"
                        />
                        <span className="text-white">Straight Line Method (SLM)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="WDV"
                          checked={depreciationMethod === 'WDV'}
                          onChange={(e) => setDepreciationMethod(e.target.value)}
                          className="mr-3"
                        />
                        <span className="text-white">Written Down Value (WDV)</span>
                      </label>
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-lg font-semibold text-white mb-3">
                      Duration (Years)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full border border-gray-600 rounded-lg p-3 text-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full mt-3"
                    />
                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                      <span>1 Year</span>
                      <span>50 Years</span>
                    </div>
                  </div>

                  {/* Additional Depreciation */}
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={additionalDepreciation}
                        onChange={(e) => setAdditionalDepreciation(e.target.checked)}
                        className="mr-3"
                      />
                      <span className="text-white">Eligible for Additional Depreciation (20%)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Side - Results */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">Total Depreciation</div>
                  <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-6">
                    {formatINR(totalDepreciation || 0)}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                    <span className="font-medium text-white">Original Cost</span>
                    <span className="font-bold text-lg text-teal-400">{formatINR(purchaseAmount || 0)}</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                    <span className="font-medium text-white">Total Depreciation</span>
                    <span className="font-bold text-lg text-red-400">{formatINR(totalDepreciation || 0)}</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                    <span className="font-medium text-white">Written Down Value</span>
                    <span className="font-bold text-lg text-green-400">{formatINR(finalValue || 0)}</span>
                  </div>
                </div>

                <div className="bg-blue-900 p-4 rounded-lg text-center">
                  <p className="text-white text-sm">
                    {depreciationMethod === 'WDV'
                      ? 'WDV method provides higher depreciation in early years, better for tax savings.'
                      : 'SLM method provides uniform depreciation throughout the asset\'s life.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Depreciation Schedule Table */}
            {depreciationSchedule.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-teal-400 mb-4">Year-wise Depreciation Schedule</h3>
                <div className="overflow-x-auto">
                  <table className="w-full bg-gray-800 rounded-lg">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-3 text-green-400">Year</th>
                        <th className="text-right p-3 text-green-400">Opening WDV</th>
                        <th className="text-right p-3 text-green-400">Depreciation</th>
                        {additionalDepreciation && <th className="text-right p-3 text-green-400">Additional Dep.</th>}
                        <th className="text-right p-3 text-green-400">Total Dep.</th>
                        <th className="text-right p-3 text-green-400">Closing WDV</th>
                      </tr>
                    </thead>
                    <tbody>
                      {depreciationSchedule.map((row) => (
                        <tr key={row.year} className="border-b border-gray-700">
                          <td className="p-3 text-white">Year {row.year}</td>
                          <td className="p-3 text-right text-white">{formatINR(row.openingValue)}</td>
                          <td className="p-3 text-right text-red-400">{formatINR(row.depreciation)}</td>
                          {additionalDepreciation && (
                            <td className="p-3 text-right text-orange-400">{formatINR(row.additionalDepreciation)}</td>
                          )}
                          <td className="p-3 text-right text-red-400">{formatINR(row.totalDepreciation)}</td>
                          <td className="p-3 text-right text-green-400">{formatINR(row.closingValue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Informational Sections */}
      {/* Section 1: Understanding Depreciation in India */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
            Understanding Depreciation in India
          </h2>
          <div className="text-white space-y-6">
            <p className="text-center max-w-4xl mx-auto">
              Depreciation represents the reduction in an asset's value due to usage, wear and tear, obsolescence, or market changes. In India, companies must calculate depreciation for both accounting purposes (Companies Act) and tax purposes (Income Tax Act).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-3">Straight Line Method (SLM)</h3>
                <p className="text-gray-300 text-sm mb-3">Under SLM, the depreciation runs along at a fixed slice of the asset's starting cost every year. The result is even predictable depreciation across the asset's useful life.</p>
                <div className="bg-gray-700 p-3 rounded text-center">
                  <p className="text-green-400 font-mono text-sm">Depreciation = (Original Cost × Rate) / 100</p>
                </div>
                <p className="text-xs text-gray-400 mt-2">Best for: Assets whose values depreciate uniformly over time</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-3">Written Down Value Method (WDV)</h3>
                <p className="text-gray-300 text-sm mb-3">It works on the basis of the reducing book value of the asset, whereby heftier write-offs come in the early years and smaller ones later.</p>
                <div className="bg-gray-700 p-3 rounded text-center">
                  <p className="text-green-400 font-mono text-sm">Depreciation = (Opening WDV × Rate) / 100</p>
                </div>
                <p className="text-xs text-gray-400 mt-2">Best for: Assets whose value depreciates faster during their early years</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-8 bg-gray-900">
        <div className="border-t border-gray-600 w-full max-w-xs relative">
          <span className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-gray-900 px-2 text-gray-400 text-sm">PU</span>
        </div>
      </div>

      {/* Section 2: Depreciation Under Income Tax Act */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
            Depreciation Under Income Tax Act
          </h2>
          <div className="text-white space-y-6">
            <p className="text-center max-w-4xl mx-auto">
              The Income Tax Act specifies the rate of depreciation on various types of assets. Following are the important points of the Income Tax Act:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-green-400 font-bold">•</span>
                  <p className="text-gray-300">Depreciation for tax purposes is calculated using the written down value method.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-400 font-bold">•</span>
                  <p className="text-gray-300">If an asset is used for fewer than 180 days in the first year, a special half-year rule is applied for depreciation.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-400 font-bold">•</span>
                  <p className="text-gray-300">New plant and machinery may qualify for additional depreciation.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-400 font-bold">•</span>
                  <p className="text-gray-300">Simple calculations are made possible since assets are blocked together.</p>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-4">Common Depreciation Rates</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Residential Buildings</span>
                    <span className="text-green-400">5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Commercial Buildings</span>
                    <span className="text-green-400">10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Furniture and Fittings</span>
                    <span className="text-green-400">10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Plant and Machinery</span>
                    <span className="text-green-400">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Computers and Software</span>
                    <span className="text-green-400">40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Motor Vehicles</span>
                    <span className="text-green-400">15-20%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-8 bg-gray-900">
        <div className="border-t border-gray-600 w-full max-w-xs relative">
          <span className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-gray-900 px-2 text-gray-400 text-sm">PU</span>
        </div>
      </div>

      {/* Section 3: Depreciation Under Companies Act */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
            Depreciation Under Companies Act
          </h2>
          <div className="text-white space-y-6">
            <p className="text-center max-w-4xl mx-auto">
              Under the Companies Act, 2013, for the purpose of financial reporting, one can follow SLM or WDV. The estimated assets' lives are given in Schedule II.
            </p>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-green-400 font-semibold mb-4">Key Points Under Companies Act</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-green-400 mr-2">•</span>Can use either SLM or WDV method</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">•</span>Asset lives specified in Schedule II</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">•</span>Used for financial reporting purposes</li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-green-400 mr-2">•</span>No half-year rule like Income Tax Act</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">•</span>Focus on true and fair view</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">•</span>Regulatory compliance requirement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-8 bg-gray-900">
        <div className="border-t border-gray-600 w-full max-w-xs relative">
          <span className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-gray-900 px-2 text-gray-400 text-sm">PU</span>
        </div>
      </div>

      {/* Section 4: Additional Depreciation Benefits */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
            Additional Depreciation Benefits
          </h2>
          <div className="text-white space-y-6">
            <p className="text-center max-w-4xl mx-auto">
              To incentivize investment in new plant and machinery, extra depreciation is available under the Income Tax Act:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-3">20% Additional Depreciation</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Available on new plant and machinery</li>
                  <li>• Office equipment and vehicles are excluded</li>
                  <li>• Can be claimed in the year of installation</li>
                  <li>• Reduces taxable income significantly</li>
                </ul>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-3">35% Additional Depreciation</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• For manufacturers in notified backward areas</li>
                  <li>• Higher incentive for specific regions</li>
                  <li>• Additional benefit over regular 20%</li>
                  <li>• Promotes industrial development</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-8 bg-gray-900">
        <div className="border-t border-gray-600 w-full max-w-xs relative">
          <span className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-gray-900 px-2 text-gray-400 text-sm">PU</span>
        </div>
      </div>

      {/* Section 5: Advantages of Using Depreciation Calculator */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
            Advantages of Using Depreciation Calculator
          </h2>
          <div className="text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <h3 className="text-green-400 font-semibold">Accurate Calculations</h3>
                    <p className="text-gray-300 text-sm">Ensure asset values are always current and calculations are precise.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <h3 className="text-green-400 font-semibold">Tax Savings</h3>
                    <p className="text-gray-300 text-sm">Use tax deductions to save money on your tax liability.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <h3 className="text-green-400 font-semibold">Asset Replacement Planning</h3>
                    <p className="text-gray-300 text-sm">Think about when to replace assets based on their depreciated value.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <h3 className="text-green-400 font-semibold">Method Comparison</h3>
                    <p className="text-gray-300 text-sm">Compare different ways to calculate depreciation (SLM vs WDV).</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <h3 className="text-green-400 font-semibold">Detailed Records</h3>
                    <p className="text-gray-300 text-sm">Create clear and detailed depreciation records for compliance.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <h3 className="text-green-400 font-semibold">Financial Reporting</h3>
                    <p className="text-gray-300 text-sm">Improve the precision of financial reports and statements.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-8 bg-gray-900">
        <div className="border-t border-gray-600 w-full max-w-xs relative">
          <span className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-gray-900 px-2 text-gray-400 text-sm">PU</span>
        </div>
      </div>

      {/* Section 6: How to Use Our Depreciation Calculator */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
            How to Use Our Depreciation Calculator
          </h2>
          <div className="text-white space-y-6">
            <p className="text-center max-w-4xl mx-auto">
              Our depreciation calculator is designed to be intuitive and user-friendly. Follow these simple steps to calculate depreciation for your assets:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="text-green-400 font-semibold mb-2">Enter Purchase Amount</h3>
                    <p className="text-gray-300 text-sm">Input the total cost of the asset in rupees that you want to depreciate.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="text-green-400 font-semibold mb-2">Select Purchase Date</h3>
                    <p className="text-gray-300 text-sm">Choose the date when the asset was purchased to determine the depreciation period.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="text-green-400 font-semibold mb-2">Choose Depreciation Rate</h3>
                    <p className="text-gray-300 text-sm">Select the appropriate depreciation rate or choose from common rates for different asset types.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="text-green-400 font-semibold mb-2">Select Depreciation Method</h3>
                    <p className="text-gray-300 text-sm">Choose between Straight Line Method (SLM) or Written Down Value (WDV) method.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">5</div>
                  <div>
                    <h3 className="text-green-400 font-semibold mb-2">Set Duration</h3>
                    <p className="text-gray-300 text-sm">Specify the number of years over which you want to calculate depreciation.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">6</div>
                  <div>
                    <h3 className="text-green-400 font-semibold mb-2">Check Additional Depreciation</h3>
                    <p className="text-gray-300 text-sm">If eligible, check the box for additional depreciation benefits (20% extra).</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">7</div>
                  <div>
                    <h3 className="text-green-400 font-semibold mb-2">View Results</h3>
                    <p className="text-gray-300 text-sm">Get instant results with total depreciation, written down value, and year-wise breakdown.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-8 bg-gray-900">
        <div className="border-t border-gray-600 w-full max-w-xs relative">
          <span className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-gray-900 px-2 text-gray-400 text-sm">PU</span>
        </div>
      </div>

      {/* Section 7: Frequently Asked Questions */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-green-400 mb-8 text-center">
            Frequently Asked Questions About Depreciation
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-800 border border-green-500 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-700 transition-colors"
              >
                <span className="text-white font-medium">What is the difference between SLM and WDV methods?</span>
                <span className="text-green-400 text-xl">{openFaq === 0 ? '−' : '+'}</span>
              </button>
              {openFaq === 0 && (
                <div className="px-4 pb-4 text-gray-300">
                  SLM provides uniform depreciation throughout the asset's life, while WDV provides higher depreciation in early years and lower amounts in later years. WDV is mandatory for tax purposes under the Income Tax Act.
                </div>
              )}
            </div>

            <div className="bg-gray-800 border border-green-500 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-700 transition-colors"
              >
                <span className="text-white font-medium">When is additional depreciation applicable?</span>
                <span className="text-green-400 text-xl">{openFaq === 1 ? '−' : '+'}</span>
              </button>
              {openFaq === 1 && (
                <div className="px-4 pb-4 text-gray-300">
                  Additional depreciation of 20% is available on new plant and machinery (excluding office equipment and vehicles) in the year of installation. 35% additional depreciation is available for manufacturers in notified backward areas.
                </div>
              )}
            </div>

            <div className="bg-gray-800 border border-green-500 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-700 transition-colors"
              >
                <span className="text-white font-medium">What is the half-year rule for depreciation?</span>
                <span className="text-green-400 text-xl">{openFaq === 2 ? '−' : '+'}</span>
              </button>
              {openFaq === 2 && (
                <div className="px-4 pb-4 text-gray-300">
                  If an asset is used for fewer than 180 days in the first year, only half of the normal depreciation is allowed for that year. This rule applies under the Income Tax Act for tax depreciation calculations.
                </div>
              )}
            </div>

            <div className="bg-gray-800 border border-green-500 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-700 transition-colors"
              >
                <span className="text-white font-medium">Why is there a ₹1 residual value in the depreciation table?</span>
                <span className="text-green-400 text-xl">{openFaq === 3 ? '−' : '+'}</span>
              </button>
              {openFaq === 3 && (
                <div className="px-4 pb-4 text-gray-300">
                  The ₹1 residual value represents the minimum book value that an asset can have. Even after full depreciation, assets are shown with a nominal value of ₹1 in the books to indicate they are still owned by the company.
                </div>
              )}
            </div>

            <div className="bg-gray-800 border border-green-500 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
                className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-700 transition-colors"
              >
                <span className="text-white font-medium">Which depreciation method is better for tax savings?</span>
                <span className="text-green-400 text-xl">{openFaq === 4 ? '−' : '+'}</span>
              </button>
              {openFaq === 4 && (
                <div className="px-4 pb-4 text-gray-300">
                  WDV method is generally better for tax savings as it allows higher depreciation in early years, reducing taxable income more significantly when the asset is new. However, the choice depends on your specific financial situation and cash flow requirements.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Why Professional Utilities? */}
      <div className="bg-gray-900">
        <WhyCompanySection />
      </div>

      {/* Section 9: Testimonials */}
      <TestimonialsSection />

      {/* Section 10: Trusted By */}
      <div className="bg-gray-900">
        <TrustedBy />
      </div>
    </div>
  );
};

export default DepreciationCalculator;