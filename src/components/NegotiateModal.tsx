import React, { useState } from 'react';
import { Car, LeadInquiry } from '../types';
import { CurrencyCode, formatPrice } from '../utils/currency';
import { createWhatsAppNegotiationUrl } from '../utils/whatsapp';
import { X, MessageSquare, Send, CheckCircle2, ShieldCheck, DollarSign } from 'lucide-react';

interface NegotiateModalProps {
  car: Car | null;
  currency: CurrencyCode;
  dealerWhatsApp: string;
  onClose: () => void;
  onSubmitLead: (lead: Omit<LeadInquiry, 'id' | 'createdAt'>) => void;
}

export const NegotiateModal: React.FC<NegotiateModalProps> = ({
  car,
  currency,
  dealerWhatsApp,
  onClose,
  onSubmitLead
}) => {
  if (!car) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryState, setDeliveryState] = useState('Lagos (Victoria Island / Ikoyi / Lekki)');
  const [offerPrice, setOfferPrice] = useState<number>(Math.round(car.price * 0.95));
  const [hasTradeIn, setHasTradeIn] = useState(false);
  const [tradeInDetails, setTradeInDetails] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrlGenerated, setWhatsappUrlGenerated] = useState<string | null>(null);

  const applyDiscountPreset = (percentage: number) => {
    const discounted = Math.round(car.price * (1 - percentage / 100));
    setOfferPrice(discounted);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    // 1. Submit lead to Admin Inbox
    onSubmitLead({
      type: 'negotiation',
      carId: car.id,
      carTitle: `${car.year} ${car.title}`,
      stockNumber: car.stockNumber,
      customerName: name.trim(),
      email: email.trim() || 'Not provided',
      phone: phone.trim(),
      preferredContact: 'whatsapp',
      offeredPrice: offerPrice,
      listedPrice: car.price,
      deliveryState: deliveryState,
      message: message.trim() || `Proposed offer of ${formatPrice(offerPrice, currency)} for stock #${car.stockNumber} (Delivery to ${deliveryState})`,
      tradeInDetails: hasTradeIn && tradeInDetails ? {
        make: tradeInDetails,
        model: '',
        year: 2022,
        mileage: 0,
        condition: 'Self-reported trade-in / swap vehicle'
      } : undefined,
      status: 'negotiating',
      dealerNotes: `Inquiry received via WhatsApp negotiation desk for delivery to ${deliveryState}.`
    });

    // 2. Generate WhatsApp URL
    const url = createWhatsAppNegotiationUrl(dealerWhatsApp, car, {
      name: name.trim(),
      phone: phone.trim(),
      offeredPrice: offerPrice,
      deliveryState: deliveryState,
      tradeIn: hasTradeIn ? tradeInDetails : undefined,
      message: message.trim()
    });

    setWhatsappUrlGenerated(url);
    setSubmitted(true);
  };

  const handleDirectDealerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    onSubmitLead({
      type: 'negotiation',
      carId: car.id,
      carTitle: `${car.year} ${car.title}`,
      stockNumber: car.stockNumber,
      customerName: name.trim(),
      email: email.trim() || 'Not provided',
      phone: phone.trim(),
      preferredContact: 'whatsapp',
      offeredPrice: offerPrice,
      listedPrice: car.price,
      deliveryState: deliveryState,
      message: message.trim() || `Proposed offer of ${formatPrice(offerPrice, currency)} submitted directly to dealer desk (Delivery to ${deliveryState}).`,
      tradeInDetails: hasTradeIn && tradeInDetails ? {
        make: tradeInDetails,
        model: '',
        year: 2022,
        mileage: 0,
        condition: 'Self-reported trade-in / swap vehicle'
      } : undefined,
      status: 'new',
      dealerNotes: `Offer submitted directly to dealer desk via website portal for delivery in ${deliveryState}.`
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-[#111116] border border-[#2D2D38] rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="px-6 py-4 bg-[#16161D] border-b border-[#242430] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#162D1D] border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                VIP Price Negotiation &amp; WhatsApp Desk
              </h3>
              <p className="text-[11px] text-[#8E8E9B]">
                Direct private negotiation with the dealer principal
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#888896] hover:text-white hover:bg-[#22222D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#183321] border border-[#25D366] text-[#25D366] flex items-center justify-center mx-auto shadow-lg shadow-[#25D366]/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-bold text-white font-display">
                Offer Transmitted Successfully
              </h4>
              <p className="text-sm text-[#A0A0AD] max-w-md mx-auto">
                Your offer of <strong className="text-[#D4AF37]">{formatPrice(offerPrice, currency)}</strong> on the {car.year} {car.title} has been recorded in our executive dealer registry.
              </p>
            </div>

            {whatsappUrlGenerated ? (
              <div className="p-4 bg-[#142318] border border-[#25D366]/30 rounded-xl space-y-3">
                <p className="text-xs text-[#9CD6AE]">
                  WhatsApp was launched. If your browser blocked the popup, click below to open your chat directly:
                </p>
                <a
                  href={whatsappUrlGenerated}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-black font-semibold text-xs transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp Conversation Now</span>
                </a>
              </div>
            ) : (
              <div className="p-4 bg-[#1A1A22] border border-[#2C2C3A] rounded-xl text-xs text-[#B5B5C2]">
                Our acquisitions director will review your terms and contact you via your preferred channel within 2 business hours.
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-[#22222C] text-[#C5C5CE] hover:text-white hover:bg-[#2C2C38] text-xs font-medium transition-colors"
            >
              Return to Showroom
            </button>
          </div>
        ) : (
          <form onSubmit={handleSendWhatsApp} className="p-6 space-y-5">
            {/* Vehicle Summary Card */}
            <div className="p-3 bg-[#171720] rounded-xl border border-[#272733] flex items-center gap-4">
              <img
                src={car.images[0] || '/src/assets/images/hero_showroom_luxury_1794144698125.jpg'}
                alt={car.title}
                referrerPolicy="no-referrer"
                className="w-20 h-14 object-cover rounded-lg bg-black shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[11px] text-[#868694]">
                  <span>Stock #{car.stockNumber}</span>
                  <span className="text-[#D4AF37] font-medium">{car.condition}</span>
                </div>
                <h4 className="text-xs font-bold text-white truncate">
                  {car.year} {car.title}
                </h4>
                <div className="text-xs text-[#A0A0AC] flex items-center gap-2 mt-0.5">
                  <span>Listed: <strong className="text-white">{formatPrice(car.price, currency)}</strong></span>
                </div>
              </div>
            </div>

            {/* Offer Adjustment Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="text-[#C5C5CE] font-medium flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Your Proposed Offer ({currency === 'NGN' ? 'Naira ₦' : currency})
                </label>
                <div className="flex items-center gap-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => applyDiscountPreset(5)}
                    className="px-2 py-0.5 rounded bg-[#202028] text-[#D4AF37] hover:bg-[#2C2C3A] border border-[#333342] transition-colors"
                  >
                    -5% ({formatPrice(Math.round(car.price * 0.95), currency)})
                  </button>
                  <button
                    type="button"
                    onClick={() => applyDiscountPreset(10)}
                    className="px-2 py-0.5 rounded bg-[#202028] text-[#D4AF37] hover:bg-[#2C2C3A] border border-[#333342] transition-colors"
                  >
                    -10% ({formatPrice(Math.round(car.price * 0.90), currency)})
                  </button>
                </div>
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm text-[#7D7D8B] font-semibold">
                  {currency === 'NGN' ? '₦' : '$'}
                </span>
                <input
                  type="number"
                  min="1000000"
                  max="10000000000"
                  step="500000"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(Number(e.target.value))}
                  className="w-full bg-[#181820] border border-[#2A2A38] focus:border-[#D4AF37] rounded-lg pl-8 pr-4 py-2 text-sm text-white font-mono font-semibold focus:outline-none"
                  required
                />
              </div>
              <p className="text-[11px] text-[#787886]">
                Equivalent to {formatPrice(offerPrice, currency)}. Dealer will respond with acceptance or counter-terms via WhatsApp.
              </p>
            </div>

            {/* Delivery Destination in Nigeria */}
            <div>
              <label className="block text-xs text-[#A8A8B6] mb-1">
                Target Delivery Destination (State / City)
              </label>
              <select
                value={deliveryState}
                onChange={(e) => setDeliveryState(e.target.value)}
                className="w-full bg-[#181820] border border-[#2A2A38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="Lagos (Victoria Island / Ikoyi / Lekki)">Lagos (Victoria Island / Ikoyi / Lekki)</option>
                <option value="Lagos (Ikeja / Mainland / GRA)">Lagos (Ikeja / Mainland / GRA)</option>
                <option value="Abuja FCT (Maitama / Asokoro / Guzape)">Abuja FCT (Maitama / Asokoro / Guzape)</option>
                <option value="Rivers State (Port Harcourt GRA)">Rivers State (Port Harcourt GRA)</option>
                <option value="Kano State (Nassarawa GRA / Kano)">Kano State (Nassarawa GRA / Kano)</option>
                <option value="Oyo State (Ibadan / Bodija)">Oyo State (Ibadan / Bodija)</option>
                <option value="Delta State (Warri / Asaba)">Delta State (Warri / Asaba)</option>
                <option value="Enugu State (Independence Layout)">Enugu State (Independence Layout)</option>
                <option value="Edo State (Benin City / GRA)">Edo State (Benin City / GRA)</option>
                <option value="Other Nigerian State">Other Nigerian State (Covered Flatbed Escort)</option>
              </select>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#A8A8B6] mb-1">
                  Full Name <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lord Sterling"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#181820] border border-[#2A2A38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-[#A8A8B6] mb-1">
                  WhatsApp Phone <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#181820] border border-[#2A2A38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#A8A8B6] mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="client@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#181820] border border-[#2A2A38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            {/* Trade-in Toggle */}
            <div className="p-3 bg-[#16161D] rounded-lg border border-[#252530] space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#D8D8E0]">
                <input
                  type="checkbox"
                  checked={hasTradeIn}
                  onChange={(e) => setHasTradeIn(e.target.checked)}
                  className="rounded border-[#353545] text-[#D4AF37] focus:ring-0 bg-[#202028]"
                />
                <span>I have a luxury trade-in vehicle to offset this purchase</span>
              </label>

              {hasTradeIn && (
                <input
                  type="text"
                  placeholder="Year, Make, Model, Mileage (e.g. 2023 Porsche 911 GT3, 4,200 mi)"
                  value={tradeInDetails}
                  onChange={(e) => setTradeInDetails(e.target.value)}
                  className="w-full bg-[#1F1F2A] border border-[#303040] focus:border-[#D4AF37] rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                />
              )}
            </div>

            {/* Buyer Note */}
            <div>
              <label className="block text-xs text-[#A8A8B6] mb-1">
                Specific Terms / Delivery Requirements
              </label>
              <textarea
                rows={2}
                placeholder="e.g., Enclosed air transport to London Stansted; wire payment ready upon inspection."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#181820] border border-[#2A2A38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none resize-none"
              />
            </div>

            {/* Dual CTA Buttons */}
            <div className="pt-2 space-y-2">
              {/* WhatsApp Negotiation Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#25D366] hover:bg-[#20BA5A] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 active:scale-98"
              >
                <MessageSquare className="w-4 h-4 fill-black" />
                <span>Transmit Offer on WhatsApp to Dealer</span>
              </button>

              {/* Direct Web Form Submit Button */}
              <button
                type="button"
                onClick={handleDirectDealerSubmit}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-[#C5C5CE] hover:text-white bg-[#1A1A22] hover:bg-[#242430] border border-[#2E2E3C] transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Submit to Dealer Desk (Without Opening WhatsApp)</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#6E6E7C]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Strict client confidentiality guaranteed · No broker spam</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
