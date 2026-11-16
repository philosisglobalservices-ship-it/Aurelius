import React, { useState } from 'react';
import { X, ZoomIn, Sparkles, Sliders, LayoutGrid } from 'lucide-react';
import { PictureComparisonSlider } from '../components/PictureComparisonSlider';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Showroom' | 'Hypercars' | 'Super SUVs' | 'Bespoke';
  imageUrl: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-7',
    title: '2025 Mercedes-Benz G63 AMG Brabus 800 Widestar',
    category: 'Super SUVs',
    imageUrl: '/src/assets/images/brabus_exterior_gold_1794326488165.jpg',
    caption: 'Monoblock forged 24-inch gold wheels with widebody carbon aerodynamic package parked at modern villa.'
  },
  {
    id: 'g-8',
    title: 'Brabus 800 Gold Starlight Optic Vault',
    category: 'Bespoke',
    imageUrl: '/src/assets/images/brabus_interior_gold_1794326472457.jpg',
    caption: 'Handcrafted honeycomb gold embroidery with fiber-optic celestial constellation headliner.'
  },
  {
    id: 'g-1',
    title: 'The Beverly Hills & Lagos Main Vault',
    category: 'Showroom',
    imageUrl: '/src/assets/images/hero_showroom_luxury_1794144698125.jpg',
    caption: 'Twilight view across the polished black marble showroom featuring Ferrari, Lamborghini, and Mercedes-Maybach.'
  },
  {
    id: 'g-2',
    title: 'Rimac Nevera Time Attack Studio',
    category: 'Hypercars',
    imageUrl: '/src/assets/images/car_hypercar_gold_black_1794144699718.jpg',
    caption: '1,914 BHP electric hypercar in bespoke Aurelius Champagne Gold over twill carbon fiber.'
  },
  {
    id: 'g-3',
    title: 'Aurelius Escalade-V Gold Knight Edition',
    category: 'Super SUVs',
    imageUrl: '/src/assets/images/car_luxury_suv_black_1794144700613.jpg',
    caption: '682 BHP executive coachbuilt super SUV with 24-inch forged gold wheels and discreet armor.'
  },
  {
    id: 'g-4',
    title: 'Aston Martin DBS 770 Ultimate Coupe',
    category: 'Hypercars',
    imageUrl: '/src/assets/images/car_grand_tourer_coupe_1794144700826.jpg',
    caption: 'Twin-Turbo V12 British grand tourer in Deep Sapphire Black with contrasting satin gold wheels.'
  },
  {
    id: 'g-5',
    title: 'Private Client VIP Lounge & Tasting Bar',
    category: 'Showroom',
    imageUrl: '/src/assets/images/dealership_vip_lounge_1794144698439.jpg',
    caption: 'Executive consultation salon with floor-to-ceiling glass partition overlooking incoming allocations.'
  },
  {
    id: 'g-6',
    title: 'Bespoke Diamond Quilted Leather Atelier',
    category: 'Bespoke',
    imageUrl: '/src/assets/images/dealership_vip_lounge_1794144698439.jpg',
    caption: 'Artisanal interior craftsmanship with gold contrast thread and personalized monogram embroidery.'
  }
];

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'comparison'>('grid');

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          Visual Archive &middot; Lagos &amp; Abuja
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-white font-display uppercase tracking-tight">
          The Aurelius Gallery
        </h1>
        <p className="text-xs sm:text-sm text-[#A0A0AD] leading-relaxed">
          Glimpses into our private showroom, bespoke atelier commissions, and interactive picture-sliding reveals.
        </p>

        {/* View Mode Toggle: Grid Archive vs Interactive 2-Picture Slider */}
        <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-[#14141C] border border-[#272736] mt-2">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-[#252014] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm'
                : 'text-[#8A8A96] hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Full Photo Archive</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('comparison')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'comparison'
                ? 'bg-[#D4AF37] text-black shadow-md font-bold'
                : 'text-[#D4AF37] hover:bg-[#D4AF37]/10'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive 2-Picture Slider</span>
          </button>
        </div>
      </div>

      {/* Featured Interactive Comparison Slider Section */}
      {viewMode === 'comparison' ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0F0F14] border border-[#262636] shadow-2xl">
          <PictureComparisonSlider />
        </div>
      ) : (
        <>
          {/* Spotlight Dual-Picture Slider Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0F0F14] border border-[#262636] shadow-xl">
            <PictureComparisonSlider />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-4">
            {['all', 'Showroom', 'Hypercars', 'Super SUVs', 'Bespoke'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#D4AF37] text-black font-semibold shadow-md'
                    : 'bg-[#15151C] border border-[#272733] text-[#A6A6B4] hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Visuals' : cat}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Masonry / Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActivePhoto(item)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[#0A0A0C] border border-[#22222C] cursor-pointer"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Overlay Info */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold text-white font-display">
                  {item.title}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#181822]/80 border border-[#303040] flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37] transition-colors">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#101015] border border-[#2C2C3A] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:text-[#D4AF37] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] bg-black">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-[#14141B] border-t border-[#22222E]">
              <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                {activePhoto.category}
              </span>
              <h3 className="text-lg font-bold text-white font-display mt-0.5">
                {activePhoto.title}
              </h3>
              <p className="text-xs text-[#A0A0AC] mt-1">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
