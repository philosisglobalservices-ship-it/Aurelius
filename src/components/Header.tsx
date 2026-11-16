import React, { useState } from 'react';
import { PageRoute } from '../types';
import { CurrencyCode, CURRENCY_RATES } from '../utils/currency';
import { MessageSquare, ShieldCheck, Menu, X, PhoneCall, ChevronDown } from 'lucide-react';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  whatsappNumber: string;
  carsCount: number;
  newLeadsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  currency,
  onCurrencyChange,
  whatsappNumber,
  carsCount,
  newLeadsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const navItems: { label: string; page: PageRoute; badge?: number }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Showroom', page: 'inventory', badge: carsCount },
    { label: 'Bespoke Services', page: 'services' },
    { label: 'Trade-In Valuation', page: 'trade-in' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Editorial', page: 'blog' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const directWhatsAppLink = createGeneralWhatsAppUrl(
    whatsappNumber,
    'Hello Aurelius Motors Concierge, I would like to inquire about viewing your current exotic inventory.'
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0B0C]/95 backdrop-blur-md border-b border-[#24242A]">
      {/* Top Utility Announcement Bar */}
      <div className="w-full bg-[#121215] border-b border-[#1E1E24] px-4 sm:px-8 py-1.5 text-xs text-[#A0A0A8]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-[11px]">Victoria Island &middot; Maitama Abuja</span>
            <span className="text-[#3A3A42] hidden sm:inline">|</span>
            <span className="hidden sm:inline truncate">100% Genuine Customs Duty Cleared (Verified SGD) &middot; Nationwide Enclosed Delivery</span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* Currency Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 py-0.5 px-2 rounded bg-[#1A1A20] hover:bg-[#25252D] text-[#E5E5E7] text-[11px] font-medium transition-colors border border-[#2E2E38]"
              >
                <span>{currency === 'NGN' ? '₦ NGN' : currency}</span>
                <ChevronDown className="w-3 h-3 text-[#A0A0A8]" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-[#15151A] border border-[#2E2E38] rounded-md shadow-xl z-50 py-1">
                  {(Object.keys(CURRENCY_RATES) as CurrencyCode[]).map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        onCurrencyChange(code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                        currency === code ? 'text-[#D4AF37] bg-[#22222B] font-semibold' : 'text-[#C5C5CE] hover:bg-[#1D1D24]'
                      }`}
                    >
                      <span>{code}</span>
                      <span className="text-[#787885]">{CURRENCY_RATES[code].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct WhatsApp Concierge Link */}
            <a
              href={directWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#25D366] hover:text-[#38E578] font-medium transition-colors"
              title="Chat with dealer on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden md:inline">WhatsApp Concierge</span>
            </a>

            {/* Phone */}
            <a
              href="tel:+2348038904653"
              className="hidden lg:flex items-center gap-1 text-[#C5C5CE] hover:text-[#D4AF37] transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#D4AF37]" />
              <span>+234 803 890 GOLD</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-6">
        {/* Brand Lockup */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none shrink-0"
        >
          <div className="w-9 h-9 rounded border border-[#D4AF37]/50 bg-gradient-to-br from-[#1C1A14] to-[#0E0E10] flex items-center justify-center text-[#D4AF37] font-display font-bold text-lg shadow-inner group-hover:border-[#D4AF37] transition-all">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg sm:text-xl tracking-[0.2em] text-[#F3E5AB] group-hover:text-white transition-colors">
              AURELIUS
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#A0A0A8] -mt-1 font-sans">
              Nigeria &middot; Lagos &middot; Abuja
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-6 text-[13px] font-medium text-[#C5C5CE]">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                type="button"
                onClick={() => handleNavClick(item.page)}
                className={`relative py-1 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#F3E5AB] font-semibold'
                    : 'hover:text-[#D4AF37]'
                }`}
              >
                {item.label}
                {item.badge !== undefined && (
                  <span className="ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full bg-[#1F1E16] text-[#D4AF37] border border-[#D4AF37]/30">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Suite */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Admin Page Trigger */}
          <button
            type="button"
            onClick={() => handleNavClick('admin')}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border transition-all ${
              currentPage === 'admin'
                ? 'bg-[#2B2310] border-[#D4AF37] text-[#F3E5AB]'
                : 'bg-[#151519] border-[#2A2A33] text-[#A6A6B2] hover:text-[#E5E5E7] hover:border-[#3D3D48]'
            }`}
            title="Dealer Protected Management Portal"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Admin</span>
            {newLeadsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#D4AF37] text-black text-[10px] font-bold flex items-center justify-center">
                {newLeadsCount}
              </span>
            )}
          </button>

          {/* Schedule VIP Visit CTA */}
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#ECCF84] via-[#D4AF37] to-[#B89225] hover:brightness-110 active:scale-95 transition-all shadow-md gold-glow-subtle hidden sm:inline-block"
          >
            Schedule VIP Visit
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded text-[#C5C5CE] hover:text-white bg-[#151519] border border-[#2E2E38]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0F0F12] border-b border-[#25252D] px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                type="button"
                onClick={() => handleNavClick(item.page)}
                className={`text-left px-3 py-2 rounded text-xs font-medium transition-colors ${
                  currentPage === item.page
                    ? 'bg-[#222017] text-[#F3E5AB] border border-[#D4AF37]/40'
                    : 'text-[#A0A0A8] hover:bg-[#181820] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="ml-1 text-[10px] text-[#D4AF37]">({item.badge})</span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#1F1F27] flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="w-full py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#ECCF84] via-[#D4AF37] to-[#B89225] text-center"
            >
              Schedule VIP Visit
            </button>
            <a
              href={directWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 rounded text-xs font-medium text-center text-[#25D366] bg-[#142318] border border-[#25D366]/30 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
