import React, { useState } from 'react';
import { LeadInquiry } from '../types';
import { 
  Plane, ShieldCheck, Sparkles, Wrench, FileCheck, 
  Send, CheckCircle2, MessageSquare, ArrowRight 
} from 'lucide-react';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';

interface ServicesPageProps {
  dealerWhatsApp: string;
  onSubmitLead: (lead: Omit<LeadInquiry, 'id' | 'createdAt'>) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  dealerWhatsApp,
  onSubmitLead
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('Bespoke Customization & Coachbuilding');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    onSubmitLead({
      type: 'quote',
      customerName: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      preferredContact: 'whatsapp',
      message: `[Service Quote Request: ${serviceType}] ${notes.trim()}`,
      status: 'new',
      dealerNotes: `Service quote requested via Atelier page for ${serviceType}.`
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setNotes('');
    }, 6000);
  };

  const directWhatsAppLink = createGeneralWhatsAppUrl(
    dealerWhatsApp,
    'Hello Aurelius Atelier, I would like to inquire about your bespoke coachbuilding and VIP transport services.'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          Aurelius Nigeria Atelier &middot; Lagos &middot; Abuja
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-white font-display uppercase tracking-tight">
          Bespoke Services for Nigeria's Elite
        </h1>
        <p className="text-sm text-[#A0A0AE] leading-relaxed">
          From direct port customs clearance and certified B6 ballistic protection to covered interstate flatbed delivery across Nigeria, we manage every facet of executive vehicle ownership.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-[#121217] border border-[#242430] hover:border-[#D4AF37]/40 transition-all space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#241F12] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">
            100% Genuine Customs Duty Clearing
          </h3>
          <p className="text-xs text-[#8E8E9C] leading-relaxed">
            Eliminate all seizure risk. Every vehicle cleared through Tin Can Island, Apapa, or PTML with authentic Form C84, Single Goods Declaration (SGD), and verifiable bank assessment receipts.
          </p>
          <ul className="text-xs text-[#B5B5C2] space-y-1.5 pt-2">
            <li>&middot; NCS e-portal live barcode verification</li>
            <li>&middot; Zero surcharge or unpaid levy exposure</li>
            <li>&middot; FRSC registration &amp; VIP custom plates support</li>
          </ul>
        </div>

        <div className="p-8 rounded-2xl bg-[#121217] border border-[#242430] hover:border-[#D4AF37]/40 transition-all space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#241F12] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">
            CEN B6/B7 Ballistic Armoring
          </h3>
          <p className="text-xs text-[#8E8E9C] leading-relaxed">
            Engineered defense against AK-47 (7.62x39mm), high-powered rifles, and floor grenade detonations. Complete with heavy-duty run-flats, armored ECU, and reinforced suspension for Nigerian roads.
          </p>
          <ul className="text-xs text-[#B5B5C2] space-y-1.5 pt-2">
            <li>&middot; 39mm curved curved multi-hit ballistic glass</li>
            <li>&middot; Hutchinson solid composite run-flat wheel inserts</li>
            <li>&middot; Intercom sirens &amp; executive privacy partitions</li>
          </ul>
        </div>

        <div className="p-8 rounded-2xl bg-[#121217] border border-[#242430] hover:border-[#D4AF37]/40 transition-all space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#241F12] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <Plane className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">
            Nationwide Enclosed Delivery
          </h3>
          <p className="text-xs text-[#8E8E9C] leading-relaxed">
            Covered hydraulic flatbed transit from our Victoria Island and Maitama hubs directly to private compounds in Lagos, Abuja, Port Harcourt, Kano, Ibadan, Warri, Enugu, or any state in Nigeria.
          </p>
          <ul className="text-xs text-[#B5B5C2] space-y-1.5 pt-2">
            <li>&middot; Dust-proof enclosed hydraulic transport</li>
            <li>&middot; Satellite GPS tracking and security escort</li>
            <li>&middot; Direct foreign airlift via cargo charter to Lagos / Abuja</li>
          </ul>
        </div>
      </div>

      {/* Quote & Consultation Request Section */}
      <div className="rounded-2xl bg-gradient-to-br from-[#16161D] via-[#101014] to-[#0B0B0E] border border-[#292938] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Atelier Commission Desk
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display uppercase leading-tight">
            Commission a Project or Request a White-Glove Quote
          </h2>
          <p className="text-xs text-[#A0A0AD] leading-relaxed">
            Provide details regarding your motorcar and required scope. Our Atelier Director will contact you within two hours with technical feasibility, cost structure, and schedule.
          </p>

          <div className="p-4 bg-[#142318] border border-[#25D366]/30 rounded-xl space-y-2">
            <div className="text-xs font-semibold text-[#25D366] flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Need immediate assistance?</span>
            </div>
            <p className="text-[11px] text-[#A6D8B4]">
              For urgent aircraft charters or same-day enclosed transport, contact our 24/7 Operations Desk directly on WhatsApp.
            </p>
            <a
              href={directWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#25D366] font-bold hover:underline pt-1"
            >
              <span>Connect on WhatsApp Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-6 bg-[#16161E] border border-[#2B2B3A] rounded-xl p-6 sm:p-8">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#183321] border border-[#25D366] text-[#25D366] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white font-display">
                Service Inquiry Received
              </h4>
              <p className="text-xs text-[#A0A0AE] max-w-sm mx-auto">
                Your request has been routed to our Operations Director. A confirmation has been registered in the dealership inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#9E9EAA] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="w-full bg-[#1E1E28] border border-[#303040] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#9E9EAA] mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#1E1E28] border border-[#303040] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#9E9EAA] mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-[#1E1E28] border border-[#303040] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#9E9EAA] mb-1">Service Program</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-[#1E1E28] border border-[#303040] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="Bespoke Customization & Coachbuilding">Bespoke Customization & Coachbuilding</option>
                  <option value="Global Enclosed Air Transport">Global Enclosed Air Transport</option>
                  <option value="Ballistic Armoring & Executive Protection">Ballistic Armoring & Executive Protection</option>
                  <option value="Performance Dyno Tuning & Track Setup">Performance Dyno Tuning & Track Setup</option>
                  <option value="Multi-Layer Ceramic & Self-Healing PPF">Multi-Layer Ceramic & Self-Healing PPF</option>
                  <option value="Consignment & Global Auction Brokering">Consignment & Global Auction Brokering</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#9E9EAA] mb-1">Project Details / Vehicle Description</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Specify current car, target timeline, special material requests, or destination..."
                  className="w-full bg-[#1E1E28] border border-[#303040] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#ECCF84] via-[#D4AF37] to-[#B89225] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Quote Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
