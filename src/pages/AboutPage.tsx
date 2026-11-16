import React from 'react';
import { ShieldCheck, Award, Globe, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { PageRoute } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-20">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          Heritage &middot; Discretion &middot; Excellence
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-white font-display uppercase tracking-tight">
          The Aurelius Provenance
        </h1>
        <p className="text-sm text-[#A0A0AD] leading-relaxed">
          Founded in 1998, Aurelius Motors has evolved from a boutique Mayfair acquisition desk into an internationally revered purveyor of the world’s rarest and most significant motorcars.
        </p>
      </div>

      {/* Story & Philosophy Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Our Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display uppercase leading-tight">
            Automotive Sovereignty Without Compromise
          </h2>
          <p className="text-xs sm:text-sm text-[#A2A2B0] leading-relaxed">
            In an era where automotive manufacturing has shifted toward high-volume mass production and digital homogenization, Aurelius Motors remains steadfastly devoted to the preservation of pure automotive art.
          </p>
          <p className="text-xs sm:text-sm text-[#A2A2B0] leading-relaxed">
            Every motorcar inducted into our inventory has been hand-selected by our curatorial committee. We verify historical ownership chains, analyze ultrasonic paint depth across body panels, and run exhaustive ECU diagnostic benchmarks to ensure total integrity.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#22222E]">
            <div>
              <span className="text-2xl font-bold font-display text-[#F3E5AB]">28+</span>
              <span className="block text-[11px] text-[#7A7A88] uppercase mt-0.5">Years of Legacy</span>
            </div>
            <div>
              <span className="text-2xl font-bold font-display text-[#F3E5AB]">$480M+</span>
              <span className="block text-[11px] text-[#7A7A88] uppercase mt-0.5">Global Acquisitions</span>
            </div>
            <div>
              <span className="text-2xl font-bold font-display text-[#F3E5AB]">34</span>
              <span className="block text-[11px] text-[#7A7A88] uppercase mt-0.5">Countries Delivered</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#2B2B38] bg-[#0A0A0C]">
          <img
            src="/src/assets/images/hero_showroom_luxury_1794144698125.jpg"
            alt="Aurelius Flagship Showroom"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-xs font-semibold text-[#F3E5AB]">Beverly Hills Main Showroom</span>
            <p className="text-[11px] text-[#A0A0AC]">450 North Rodeo Drive, California</p>
          </div>
        </div>
      </div>

      {/* The 140-Point Inspection Standard */}
      <div className="bg-[#121217] border border-[#242430] rounded-2xl p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Quality Assurance
          </span>
          <h3 className="text-2xl font-bold text-white font-display uppercase">
            The 140-Point Aurelius Standard
          </h3>
          <p className="text-xs text-[#8A8A96] leading-relaxed">
            Prior to being listed on our directory or offered to private collectors, every vehicle is subjected to our proprietary evaluation protocol:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-[#16161F] border border-[#232330] rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-[#D4AF37]">
              1. Optical &amp; Paint Analysis
            </h4>
            <p className="text-[11px] text-[#8C8C9A] leading-relaxed">
              Multi-point ultrasonic paint depth gauge readings across all metal and carbon panels to verify factory original finishes and identify unrecorded repairs.
            </p>
          </div>

          <div className="p-4 bg-[#16161F] border border-[#232330] rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-[#D4AF37]">
              2. Powertrain &amp; Dyno Benchmarking
            </h4>
            <p className="text-[11px] text-[#8C8C9A] leading-relaxed">
              Cylinder compression tests, borescope optical inspections, and complete factory diagnostic fault memory scans on proprietary marque equipment.
            </p>
          </div>

          <div className="p-4 bg-[#16161F] border border-[#232330] rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-[#D4AF37]">
              3. Unimpeachable Provenance
            </h4>
            <p className="text-[11px] text-[#8C8C9A] leading-relaxed">
              Full chain-of-custody verification, factory build-sheet reconciliation, original stamp matching, and clear international title guarantee.
            </p>
          </div>
        </div>
      </div>

      {/* Global Showrooms */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Nigerian Presence
          </span>
          <h3 className="text-2xl font-bold text-white font-display uppercase">
            Our Showroom &amp; Vault Network
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#121217] border border-[#22222D] space-y-2">
            <span className="text-xs text-[#D4AF37] font-semibold uppercase">Flagship Showroom</span>
            <h4 className="text-base font-bold text-white font-display">Victoria Island, Lagos</h4>
            <p className="text-xs text-[#8A8A96]">
              Plot 12A Akin Adesola Street, V.I., Lagos<br />
              Mon – Sat: 8:30 AM – 7:30 PM (WAT)<br />
              Tel: +234 (0) 803 890 GOLD
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#121217] border border-[#22222D] space-y-2">
            <span className="text-xs text-[#D4AF37] font-semibold uppercase">Executive Security Vault</span>
            <h4 className="text-base font-bold text-white font-display">Maitama, Abuja FCT</h4>
            <p className="text-xs text-[#8A8A96]">
              Gana Street, Maitama Diplomatic Zone, Abuja<br />
              By Private Executive Appointment<br />
              Tel: +234 (0) 9 460 0912
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#121217] border border-[#22222D] space-y-2">
            <span className="text-xs text-[#D4AF37] font-semibold uppercase">South-South Logistics Hub</span>
            <h4 className="text-base font-bold text-white font-display">Port Harcourt, Rivers</h4>
            <p className="text-xs text-[#8A8A96]">
              Old GRA / Onne Port Bonded Terminal Annex<br />
              24/7 Interstate Dispatch Concierge<br />
              Tel: +234 (0) 84 362 700
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
