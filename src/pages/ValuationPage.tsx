import React, { useState } from 'react';
import { LeadInquiry } from '../types';
import { CurrencyCode, formatPrice } from '../utils/currency';
import { 
  CarFront, DollarSign, CheckCircle2, MessageSquare, 
  ArrowRight, ShieldCheck, Sparkles 
} from 'lucide-react';
import { sanitizeWhatsAppNumber } from '../utils/whatsapp';

interface ValuationPageProps {
  dealerWhatsApp: string;
  currency: CurrencyCode;
  onSubmitLead: (lead: Omit<LeadInquiry, 'id' | 'createdAt'>) => void;
}

export const ValuationPage: React.FC<ValuationPageProps> = ({
  dealerWhatsApp,
  currency,
  onSubmitLead
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number>(2023);
  const [mileage, setMileage] = useState<number>(18000);
  const [condition, setCondition] = useState('Excellent');
  const [registrationType, setRegistrationType] = useState<'Tokunbo (Foreign Used)' | 'Nigerian Used'>('Tokunbo (Foreign Used)');
  const [desiredPrice, setDesiredPrice] = useState<number>(140000000); // ₦140 Million
  const [hasCleanTitle, setHasCleanTitle] = useState(true);
  const [modifications, setModifications] = useState('');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Lagos (Victoria Island)');
  const [submitted, setSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !make.trim()) return;

    const leadData: Omit<LeadInquiry, 'id' | 'createdAt'> = {
      type: 'trade_in',
      customerName: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      preferredContact: 'whatsapp',
      offeredPrice: desiredPrice,
      deliveryState: city,
      tradeInDetails: {
        make: make.trim(),
        model: model.trim(),
        year: year,
        mileage: mileage,
        condition: `${condition} (${registrationType}, ${hasCleanTitle ? 'Customs Duty SGD Verified' : 'Pending Verification'})`,
        estimatedValue: desiredPrice,
        registrationType: registrationType,
        stateOfRegistration: city
      },
      message: `Trade-in / Swap appraisal request for ${year} ${make} ${model} (${registrationType}, ${mileage.toLocaleString()} km). Desired payout: ${formatPrice(desiredPrice, 'NGN')}. Location: ${city}. Duty status: ${hasCleanTitle ? 'Verified Port SGD Attached' : 'Inquire'}.`,
      status: 'new',
      dealerNotes: 'Appraisal lead generated via Nigerian Trade-In / Swap Valuation tool.'
    };

    onSubmitLead(leadData);

    // Format WhatsApp link
    const cleanPhone = sanitizeWhatsAppNumber(dealerWhatsApp);
    const msg = [
      `*🚗 VEHICLE VALUATION / SWAP APPRAISAL (NIGERIA)*`,
      `*Vehicle:* ${year} ${make} ${model}`,
      `*Usage Type:* ${registrationType}`,
      `*Mileage:* ${mileage.toLocaleString()} km`,
      `*Condition:* ${condition}`,
      `*Desired Payout / Swap Value:* ${formatPrice(desiredPrice, 'NGN')}`,
      `*Customs Papers:* ${hasCleanTitle ? 'Verified Single Goods Declaration (SGD) in Hand' : 'Pending verification'}`,
      `*Modifications / Notes:* ${modifications || 'Original Factory Condition'}`,
      `--------------------------`,
      `*Owner Name:* ${name}`,
      `*Phone:* ${phone}`,
      `*Location:* ${city}`,
      `--------------------------`,
      `Sent via Aurelius Motors Nigeria Valuation Desk`
    ].join('\n');

    setWhatsappLink(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(msg)}`);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          Immediate Liquidity &amp; Consignment
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-white font-display uppercase tracking-tight">
          Sell or Trade Your Exotic Motorcar
        </h1>
        <p className="text-sm text-[#A0A0AD] max-w-xl mx-auto leading-relaxed">
          Receive a guaranteed market cash offer or place your vehicle in our global private buyer network. Discretion, same-day wire transfer, and nationwide enclosed collection.
        </p>
      </div>

      {/* Multistep Form Card */}
      <div className="bg-[#121217] border border-[#252533] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Step Indicator */}
        {!submitted && (
          <div className="flex items-center justify-between border-b border-[#20202C] pb-6 mb-8 text-xs font-medium">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#D4AF37]' : 'text-[#6A6A76]'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 1 ? 'bg-[#D4AF37] text-black' : 'bg-[#22222D] text-[#888896]'
              }`}>
                1
              </div>
              <span>Vehicle Specs</span>
            </div>

            <div className={`h-[1px] flex-1 mx-4 ${step >= 2 ? 'bg-[#D4AF37]' : 'bg-[#22222D]'}`} />

            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#D4AF37]' : 'text-[#6A6A76]'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 2 ? 'bg-[#D4AF37] text-black' : 'bg-[#22222D] text-[#888896]'
              }`}>
                2
              </div>
              <span>Condition &amp; Payout</span>
            </div>

            <div className={`h-[1px] flex-1 mx-4 ${step >= 3 ? 'bg-[#D4AF37]' : 'bg-[#22222D]'}`} />

            <div className={`flex items-center gap-2 ${step === 3 ? 'text-[#D4AF37]' : 'text-[#6A6A76]'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step === 3 ? 'bg-[#D4AF37] text-black' : 'bg-[#22222D] text-[#888896]'
              }`}>
                3
              </div>
              <span>Contact &amp; Submission</span>
            </div>
          </div>
        )}

        {submitted ? (
          <div className="py-8 text-center space-y-6 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-[#162D1D] border border-[#25D366] text-[#25D366] flex items-center justify-center mx-auto shadow-lg shadow-[#25D366]/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white font-display">
                Appraisal File Successfully Transmitted
              </h3>
              <p className="text-sm text-[#A0A0AD] max-w-md mx-auto">
                Your <strong className="text-[#F3E5AB]">{year} {make} {model}</strong> file has been assigned to our Senior Acquisitions Specialist.
              </p>
            </div>

            {whatsappLink && (
              <div className="p-5 bg-[#142618] border border-[#25D366]/40 rounded-xl space-y-3 max-w-lg mx-auto">
                <p className="text-xs text-[#A6DDB6]">
                  Accelerate your appraisal: Connect directly with the dealer principal on WhatsApp with your vehicle specs pre-filled.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>Transmit Valuation on WhatsApp</span>
                </a>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setStep(1);
              }}
              className="text-xs text-[#8A8A96] hover:text-white transition-colors"
            >
              Submit another vehicle appraisal
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider text-[#D4AF37]">
                  Step 1: Vehicle Identification
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#9E9EAA] mb-1">Make / Marque *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ferrari, Porsche, Lamborghini"
                      value={make}
                      onChange={(e) => setMake(e.target.value)}
                      className="w-full bg-[#181822] border border-[#2B2B38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#9E9EAA] mb-1">Model &amp; Trim *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 911 GT3 Touring, F8 Tributo"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full bg-[#181822] border border-[#2B2B38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#9E9EAA] mb-1">Model Year *</label>
                    <input
                      type="number"
                      min="1960"
                      max="2027"
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="w-full bg-[#181822] border border-[#2B2B38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#9E9EAA] mb-1">Current Mileage (Miles) *</label>
                    <input
                      type="number"
                      min="0"
                      value={mileage}
                      onChange={(e) => setMileage(Number(e.target.value))}
                      className="w-full bg-[#181822] border border-[#2B2B38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    disabled={!make.trim() || !model.trim()}
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 rounded-lg bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#ECCF84] disabled:opacity-40 transition-colors flex items-center gap-1.5"
                  >
                    <span>Next: Condition &amp; Value</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider text-[#D4AF37]">
                  Step 2: Condition &amp; Desired Payout
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#9E9EAA] mb-1">Registration &amp; Usage Type</label>
                    <select
                      value={registrationType}
                      onChange={(e) => setRegistrationType(e.target.value as any)}
                      className="w-full bg-[#181822] border border-[#2B2B38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="Tokunbo (Foreign Used)">Tokunbo (Direct Foreign Used - US / Europe / Japan / Dubai)</option>
                      <option value="Nigerian Used">Nigerian Used (Registered in Nigeria)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-[#9E9EAA] mb-1">Overall Condition</label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="w-full bg-[#181822] border border-[#2B2B38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="Showroom Pristine / Concours">Showroom Pristine / Concours</option>
                      <option value="Excellent (Clean interior & engine)">Excellent (Clean interior &amp; engine)</option>
                      <option value="Good (Standard daily driving)">Good (Standard daily driving)</option>
                      <option value="Requires minor body / service work">Requires minor body / service work</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#9E9EAA] mb-1">Target Payout / Swap Value (Naira ₦)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-xs text-[#7A7A88] font-mono">₦</span>
                      <input
                        type="number"
                        step="1000000"
                        value={desiredPrice}
                        onChange={(e) => setDesiredPrice(Number(e.target.value))}
                        className="w-full bg-[#181822] border border-[#2B2B38] focus:border-[#D4AF37] rounded-lg pl-7 pr-3 py-2 text-xs text-white focus:outline-none font-mono"
                      />
                    </div>
                    <span className="text-[10px] text-[#7A7A88] mt-1 block">
                      Equivalent to {formatPrice(desiredPrice, currency)}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs text-[#9E9EAA] mb-1">Vehicle Location</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#181822] border border-[#2B2B38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="Lagos (Victoria Island / Ikoyi / Lekki)">Lagos (Victoria Island / Ikoyi / Lekki)</option>
                      <option value="Lagos (Ikeja / Mainland)">Lagos (Ikeja / Mainland)</option>
                      <option value="Abuja FCT (Maitama / Asokoro)">Abuja FCT (Maitama / Asokoro)</option>
                      <option value="Rivers State (Port Harcourt)">Rivers State (Port Harcourt)</option>
                      <option value="Kano State (Kano)">Kano State (Kano)</option>
                      <option value="Oyo State (Ibadan)">Oyo State (Ibadan)</option>
                      <option value="Delta / Edo State">Delta / Edo State</option>
                      <option value="Other State in Nigeria">Other State in Nigeria</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-[#181822] rounded-lg border border-[#2A2A38] space-y-2">
                  <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasCleanTitle}
                      onChange={(e) => setHasCleanTitle(e.target.checked)}
                      className="rounded border-[#383848] text-[#D4AF37] focus:ring-0 bg-[#22222F]"
                    />
                    <span>100% Genuine Nigerian Customs Duty / Single Goods Declaration (SGD) available</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs text-[#9E9EAA] mb-1">Modifications, Factory Options &amp; PPF</label>
                  <textarea
                    rows={2}
                    value={modifications}
                    onChange={(e) => setModifications(e.target.value)}
                    placeholder="e.g. Full front XPEL PPF, Akrapovic titanium exhaust, carbon ceramic brakes, dealer serviced."
                    className="w-full bg-[#181822] border border-[#2B2B38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-lg bg-[#20202B] text-[#9A9AA6] hover:text-white text-xs transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 rounded-lg bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#ECCF84] transition-colors flex items-center gap-1.5"
                  >
                    <span>Next: Owner Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in fade-in">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider text-[#D4AF37]">
                  Step 3: Contact &amp; Confidential Submission
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#9E9EAA] mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Carlos Mendoza"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#181822] border border-[#2B2B38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#9E9EAA] mb-1">WhatsApp / Mobile *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#181822] border border-[#2B2B38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#9E9EAA] mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#181822] border border-[#2B2B38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#9E9EAA] mb-1">Vehicle Location (City, State / Country)</label>
                    <input
                      type="text"
                      placeholder="e.g. Beverly Hills, CA or London, UK"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#181822] border border-[#2B2B38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 rounded-lg bg-[#20202B] text-[#9A9AA6] hover:text-white text-xs transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#ECCF84] via-[#D4AF37] to-[#B89225] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg flex items-center gap-2"
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>Submit for Guaranteed Valuation</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
