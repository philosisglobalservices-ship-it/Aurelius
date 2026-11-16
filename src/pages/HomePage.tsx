import React, { useState, useEffect } from 'react';
import { Car, BlogPost, PageRoute } from '../types';
import { CurrencyCode, formatPrice } from '../utils/currency';
import { CarCard } from '../components/CarCard';
import { 
  Search, Shield, Globe, Award, Sparkles, ArrowRight, 
  MessageSquare, ChevronRight, ChevronLeft, Play, Pause, CheckCircle2 
} from 'lucide-react';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';
import { PictureComparisonSlider } from '../components/PictureComparisonSlider';
import { ShowcasePictureSlider } from '../components/ShowcasePictureSlider';

interface HeroSlide {
  id: string;
  image: string;
  tag: string;
  location: string;
  headlineMain: string;
  headlineGold: string;
  caption: string;
  carId: string;
}

const HERO_PICTURE_SLIDES: HeroSlide[] = [
  {
    id: 'hero-brabus-ext',
    image: '/src/assets/images/brabus_exterior_gold_1794326488165.jpg',
    tag: '🔥 2025 Mercedes-Benz G63 Brabus 800 Widestar',
    location: 'Victoria Island Flagship Vault, Lagos',
    headlineMain: 'Where Rare Engineering',
    headlineGold: 'Meets Nigerian Sovereignty',
    caption: 'Handcrafted Biturbo V8 Brabus 800 in Obsidian Black with 24" Gold Monoblock forged wheels. 100% genuine Nigerian Customs Duty and 4K walkaround tour.',
    carId: 'car-1'
  },
  {
    id: 'hero-brabus-int',
    image: '/src/assets/images/brabus_interior_gold_1794326472457.jpg',
    tag: '✨ Bespoke Brabus 800 Starlight Optic Vault',
    location: 'VIP Atelier & Private Vault, Maitama Abuja',
    headlineMain: 'Bespoke Starlight Vaults',
    headlineGold: 'Crafted For Nigerian Royalty',
    caption: 'Mandarin & Black honeycomb quilted Nappa leather, celestial fiber-optic constellation roof, and sovereign forged carbon appointments.',
    carId: 'car-1'
  },
  {
    id: 'hero-nevera',
    image: '/src/assets/images/car_hypercar_gold_black_1794144699718.jpg',
    tag: '⚡ 1,914 BHP Rimac Nevera Time Attack',
    location: 'Private Collector Vault, Lagos',
    headlineMain: 'Electrified Velocity',
    headlineGold: 'The World’s Fastest Acceleration',
    caption: '0-60 MPH in 1.74 seconds. Finished in bespoke Aurelius Champagne Gold over matte twill carbon fiber. Unrestricted global allocation.',
    carId: 'car-3'
  },
  {
    id: 'hero-escalade',
    image: '/src/assets/images/car_luxury_suv_black_1794144700613.jpg',
    tag: '🛡️ Armored CEN B6 Cadillac Escalade-V Sovereign',
    location: 'Executive Diplomatic Fleet, Abuja',
    headlineMain: 'Sovereign Armored Convoy',
    headlineGold: 'Maximum Ballistic Protection',
    caption: '682 BHP Supercharged V8 executive escort vehicle with certified CEN B6 ballistic armor, underbody grenade shields, and run-flat system.',
    carId: 'car-2'
  },
  {
    id: 'hero-aston',
    image: '/src/assets/images/car_grand_tourer_coupe_1794144700826.jpg',
    tag: '🏁 Aston Martin DBS 770 Ultimate Coupe',
    location: 'Victoria Island Flagship, Lagos',
    headlineMain: 'Twin-Turbo V12 Finale',
    headlineGold: 'British Grand Touring Royalty',
    caption: '759 BHP handcrafted British grand tourer in Deep Sapphire Black with satin gold carbon lip and personalized interior monogramming.',
    carId: 'car-4'
  },
  {
    id: 'hero-showroom',
    image: '/src/assets/images/hero_showroom_luxury_1794144698125.jpg',
    tag: '🏛️ Over ₦5 Billion In Verified Showroom Vault',
    location: 'Victoria Island Lagos & Maitama Abuja',
    headlineMain: 'The Premier Automotive Vault',
    headlineGold: 'In West Africa',
    caption: 'Direct WhatsApp negotiation with the dealer principal, verifiable Nigerian Customs C84 clearance, and enclosed flatbed delivery to any state.',
    carId: 'car-1'
  }
];

interface HomePageProps {
  cars: Car[];
  blogPosts: BlogPost[];
  currency: CurrencyCode;
  onNavigate: (page: PageRoute) => void;
  onSelectCar: (car: Car) => void;
  onNegotiate: (car: Car) => void;
  onSelectPost: (post: BlogPost) => void;
  dealerWhatsApp: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  cars,
  blogPosts,
  currency,
  onNavigate,
  onSelectCar,
  onNegotiate,
  onSelectPost,
  dealerWhatsApp
}) => {
  // Quick Search States
  const [searchCategory, setSearchCategory] = useState<string>('all');
  const [searchBrand, setSearchBrand] = useState<string>('all');
  const [searchPriceMax, setSearchPriceMax] = useState<string>('all');

  // Hero Automatic Picture Slider State
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [isHeroAutoSliding, setIsHeroAutoSliding] = useState(true);

  // Auto sliding timer (slides picture every 4.5 seconds)
  useEffect(() => {
    if (!isHeroAutoSliding) return;
    const interval = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % HERO_PICTURE_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHeroAutoSliding]);

  const nextHeroSlide = () => {
    setHeroSlideIndex((prev) => (prev + 1) % HERO_PICTURE_SLIDES.length);
  };

  const prevHeroSlide = () => {
    setHeroSlideIndex((prev) => (prev - 1 + HERO_PICTURE_SLIDES.length) % HERO_PICTURE_SLIDES.length);
  };

  const currentHeroSlide = HERO_PICTURE_SLIDES[heroSlideIndex];

  const featuredCars = cars.filter(c => c.featured && c.status === 'Available').slice(0, 3);
  const latestPosts = blogPosts.slice(0, 2);

  const brands = Array.from(new Set(cars.map(c => c.brand)));

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('inventory');
  };

  const directWhatsAppLink = createGeneralWhatsAppUrl(
    dealerWhatsApp,
    'Hello Aurelius Motors, I am looking to purchase an exotic vehicle from your collection.'
  );

  return (
    <div className="w-full space-y-24">
      {/* Hero Section with Auto-Sliding Pictures */}
      <section 
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsHeroAutoSliding(false)}
        onMouseLeave={() => setIsHeroAutoSliding(true)}
      >
        {/* Pictures Track sliding automatically from one picture to another */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            className="flex w-full h-full transition-transform duration-1000 ease-in-out will-change-transform"
            style={{ transform: `translateX(-${heroSlideIndex * 100}%)` }}
          >
            {HERO_PICTURE_SLIDES.map((slide) => (
              <div key={slide.id} className="relative w-full h-full shrink-0">
                <img
                  src={slide.image}
                  alt={slide.tag}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center brightness-70 scale-102"
                />
              </div>
            ))}
          </div>

          {/* Luxury dark gradient overlays for typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/65 to-black/35 pointer-events-none" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/45 to-[#0B0B0C] pointer-events-none" />
        </div>

        {/* Hero Slide Left & Right Navigation Arrows */}
        <button
          type="button"
          onClick={prevHeroSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer opacity-75 hover:opacity-100 hover:scale-105 active:scale-95 shadow-xl"
          aria-label="Previous Hero Picture"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          type="button"
          onClick={nextHeroSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer opacity-75 hover:opacity-100 hover:scale-105 active:scale-95 shadow-xl"
          aria-label="Next Hero Picture"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Top Floating Auto-Slide Indicator Bar */}
        <div className="absolute top-6 left-4 right-4 z-20 max-w-5xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Active Vehicle Tag & Location */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/80 border border-[#D4AF37]/50 backdrop-blur-md text-[#F3E5AB] text-[11px] font-semibold tracking-wider flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{currentHeroSlide.tag}</span>
            </span>
            <span className="hidden md:inline-block text-[11px] text-[#A0A0B0] bg-black/50 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-sm">
              {currentHeroSlide.location}
            </span>
          </div>

          {/* Auto-Slide Progress Dots and Play/Pause */}
          <div className="flex items-center gap-2 bg-black/75 px-3 py-1.5 rounded-full border border-[#2D2D3D] backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-1.5">
              {HERO_PICTURE_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setHeroSlideIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    heroSlideIndex === idx
                      ? 'w-7 bg-gradient-to-r from-[#ECCF84] to-[#D4AF37] shadow-sm'
                      : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  title={`Slide to picture ${idx + 1}`}
                  aria-label={`Slide to picture ${idx + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIsHeroAutoSliding(!isHeroAutoSliding)}
              className="text-[#D4AF37] hover:text-white transition-colors ml-1 p-0.5 cursor-pointer"
              title={isHeroAutoSliding ? 'Pause auto-slide' : 'Resume auto-slide'}
            >
              {isHeroAutoSliding ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
            </button>
          </div>
        </div>

        {/* Hero Copy & Callout (changes dynamically with active sliding picture) */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center pt-20 pb-28 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1812]/85 border border-[#D4AF37]/50 backdrop-blur-md text-[#F3E5AB] text-xs font-medium tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Victoria Island Lagos &middot; Maitama Abuja</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-display uppercase leading-[1.1] text-balance transition-all duration-500">
            {currentHeroSlide.headlineMain} <br />
            <span className="gold-gradient-text">{currentHeroSlide.headlineGold}</span>
          </h1>

          <p className="text-sm sm:text-base text-[#D0D0DA] max-w-2xl mx-auto leading-relaxed transition-all duration-500">
            {currentHeroSlide.caption}
          </p>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => {
                const targetCar = cars.find(c => c.id === currentHeroSlide.carId) || cars[0];
                if (targetCar) onSelectCar(targetCar);
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#ECCF84] via-[#D4AF37] to-[#B89225] hover:brightness-110 active:scale-95 transition-all shadow-xl gold-glow cursor-pointer flex items-center justify-center gap-2"
            >
              <span>View This Motorcar</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('inventory')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-semibold text-white bg-[#1A1A24]/90 border border-[#35354A] hover:border-[#D4AF37] hover:bg-[#252535] transition-all flex items-center justify-center gap-2 backdrop-blur-sm cursor-pointer"
            >
              <span>Explore All ({cars.length}) Motorcars</span>
            </button>

            <a
              href={directWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-semibold text-[#25D366] bg-[#0E1E12]/90 border border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#142A1A] transition-all flex items-center justify-center gap-2 backdrop-blur-sm cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Dealer Principal</span>
            </a>
          </div>
        </div>

        {/* Floating Quick Search Drawer Bottom Anchor */}
        <div className="absolute bottom-4 left-4 right-4 z-20 max-w-4xl mx-auto">
          <form
            onSubmit={handleQuickSearch}
            className="p-3 sm:p-4 rounded-2xl bg-[#111116]/90 border border-[#2E2E3C] backdrop-blur-xl shadow-2xl grid grid-cols-1 sm:grid-cols-4 gap-3 items-center"
          >
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#8A8A96] mb-1">Category</label>
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="w-full bg-[#1A1A22] border border-[#2E2E3C] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="all">All Categories</option>
                <option value="Super SUV">Super SUV</option>
                <option value="Armored B6/B7">Armored B6/B7 Ballistic</option>
                <option value="Executive Limousine">Executive Limousine</option>
                <option value="Hypercar">Hypercar</option>
                <option value="Grand Tourer">Grand Tourer</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#8A8A96] mb-1">Marque / Brand</label>
              <select
                value={searchBrand}
                onChange={(e) => setSearchBrand(e.target.value)}
                className="w-full bg-[#1A1A22] border border-[#2E2E3C] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="all">All Marques</option>
                {brands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#8A8A96] mb-1">Budget Threshold</label>
              <select
                value={searchPriceMax}
                onChange={(e) => setSearchPriceMax(e.target.value)}
                className="w-full bg-[#1A1A22] border border-[#2E2E3C] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="all">Any Price</option>
                <option value="300000000">Under ₦300 Million</option>
                <option value="500000000">Under ₦500 Million</option>
                <option value="800000000">Under ₦800 Million</option>
                <option value="1500000000">₦1.0 Billion+</option>
              </select>
            </div>

            <div className="sm:pt-4">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-[#D4AF37] hover:bg-[#ECCF84] text-black font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors uppercase tracking-wider"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Inventory</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Trust & Heritage Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-[#121217] border border-[#22222C] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#252014] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <MessageSquare className="w-5 h-5 text-[#25D366]" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Direct WhatsApp Negotiation
            </h3>
            <p className="text-xs text-[#8E8E9C] leading-relaxed">
              Skip middlemen. Propose your offer in Naira or USD directly to the dealer principal on WhatsApp for instant confidential response.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#121217] border border-[#22222C] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#252014] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              100% Genuine Customs Duty
            </h3>
            <p className="text-xs text-[#8E8E9C] leading-relaxed">
              Every vehicle has verified Single Goods Declaration (SGD) and Form C84 authenticated on the Nigerian Customs Service portal with zero seizure risk.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#121217] border border-[#252014] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#252014] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Nationwide Enclosed Delivery
            </h3>
            <p className="text-xs text-[#8E8E9C] leading-relaxed">
              Covered hydraulic flatbed delivery directly to your compound in Lagos, Abuja, Port Harcourt, Kano, Ibadan, Enugu, or any Nigerian state.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#121217] border border-[#22222C] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#252014] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              B6 Armoring &amp; VIP Security
            </h3>
            <p className="text-xs text-[#8E8E9C] leading-relaxed">
              Certified CEN B6 ballistic armored builds, heavy-duty run-flats, and siren intercom systems built for high-security executive transport.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Two-Picture Sliding Reveal (Brabus Exterior vs Starlight Interior) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <PictureComparisonSlider
          onSelectCarInterested={() => {
            const brabusCar = cars.find(c => c.id === 'car-1') || cars[0];
            if (brabusCar) onSelectCar(brabusCar);
          }}
        />
      </section>

      {/* Featured Collection Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1F1F27] pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block">
              Curated Showroom
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display uppercase mt-1">
              Featured Flagship Allocations
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('inventory')}
            className="text-xs font-semibold uppercase tracking-wider text-[#F3E5AB] hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>View All ({cars.length}) Motorcars</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              currency={currency}
              onSelectCar={onSelectCar}
              onNegotiate={onNegotiate}
            />
          ))}
        </div>
      </section>

      {/* Dynamic Motion Sliding Picture Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
        <div className="border-b border-[#1F1F27] pb-4">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block">
            Dynamic Motion Showcase
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display uppercase mt-1">
            Motorcar Visual Tour &amp; Slide Showcase
          </h2>
          <p className="text-xs text-[#90909E] mt-1">
            Experience our machines in motion as pictures slide seamlessly from one rare allocation to another.
          </p>
        </div>
        <ShowcasePictureSlider
          cars={cars}
          currency={currency}
          onSelectCar={onSelectCar}
          onNegotiate={onNegotiate}
          dealerWhatsApp={dealerWhatsApp}
        />
      </section>

      {/* Visual Feature Rest: VIP Lounge & Bespoke Atelier */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-[#2C2C38] bg-[#0E0E12] grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full">
            <img
              src="/src/assets/images/dealership_vip_lounge_1794144698439.jpg"
              alt="Aurelius VIP Lounge & Consultation Room"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0E0E12]/90 hidden lg:block" />
          </div>

          <div className="lg:col-span-5 p-8 sm:p-12 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block">
              The Private Client Experience
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display uppercase leading-tight">
              An Atelier Built for Nigeria's Elite
            </h3>

            <p className="text-xs sm:text-sm text-[#A8A8B6] leading-relaxed">
              Step into our Victoria Island showroom on Akin Adesola Street or our private Maitama vault in Abuja. Savor single-origin coffee while reviewing authenticated Customs Single Goods Declarations (SGD), ballistic glass cross-sections, and off-market foreign allocations away from public attention.
            </p>

            <ul className="space-y-2 text-xs text-[#C5C5CE]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Dedicated private client advisor assigned to your personal fleet</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Full Customs Duty Form C84 e-verification before payment release</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Trade-in vehicle swaps and direct cash buyouts in Lagos &amp; Abuja</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#ECCF84] text-black text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
              >
                Book Private Viewing in Lagos / Abuja
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial / Latest News Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex items-end justify-between border-b border-[#1F1F27] pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block">
              Automotive Journal
            </span>
            <h2 className="text-2xl font-bold text-white font-display uppercase mt-1">
              The Aurelius Gazette Nigeria
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('blog')}
            className="text-xs font-semibold uppercase tracking-wider text-[#F3E5AB] hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {latestPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="group cursor-pointer bg-[#121217] border border-[#22222D] hover:border-[#D4AF37]/50 rounded-xl overflow-hidden transition-all flex flex-col justify-between"
            >
              <div className="aspect-[16/9] overflow-hidden bg-[#0A0A0C]">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#8A8A96]">
                  <span className="text-[#D4AF37] font-medium uppercase tracking-wider">{post.category}</span>
                  <span>&middot;</span>
                  <span>{post.readTime}</span>
                  <span>&middot;</span>
                  <span>{post.publishedAt}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#F3E5AB] transition-colors leading-snug font-display">
                  {post.title}
                </h3>

                <p className="text-xs text-[#9E9EA8] line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="pt-2 flex items-center gap-1 text-xs text-[#D4AF37] font-semibold">
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom High-Conversion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-12">
        <div className="p-8 sm:p-14 rounded-2xl bg-gradient-to-br from-[#1C1A14] via-[#121216] to-[#0A0A0D] border border-[#D4AF37]/30 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Selling or Swapping a Luxury Car in Nigeria?
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display uppercase max-w-2xl mx-auto">
            Direct Cash Payout or Vehicle Swap
          </h2>

          <p className="text-xs sm:text-sm text-[#B3B3BF] max-w-xl mx-auto leading-relaxed">
            We purchase verified Foreign Used (Tokunbo) and clean Nigerian-used luxury vehicles directly into our collection with same-day bank wire transfer.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('trade-in')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#ECCF84] via-[#D4AF37] to-[#B89225] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
            >
              Get Free Vehicle Valuation &amp; Swap Offer
            </button>
            <a
              href={directWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-semibold text-[#25D366] bg-[#142618] border border-[#25D366]/40 hover:bg-[#1C3622] transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Valuation Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
