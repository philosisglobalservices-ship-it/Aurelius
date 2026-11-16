import React, { useState } from 'react';
import { PageRoute } from '../types';
import { MessageSquare, Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  whatsappNumber: string;
  onSubscribeNewsletter: (email: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  whatsappNumber,
  onSubscribeNewsletter
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    onSubscribeNewsletter(email.trim());
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const directWhatsAppLink = createGeneralWhatsAppUrl(
    whatsappNumber,
    'Hello Aurelius Motors, I am inquiring about your bespoke motorcar inventory.'
  );

  return (
    <footer className="w-full bg-[#070709] border-t border-[#1C1C22] text-[#A6A6B0] text-sm pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1A1A20]">
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded border border-[#D4AF37] bg-[#161510] flex items-center justify-center text-[#D4AF37] font-display font-bold text-base">
                A
              </div>
              <span className="font-display font-bold text-xl tracking-[0.2em] text-[#F3E5AB]">
                AURELIUS MOTORS
              </span>
            </div>

            <p className="text-xs text-[#8A8A94] leading-relaxed max-w-sm">
              Nigeria's foremost purveyor of rare exotic motorcars, bulletproof B6/B7 executive SUVs, and luxury grand tourers. Serving corporate leaders, royal families, and private collectors in Lagos, Abuja, Port Harcourt, and across the federation.
            </p>

            <div className="pt-2 space-y-2 text-xs text-[#B3B3BE]">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Plot 12A Akin Adesola Street, Victoria Island, Lagos &middot; Gana St, Maitama, Abuja</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Mon – Sat: 8:30 AM – 7:30 PM (WAT) &middot; Sunday by VIP Appointment</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>+234 (0) 803 890 GOLD / +234 (0) 1 890 2873</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>concierge@aureliusmotors.ng / philosisglobalservices@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Directory Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F3E5AB] mb-4">
              Showroom
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('inventory')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  All Exotic Inventory
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('inventory')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Hypercars & Track Editions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('inventory')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Super SUVs & Limousines
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('inventory')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Grand Tourers & Convertibles
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('trade-in')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Consignment & Sell Your Car
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate & Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F3E5AB] mb-4">
              The Atelier
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Bespoke Customization
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Armored & Security Transport
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Private Showroom Gallery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('blog')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Automotive Editorial
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Heritage & Standards
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('admin')}
                  className="text-[#D4AF37]/80 hover:text-[#D4AF37] transition-colors flex items-center gap-1"
                >
                  <span>Dealer Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Private Allocation Digest */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F3E5AB] mb-2">
              Private Allocations
            </h4>
            <p className="text-[11px] text-[#7A7A85] leading-relaxed mb-3">
              Receive off-market allocations, confidential build slots, and auction intelligence before public release.
            </p>

            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter private email"
                  required
                  className="w-full bg-[#121217] border border-[#262630] focus:border-[#D4AF37] rounded px-3 py-2 text-xs text-white placeholder-[#5A5A66] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 rounded bg-[#D4AF37] text-black hover:bg-[#ECCF84] transition-colors flex items-center justify-center"
                  title="Subscribe to Digest"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-[11px] text-[#25D366]">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Subscribed! Saved to VIP registry.</span>
                </div>
              )}
            </form>

            <div className="pt-4">
              <a
                href={directWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#16291C] border border-[#25D366]/40 text-[#25D366] text-xs font-medium hover:bg-[#1C3324] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Instant WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6A6A75]">
          <div>
            &copy; {new Date().getFullYear()} Aurelius Motorcars Nigeria Limited. RC: 1849201. All rights reserved.
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <span>100% NCS Duty Verified</span>
            <span>·</span>
            <span>Single Goods Declaration (SGD) Authenticated</span>
            <span>·</span>
            <span>Nationwide Enclosed Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
