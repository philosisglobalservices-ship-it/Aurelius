import React from 'react';
import { Car } from '../types';
import { CurrencyCode, formatPrice, formatMileage } from '../utils/currency';
import { MessageSquare, ArrowUpRight, Gauge, Zap, Flame, Play } from 'lucide-react';

interface CarCardProps {
  car: Car;
  currency: CurrencyCode;
  onSelectCar: (car: Car) => void;
  onNegotiate: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  currency,
  onSelectCar,
  onNegotiate,
}) => {
  const isAvailable = car.status === 'Available';
  const mainImage = car.images[0] || '/src/assets/images/hero_showroom_luxury_1794144698125.jpg';

  return (
    <div className="group relative bg-[#111115] border border-[#22222A] hover:border-[#D4AF37]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/5 flex flex-col justify-between">
      {/* Top Media Anchor */}
      <div 
        onClick={() => onSelectCar(car)}
        className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0C] cursor-pointer"
      >
        <img
          src={mainImage}
          alt={`${car.year} ${car.title}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Floating Tags */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-[#0A0A0C]/85 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30">
            {car.category}
          </span>

          {car.status !== 'Available' ? (
            <span className={`text-[11px] font-bold uppercase px-2.5 py-1 rounded backdrop-blur-md ${
              car.status === 'Reserved' 
                ? 'bg-amber-950/80 text-amber-300 border border-amber-600/40' 
                : 'bg-red-950/80 text-red-300 border border-red-600/40'
            }`}>
              {car.status}
            </span>
          ) : car.featured ? (
            <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-gradient-to-r from-[#D4AF37] to-[#B89225] text-black">
              Featured
            </span>
          ) : null}
        </div>

        {/* Condition & Video kicker bottom */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] text-[#C5C5CE] bg-[#0B0B0E]/80 backdrop-blur-sm px-2 py-0.5 rounded">
            {car.condition} &middot; {formatMileage(car.mileage)}
          </span>

          {car.videoUrl && (
            <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#F3E5AB] bg-[#14141B]/95 border border-[#D4AF37]/50 backdrop-blur-sm px-2 py-0.5 rounded shadow">
              <Play className="w-2.5 h-2.5 fill-[#D4AF37] text-[#D4AF37]" />
              <span>4K Video</span>
            </span>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Brand & Stock */}
          <div className="flex items-center justify-between text-xs text-[#8A8A96] mb-1">
            <span className="uppercase tracking-widest text-[#A2A2AD] font-medium">{car.brand}</span>
            <span className="font-mono text-[11px] text-[#6E6E78]">#{car.stockNumber}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectCar(car)}
            className="text-base font-semibold text-[#F2F2F5] hover:text-[#D4AF37] transition-colors cursor-pointer line-clamp-1"
          >
            {car.year} {car.title}
          </h3>

          {/* Engine & Key Specs Strip */}
          <p className="text-xs text-[#9595A0] line-clamp-1 mt-1">
            {car.engine} &middot; {car.exteriorColor}
          </p>
        </div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-[#1E1E26] text-xs">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-[#737380] flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-[#D4AF37]" />
              Power
            </span>
            <span className="font-semibold text-[#E0E0E6] tabular-nums mt-0.5">
              {car.horsepower} <span className="text-[10px] font-normal text-[#8E8E9A]">BHP</span>
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-[#737380] flex items-center gap-1">
              <Flame className="w-2.5 h-2.5 text-[#D4AF37]" />
              0-60 MPH
            </span>
            <span className="font-semibold text-[#E0E0E6] tabular-nums mt-0.5">
              {car.acceleration0to60} <span className="text-[10px] font-normal text-[#8E8E9A]">s</span>
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-[#737380] flex items-center gap-1">
              <Gauge className="w-2.5 h-2.5 text-[#D4AF37]" />
              Top Speed
            </span>
            <span className="font-semibold text-[#E0E0E6] tabular-nums mt-0.5">
              {car.topSpeed} <span className="text-[10px] font-normal text-[#8E8E9A]">MPH</span>
            </span>
          </div>
        </div>

        {/* Pricing & CTA Suite */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#737380] block">
                Listed Price
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-[#F3E5AB] font-display">
                  {formatPrice(car.price, currency)}
                </span>
                {car.originalPrice && car.originalPrice > car.price && (
                  <span className="text-xs text-[#6B6B78] line-through tabular-nums">
                    {formatPrice(car.originalPrice, currency)}
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectCar(car)}
              className="text-xs text-[#D4AF37] hover:text-[#F3E5AB] flex items-center gap-0.5 transition-colors"
            >
              <span>Specs</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-2">
            {/* WhatsApp Price Negotiation Button */}
            <button
              type="button"
              onClick={() => onNegotiate(car)}
              className="w-full py-2 px-2.5 rounded-lg text-xs font-semibold bg-[#122818] border border-[#25D366]/40 hover:border-[#25D366] text-[#25D366] hover:bg-[#183620] transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
              title="Negotiate price on WhatsApp with Dealer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="truncate">Negotiate</span>
            </button>

            {/* View Details / Purchase Inquire */}
            <button
              type="button"
              onClick={() => onSelectCar(car)}
              className="w-full py-2 px-2.5 rounded-lg text-xs font-semibold bg-[#1A1A22] border border-[#2C2C38] hover:border-[#D4AF37] text-[#E5E5E8] hover:text-[#F3E5AB] transition-all flex items-center justify-center gap-1 active:scale-95"
            >
              <span className="truncate">View Vehicle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
