import React, { useState } from 'react';
import { CurrencyCode, formatPrice } from '../utils/currency';
import { Calculator, ArrowRight, Check } from 'lucide-react';

interface FinanceCalculatorProps {
  vehiclePrice: number;
  currency: CurrencyCode;
  onApplyForFinancing?: (terms: { downPayment: number; months: number; monthlyPayment: number }) => void;
}

export const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({
  vehiclePrice,
  currency,
  onApplyForFinancing
}) => {
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<number>(5.9);
  const [mode, setMode] = useState<'finance' | 'lease'>('finance');

  const downPaymentAmount = Math.round((vehiclePrice * downPaymentPercent) / 100);
  const financedPrincipal = vehiclePrice - downPaymentAmount;

  // Monthly loan calculation
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = mode === 'finance'
    ? Math.round(
        (financedPrincipal * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) /
        (Math.pow(1 + monthlyRate, loanTermMonths) - 1)
      )
    : Math.round((financedPrincipal * 0.45) / loanTermMonths + (financedPrincipal * monthlyRate));

  const totalPayments = monthlyPayment * loanTermMonths;
  const totalFinanceCost = totalPayments - financedPrincipal;

  return (
    <div className="bg-[#14141A] border border-[#262632] rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-[#22222C] pb-4">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-[#D4AF37]" />
          <div>
            <h4 className="text-sm font-semibold text-white">
              Bespoke Finance &amp; Lease Estimator
            </h4>
            <p className="text-[11px] text-[#868694]">
              Tailored high-net-worth private wealth financing solutions
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center p-0.5 rounded-lg bg-[#0E0E12] border border-[#272733] text-xs">
          <button
            type="button"
            onClick={() => setMode('finance')}
            className={`px-3 py-1 rounded font-medium transition-colors ${
              mode === 'finance' ? 'bg-[#D4AF37] text-black font-semibold' : 'text-[#8C8C9A] hover:text-white'
            }`}
          >
            Financing
          </button>
          <button
            type="button"
            onClick={() => setMode('lease')}
            className={`px-3 py-1 rounded font-medium transition-colors ${
              mode === 'lease' ? 'bg-[#D4AF37] text-black font-semibold' : 'text-[#8C8C9A] hover:text-white'
            }`}
          >
            Executive Lease
          </button>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Down Payment Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#A2A2B0]">Down Payment ({downPaymentPercent}%)</span>
            <span className="text-white font-mono font-medium">
              {formatPrice(downPaymentAmount, currency)}
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="70"
            step="5"
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="w-full accent-[#D4AF37] h-1.5 bg-[#262635] rounded cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#6E6E7C]">
            <span>10%</span>
            <span>40%</span>
            <span>70%</span>
          </div>
        </div>

        {/* Term Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#A2A2B0]">Term Length</span>
            <span className="text-white font-medium">{loanTermMonths} Months</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[24, 36, 48, 60].map((months) => (
              <button
                key={months}
                type="button"
                onClick={() => setLoanTermMonths(months)}
                className={`py-1.5 rounded text-xs font-medium border transition-colors ${
                  loanTermMonths === months
                    ? 'border-[#D4AF37] bg-[#2A2312] text-[#F3E5AB]'
                    : 'border-[#262633] bg-[#181822] text-[#A6A6B4] hover:border-[#383848]'
                }`}
              >
                {months}m
              </button>
            ))}
          </div>
        </div>

        {/* Interest Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#A2A2B0]">Estimated APR</span>
            <span className="text-white font-mono font-medium">{interestRate}%</span>
          </div>
          <input
            type="range"
            min="3.9"
            max="12.9"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full accent-[#D4AF37] h-1.5 bg-[#262635] rounded cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#6E6E7C]">
            <span>3.9% (Tier 1)</span>
            <span>7.9%</span>
            <span>12.9%</span>
          </div>
        </div>
      </div>

      {/* Output Panel */}
      <div className="p-4 bg-[#181822] border border-[#2B2B38] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#8A8A96] block">
            Estimated Monthly Payment
          </span>
          <div className="text-2xl font-bold font-display text-[#F3E5AB] mt-0.5">
            {formatPrice(monthlyPayment, currency)}
            <span className="text-xs font-sans text-[#8A8A96] font-normal ml-1">/ month</span>
          </div>
          <div className="text-[11px] text-[#737382] mt-0.5">
            Total Financed: {formatPrice(financedPrincipal, currency)} &middot; Est. Interest: {formatPrice(totalFinanceCost, currency)}
          </div>
        </div>

        {onApplyForFinancing && (
          <button
            type="button"
            onClick={() => onApplyForFinancing({
              downPayment: downPaymentAmount,
              months: loanTermMonths,
              monthlyPayment
            })}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#ECCF84] via-[#D4AF37] to-[#B89225] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-1.5 shadow-md shrink-0"
          >
            <span>Pre-Qualify for Terms</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
