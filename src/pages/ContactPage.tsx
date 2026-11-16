import React, { useState } from 'react';
import { LeadInquiry } from '../types';
import { 
  MapPin, Phone, Mail, Clock, MessageSquare, 
  Send, CheckCircle2, ShieldCheck 
} from 'lucide-react';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';

interface ContactPageProps {
  dealerWhatsApp: string;
  onSubmitLead: (lead: Omit<LeadInquiry, 'id' | 'createdAt'>) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  dealerWhatsApp,
  onSubmitLead
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Inquire About Vehicle Purchase');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'call' | 'email'>('whatsapp');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    onSubmitLead({
      type: 'contact',
      customerName: name.trim(),
      email: email.trim() || 'No email provided',
      phone: phone.trim(),
      preferredContact: preferredContact,
      message: `[Subject: ${subject}] ${message.trim()}`,
      status: 'new',
      dealerNotes: `Direct message submitted via website Contact page.`
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 6000);
  };

  const directWhatsAppLink = createGeneralWhatsAppUrl(
    dealerWhatsApp,
    'Hello Aurelius Motors, I would like to schedule an executive consultation.'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          Private Client Communications
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-white font-display uppercase tracking-tight">
          Connect With Our Concierge
        </h1>
        <p className="text-xs sm:text-sm text-[#A0A0AD] leading-relaxed">
          Whether arranging a confidential vehicle viewing, discussing international air transport, or submitting an off-market acquisition brief.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info & Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#121217] border border-[#22222C] space-y-4">
            <h3 className="text-base font-bold text-white font-display uppercase">
              Victoria Island Flagship Showroom
            </h3>

            <div className="space-y-3 text-xs text-[#B5B5C2]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Plot 12A Akin Adesola Street, Victoria Island, Lagos State, Nigeria</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Abuja Annex: Gana Street, Maitama Diplomatic District, Abuja FCT</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Showroom Hours:</span>
                  <span>Monday – Saturday: 8:30 AM – 7:30 PM (WAT)</span>
                  <span className="block text-[#858592]">Sunday: Reserved exclusively for private collector showings</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>+234 (0) 803 890 GOLD / +234 (0) 1 890 2873</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>concierge@aureliusmotors.ng / philosisglobalservices@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp Callout */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#122818] to-[#0E1E12] border border-[#25D366]/40 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#25D366]">
              <MessageSquare className="w-5 h-5" />
              <span>Instant WhatsApp Concierge Desk (Nigeria)</span>
            </div>
            <p className="text-xs text-[#A6D6B4] leading-relaxed">
              Connect directly with our Dealer Principal on WhatsApp for prompt responses regarding Nigerian inventory, C-Number customs verification, and private viewing slots.
            </p>
            <a
              href={directWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>Chat with Dealer on WhatsApp</span>
            </a>
          </div>

          {/* Interactive Map Visual */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#262633] bg-[#0E0E12]">
            <div className="absolute inset-0 bg-[#16161E] flex flex-col items-center justify-center text-center p-6 space-y-2">
              <MapPin className="w-8 h-8 text-[#D4AF37]" />
              <span className="text-xs font-bold text-white font-display">Aurelius Motors Victoria Island</span>
              <span className="text-[11px] text-[#868694]">Plot 12A Akin Adesola St &middot; Secured VIP Sub-Level Showroom</span>
              <a
                href="https://maps.google.com/?q=Akin+Adesola+Street+Victoria+Island+Lagos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#D4AF37] hover:underline pt-1"
              >
                Open in Google Maps &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Form Column (7 cols) */}
        <div className="lg:col-span-7 bg-[#121217] border border-[#242430] rounded-2xl p-6 sm:p-10">
          <div className="mb-6 space-y-1">
            <h3 className="text-lg font-bold text-white font-display uppercase">
              Send Direct Message
            </h3>
            <p className="text-xs text-[#8A8A96]">
              All inquiries are transmitted encrypted to our dealer management terminal.
            </p>
          </div>

          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#162D1D] border border-[#25D366] text-[#25D366] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white font-display">
                Message Logged With Dealer Desk
              </h4>
              <p className="text-xs text-[#A0A0AD] max-w-sm mx-auto">
                Thank you, {name}. Your inquiry has been registered in the dealership inbox. Our team will contact you shortly via {preferredContact}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#9E9EAA] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Victoria Chen"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#181822] border border-[#2A2A38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#9E9EAA] mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#181822] border border-[#2A2A38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#9E9EAA] mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="client@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#181822] border border-[#2A2A38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#9E9EAA] mb-1">Inquiry Purpose</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#181822] border border-[#2A2A38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Inquire About Vehicle Purchase">Inquire About Vehicle Purchase</option>
                    <option value="Schedule VIP Private Showroom Visit">Schedule VIP Private Showroom Visit</option>
                    <option value="Consignment & Outright Vehicle Sale">Consignment & Outright Vehicle Sale</option>
                    <option value="Global Air Freight & Enclosed Transport">Global Air Freight & Enclosed Transport</option>
                    <option value="Bespoke Coachbuilding Commission">Bespoke Coachbuilding Commission</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#9E9EAA] mb-1">Preferred Response Channel</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['whatsapp', 'call', 'email'] as const).map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => setPreferredContact(ch)}
                      className={`py-1.5 rounded-lg text-xs font-medium border capitalize transition-colors ${
                        preferredContact === ch
                          ? 'border-[#D4AF37] bg-[#2A2312] text-[#F3E5AB]'
                          : 'border-[#282835] bg-[#181822] text-[#8E8E9C] hover:text-white'
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#9E9EAA] mb-1">Your Message or Vehicle Brief *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide details regarding the vehicle of interest, target delivery timeline, or specific viewing requests..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#181822] border border-[#2A2A38] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#ECCF84] via-[#D4AF37] to-[#B89225] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit to Dealer Inbox</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6E6E7C] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Protected by non-disclosure and private client confidentiality</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
