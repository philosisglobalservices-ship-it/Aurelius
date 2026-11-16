import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, Play, Pause, MessageSquare, 
  Sparkles, Shield, ArrowUpRight, Gauge, Zap 
} from 'lucide-react';
import { Car } from '../types';
import { CurrencyCode, formatPrice } from '../utils/currency';

export interface SlideItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  price?: number;
  imageUrl: string;
  metrics?: {
    hp: number;
    acceleration: number;
    topSpeed: number;
  };
  carId?: string;
  whatsappMessage?: string;
}

interface ShowcasePictureSliderProps {
  slides?: SlideItem[];
  cars?: Car[];
  currency?: CurrencyCode;
  onSelectCar?: (car: Car) => void;
  onNegotiate?: (car: Car) => void;
  dealerWhatsApp: string;
  className?: string;
}

export const ShowcasePictureSlider: React.FC<ShowcasePictureSliderProps> = ({
  slides: customSlides,
  cars = [],
  currency = 'NGN',
  onSelectCar,
  onNegotiate,
  dealerWhatsApp,
  className = ''
}) => {
  // Built-in luxury sliding pictures if custom not provided
  const slides: SlideItem[] = customSlides || [
    {
      id: 'slide-1',
      title: '2025 Mercedes-Benz G63 AMG Brabus 800 Widestar',
      subtitle: 'Obsidian Black with 24" Gold Monoblock Forged Wheels & Handcrafted Biturbo V8',
      badge: 'Bespoke Widebody &middot; 4K Video Tour Ready',
      price: 495000000,
      imageUrl: '/src/assets/images/brabus_exterior_gold_1794326488165.jpg',
      metrics: { hp: 800, acceleration: 4.1, topSpeed: 240 },
      carId: 'car-1',
      whatsappMessage: 'Hello Aurelius Motors, I am inquiring on the 2025 Mercedes-Benz G63 AMG Brabus 800 Widestar Gold Crest.'
    },
    {
      id: 'slide-2',
      title: 'Brabus 800 Cockpit: Starlight Optic Vault',
      subtitle: 'Bespoke Mandarin & Black Honeycomb Nappa Leather with Sovereign Carbon Dashboard',
      badge: 'Atelier Masterpiece &middot; Hand-Stitched',
      price: 495000000,
      imageUrl: '/src/assets/images/brabus_interior_gold_1794326472457.jpg',
      metrics: { hp: 800, acceleration: 4.1, topSpeed: 240 },
      carId: 'car-1',
      whatsappMessage: 'Hello Aurelius Motors, I want private photos and pricing for the Brabus 800 Starlight Interior.'
    },
    {
      id: 'slide-3',
      title: 'Rimac Nevera Time Attack Edition',
      subtitle: 'Aurelius Champagne Gold & Exposed Twill Carbon Fiber Aerodynamics',
      badge: '1,914 BHP Hypercar &middot; 0-60 in 1.74s',
      price: 2600000000,
      imageUrl: '/src/assets/images/car_hypercar_gold_black_1794144699718.jpg',
      metrics: { hp: 1914, acceleration: 1.74, topSpeed: 412 },
      carId: 'car-3',
      whatsappMessage: 'Hello Aurelius Motors, I am interested in the Rimac Nevera Time Attack allocation.'
    },
    {
      id: 'slide-4',
      title: 'Cadillac Escalade-V Sovereign Edition',
      subtitle: '682 BHP Supercharged V8 with Discreet Underbody Armor & 24" Gold Accents',
      badge: 'Executive Escort &middot; Armored Protection',
      price: 360000000,
      imageUrl: '/src/assets/images/car_luxury_suv_black_1794144700613.jpg',
      metrics: { hp: 682, acceleration: 4.4, topSpeed: 200 },
      carId: 'car-2',
      whatsappMessage: 'Hello Aurelius Motors, I need information on the Cadillac Escalade-V Sovereign Edition.'
    },
    {
      id: 'slide-5',
      title: 'Aston Martin DBS 770 Ultimate',
      subtitle: '759 BHP Twin-Turbo V12 in Deep Sapphire Black with Satin Gold Carbon Lip',
      badge: 'Collector Finale &middot; 1 of 300 Global',
      price: 680000000,
      imageUrl: '/src/assets/images/car_grand_tourer_coupe_1794144700826.jpg',
      metrics: { hp: 759, acceleration: 3.2, topSpeed: 340 },
      carId: 'car-4',
      whatsappMessage: 'Hello Aurelius Motors, I want to inquire on the Aston Martin DBS 770 Ultimate.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const total = slides.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto sliding timer
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5500);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, total]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const activeSlide = slides[currentIndex];
  const matchedCar = cars.find((c) => c.id === activeSlide.carId);

  return (
    <div 
      className={`space-y-4 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Slider Navigation & Status */}
      <div className="flex items-center justify-between text-xs text-[#8A8A96]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Showcase Picture Slider</span>
          </span>
          <span className="text-[#3A3A4A]">&middot;</span>
          <span className="font-mono text-white text-[11px]">
            {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-[#14141C] border border-[#272736] text-[#A6A6B4] hover:text-white transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Auto-Sliding' : 'Play Auto-Sliding'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prevSlide}
              className="p-1.5 rounded-lg bg-[#14141C] border border-[#272736] text-[#A6A6B4] hover:text-white hover:border-[#D4AF37]/50 transition-colors cursor-pointer"
              aria-label="Previous Picture"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="p-1.5 rounded-lg bg-[#14141C] border border-[#272736] text-[#A6A6B4] hover:text-white hover:border-[#D4AF37]/50 transition-colors cursor-pointer"
              aria-label="Next Picture"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Sliding Picture Stage */}
      <div 
        className="relative rounded-2xl overflow-hidden border border-[#282838] bg-[#070709] shadow-2xl aspect-[16/10] sm:aspect-[21/9] select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Pictures Track sliding horizontally from one to another */}
        <div 
          className="flex w-full h-full transition-transform duration-700 ease-out will-change-transform"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div key={slide.id} className="relative w-full h-full shrink-0 overflow-hidden">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center scale-102 transition-transform duration-1000 ease-out"
              />
              {/* Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/30" />
            </div>
          ))}
        </div>

        {/* Navigation Arrow Overlays */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer opacity-80 hover:opacity-100 hover:scale-105 active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer opacity-80 hover:opacity-100 hover:scale-105 active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Content Caption Lockup */}
        <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
          <div className="space-y-1.5 max-w-xl">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-[#1F190D]/90 border border-[#D4AF37]/40 text-[#F3E5AB] backdrop-blur-sm">
              {activeSlide.badge}
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white font-display uppercase tracking-tight leading-snug drop-shadow-md">
              {activeSlide.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#D5D5E0] line-clamp-2 drop-shadow">
              {activeSlide.subtitle}
            </p>

            {/* Performance metrics callout */}
            {activeSlide.metrics && (
              <div className="flex items-center gap-4 pt-1 text-xs text-[#C0C0D0]">
                <span className="flex items-center gap-1 font-semibold text-white">
                  <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {activeSlide.metrics.hp} BHP
                </span>
                <span>&middot;</span>
                <span className="font-semibold text-white">
                  0-60 in {activeSlide.metrics.acceleration}s
                </span>
                <span>&middot;</span>
                <span className="font-semibold text-white">
                  {activeSlide.metrics.topSpeed} km/h Top Speed
                </span>
              </div>
            )}
          </div>

          {/* Pricing & CTA Lockup */}
          <div className="shrink-0 flex items-center gap-3 pointer-events-auto">
            {activeSlide.price && (
              <div className="text-right hidden sm:block bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                <span className="text-[10px] uppercase text-[#8E8E9C] block">Listed Price</span>
                <span className="text-lg font-bold text-[#F3E5AB] font-display">
                  {formatPrice(activeSlide.price, currency)}
                </span>
              </div>
            )}

            {matchedCar && onSelectCar && (
              <button
                type="button"
                onClick={() => onSelectCar(matchedCar)}
                className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#ECCF84] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
              >
                <span>View Motorcar</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}

            {matchedCar && onNegotiate && (
              <button
                type="button"
                onClick={() => onNegotiate(matchedCar)}
                className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBA57] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-black" />
                <span>Negotiate Price</span>
              </button>
            )}
          </div>
        </div>

        {/* Progress bar line indicator */}
        <div className="absolute top-0 left-0 right-0 z-20 h-1 bg-white/10">
          <div 
            className="h-full bg-gradient-to-r from-[#ECCF84] via-[#D4AF37] to-[#B89225] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Picture Thumbnail Ribbon - sliding into active picture */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`group relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
              currentIndex === idx
                ? 'border-[#D4AF37] scale-102 ring-2 ring-[#D4AF37]/30 shadow-lg'
                : 'border-[#22222E] opacity-55 hover:opacity-90'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
            <div className="absolute bottom-1 left-1.5 right-1.5 truncate text-[10px] font-semibold text-white drop-shadow hidden sm:block">
              {slide.title.split(' ')[0]} {slide.title.split(' ')[1]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
