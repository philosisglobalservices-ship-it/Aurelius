import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, Sliders, Play, Pause, ChevronLeft, ChevronRight, Eye, ShieldCheck } from 'lucide-react';

export interface ComparisonPair {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  imageA: {
    url: string;
    label: string;
    tagline: string;
  };
  imageB: {
    url: string;
    label: string;
    tagline: string;
  };
}

export const DEFAULT_COMPARISONS: ComparisonPair[] = [
  {
    id: 'brabus-g63',
    title: '2025 Mercedes-Benz G63 AMG Brabus 800 Widestar',
    subtitle: 'Slide between the aggressive Obsidian Gold Widebody Exterior and the Hand-Stitched Bespoke Starlight Cockpit',
    badge: 'Exclusive Allocation &middot; Lagos VIP Vault',
    imageA: {
      url: '/src/assets/images/brabus_exterior_gold_1794326488165.jpg',
      label: 'Brabus 800 Widestar Exterior',
      tagline: 'Carbon Hood &middot; Gold Monoblock 24" &middot; 800 BHP'
    },
    imageB: {
      url: '/src/assets/images/brabus_interior_gold_1794326472457.jpg',
      label: 'Bespoke Starlight Interior Vault',
      tagline: 'Gold Honeycomb Stitching &middot; Optic Fiber Roof &middot; Carbon Console'
    }
  },
  {
    id: 'hypercar-vs-suv',
    title: 'The Apex of Nigerian Collector Garage',
    subtitle: 'Slide to compare the 1,914 BHP Rimac Nevera Champagne Gold Hypercar with the Escort Armored Sovereign SUV',
    badge: 'Curated Duo &middot; Maitama Abuja',
    imageA: {
      url: '/src/assets/images/car_hypercar_gold_black_1794144699718.jpg',
      label: 'Rimac Nevera Time Attack',
      tagline: '1,914 BHP All-Electric &middot; 0-60 in 1.74s'
    },
    imageB: {
      url: '/src/assets/images/car_luxury_suv_black_1794144700613.jpg',
      label: 'Cadillac Escalade-V Sovereign',
      tagline: 'Supercharged V8 &middot; Discreet Armored Underbody'
    }
  },
  {
    id: 'showroom-vs-atelier',
    title: 'Flagship Showroom vs Private Consultation Salon',
    subtitle: 'Slide from the main marble exhibition floor into the private VIP acquisition lounge',
    badge: 'Victoria Island Flagship',
    imageA: {
      url: '/src/assets/images/hero_showroom_luxury_1794144698125.jpg',
      label: 'Main Exhibition Floor',
      tagline: 'Black Polished Granite &middot; Architectural Lighting'
    },
    imageB: {
      url: '/src/assets/images/dealership_vip_lounge_1794144698439.jpg',
      label: 'Executive Client Atelier',
      tagline: 'Private Champagne Bar &middot; Bespoke Leather Selection'
    }
  }
];

interface PictureComparisonSliderProps {
  comparisons?: ComparisonPair[];
  onSelectCarInterested?: () => void;
  className?: string;
}

export const PictureComparisonSlider: React.FC<PictureComparisonSliderProps> = ({
  comparisons = DEFAULT_COMPARISONS,
  onSelectCarInterested,
  className = ''
}) => {
  const [activePairIndex, setActivePairIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const autoSlideDirectionRef = useRef<number>(1);

  const activePair = comparisons[activePairIndex] || comparisons[0];

  // Mouse / Touch Position Handler
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(clampedPercentage);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoSliding(false);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoSliding(false);
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('touchmove', handleGlobalTouchMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging, handleMove]);

  // Auto-slide oscillation animation
  useEffect(() => {
    if (!isAutoSliding) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const speed = 0.35; // smooth oscillation speed
    const step = () => {
      setSliderPosition((prev) => {
        let next = prev + speed * autoSlideDirectionRef.current;
        if (next >= 90) {
          next = 90;
          autoSlideDirectionRef.current = -1;
        } else if (next <= 10) {
          next = 10;
          autoSlideDirectionRef.current = 1;
        }
        return next;
      });
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAutoSliding]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#22222E] pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F190D] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Visual Slider &middot; Dual-Picture Reveal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display uppercase tracking-tight">
            {activePair.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#A0A0B0] mt-1 max-w-2xl">
            {activePair.subtitle}
          </p>
        </div>

        {/* Quick Comparison Selector & Auto Slide Toggle */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            type="button"
            onClick={() => setIsAutoSliding(!isAutoSliding)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border ${
              isAutoSliding
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20'
                : 'bg-[#181822] text-[#E0E0EA] border-[#2E2E3E] hover:border-[#D4AF37]/50'
            }`}
            title="Auto-slide back and forth between pictures"
          >
            {isAutoSliding ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isAutoSliding ? 'Pause Auto-Slide' : 'Auto-Slide Pictures'}</span>
          </button>

          {comparisons.length > 1 && (
            <div className="flex items-center gap-1 bg-[#14141C] p-1 rounded-lg border border-[#262634]">
              {comparisons.map((pair, idx) => (
                <button
                  key={pair.id}
                  type="button"
                  onClick={() => {
                    setActivePairIndex(idx);
                    setSliderPosition(50);
                  }}
                  className={`px-2.5 py-1.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                    activePairIndex === idx
                      ? 'bg-[#252014] text-[#D4AF37] border border-[#D4AF37]/40 font-semibold'
                      : 'text-[#8A8A96] hover:text-white'
                  }`}
                >
                  Pair {idx + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Slider Viewport */}
      <div className="relative rounded-2xl overflow-hidden border border-[#2D2D3C] bg-[#0A0A0D] shadow-2xl select-none group">
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] cursor-ew-resize overflow-hidden"
          role="slider"
          aria-valuenow={Math.round(sliderPosition)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') {
              setIsAutoSliding(false);
              setSliderPosition((p) => Math.max(0, p - 5));
            } else if (e.key === 'ArrowRight') {
              setIsAutoSliding(false);
              setSliderPosition((p) => Math.min(100, p + 5));
            }
          }}
        >
          {/* Base Picture (Image B - Revealed on Right) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={activePair.imageB.url}
              alt={activePair.imageB.label}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center pointer-events-none"
            />
          </div>

          {/* Overlay Picture (Image A - Clipped on Left) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path]"
            style={{
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
            }}
          >
            <img
              src={activePair.imageA.url}
              alt={activePair.imageA.label}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />
          </div>

          {/* Vertical Slider Divider Line */}
          <div
            className="absolute top-0 bottom-0 z-20 w-0.5 bg-gradient-to-b from-[#ECCF84] via-[#D4AF37] to-[#B89225] shadow-[0_0_15px_rgba(212,175,55,0.8)] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Center Drag Handle Badge */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/90 border-2 border-[#D4AF37] shadow-xl shadow-black/80 flex items-center justify-center text-[#D4AF37] backdrop-blur-md group-hover:scale-110 transition-transform">
              <div className="flex items-center gap-0.5">
                <ChevronLeft className="w-3.5 h-3.5 text-[#ECCF84]" />
                <div className="w-0.5 h-4 bg-[#D4AF37]/60 rounded-full" />
                <ChevronRight className="w-3.5 h-3.5 text-[#ECCF84]" />
              </div>
            </div>
          </div>

          {/* Badges Floating in Corners */}
          {/* Left Picture Badge */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none max-w-[45%]">
            <div className="p-2.5 sm:p-3 rounded-xl bg-black/80 border border-[#2D2D3C] backdrop-blur-md space-y-0.5 shadow-lg">
              <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
                {activePair.imageA.label}
              </span>
              <p className="text-[11px] text-[#D0D0DB] font-medium truncate hidden sm:block">
                {activePair.imageA.tagline}
              </p>
            </div>
          </div>

          {/* Right Picture Badge */}
          <div className="absolute top-4 right-4 z-10 pointer-events-none max-w-[45%] text-right">
            <div className="p-2.5 sm:p-3 rounded-xl bg-black/80 border border-[#2D2D3C] backdrop-blur-md space-y-0.5 shadow-lg">
              <span className="text-[10px] uppercase font-bold text-[#F3E5AB] tracking-wider block">
                {activePair.imageB.label}
              </span>
              <p className="text-[11px] text-[#D0D0DB] font-medium truncate hidden sm:block">
                {activePair.imageB.tagline}
              </p>
            </div>
          </div>

          {/* Bottom Hint Pill */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="px-3.5 py-1.5 rounded-full bg-black/75 border border-[#D4AF37]/40 text-[#F3E5AB] text-[11px] font-medium backdrop-blur-md flex items-center gap-2 shadow-lg">
              <span>&larr; Drag slider to reveal picture &rarr;</span>
              <span className="text-[#D4AF37] font-bold font-mono">{Math.round(sliderPosition)}%</span>
            </span>
          </div>
        </div>

        {/* Quick Position Preset Bar */}
        <div className="px-4 py-3 bg-[#111116] border-t border-[#22222E] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#7D7D8B] text-[11px]">Reveal Presets:</span>
            <button
              type="button"
              onClick={() => {
                setIsAutoSliding(false);
                setSliderPosition(0);
              }}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                sliderPosition === 0 ? 'bg-[#D4AF37] text-black font-bold' : 'bg-[#181822] text-[#A6A6B4] hover:text-white'
              }`}
            >
              100% {activePair.imageB.label.split(' ')[0]}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAutoSliding(false);
                setSliderPosition(50);
              }}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                sliderPosition === 50 ? 'bg-[#D4AF37] text-black font-bold' : 'bg-[#181822] text-[#A6A6B4] hover:text-white'
              }`}
            >
              50/50 Split
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAutoSliding(false);
                setSliderPosition(100);
              }}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                sliderPosition === 100 ? 'bg-[#D4AF37] text-black font-bold' : 'bg-[#181822] text-[#A6A6B4] hover:text-white'
              }`}
            >
              100% {activePair.imageA.label.split(' ')[0]}
            </button>
          </div>

          {onSelectCarInterested && (
            <button
              type="button"
              onClick={onSelectCarInterested}
              className="text-[#D4AF37] hover:text-[#ECCF84] font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View 2025 Brabus G63 AMG Specifications</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
