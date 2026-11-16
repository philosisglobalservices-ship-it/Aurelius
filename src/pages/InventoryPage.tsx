import React, { useState, useMemo } from 'react';
import { Car } from '../types';
import { CurrencyCode } from '../utils/currency';
import { CarCard } from '../components/CarCard';
import { 
  Search, SlidersHorizontal, RotateCcw, LayoutGrid, 
  ListFilter, MessageSquare, ChevronDown, Check 
} from 'lucide-react';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';

interface InventoryPageProps {
  cars: Car[];
  currency: CurrencyCode;
  onSelectCar: (car: Car) => void;
  onNegotiate: (car: Car) => void;
  dealerWhatsApp: string;
}

export const InventoryPage: React.FC<InventoryPageProps> = ({
  cars,
  currency,
  onSelectCar,
  onNegotiate,
  dealerWhatsApp
}) => {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(1500000000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  // Extract distinct marques & categories
  const brands = useMemo(() => Array.from(new Set(cars.map(c => c.brand))).sort(), [cars]);
  const categories = useMemo(() => Array.from(new Set(cars.map(c => c.category))).sort(), [cars]);

  // Filter & Sort Logic
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      // Search text
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = car.title.toLowerCase().includes(query);
        const matchBrand = car.brand.toLowerCase().includes(query);
        const matchModel = car.model.toLowerCase().includes(query);
        const matchStock = car.stockNumber.toLowerCase().includes(query);
        const matchEngine = car.engine.toLowerCase().includes(query);
        if (!matchTitle && !matchBrand && !matchModel && !matchStock && !matchEngine) {
          return false;
        }
      }

      // Brand
      if (selectedBrand !== 'all' && car.brand !== selectedBrand) return false;

      // Category
      if (selectedCategory !== 'all' && car.category !== selectedCategory) return false;

      // Condition
      if (selectedCondition !== 'all' && car.condition !== selectedCondition) return false;

      // Transmission
      if (selectedTransmission !== 'all' && car.transmission !== selectedTransmission) return false;

      // Max Price
      if (car.price > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      }
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'mileage-asc') return a.mileage - b.mileage;
      if (sortBy === 'power-desc') return b.horsepower - a.horsepower;
      return 0;
    });
  }, [cars, searchQuery, selectedBrand, selectedCategory, selectedCondition, selectedTransmission, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('all');
    setSelectedCategory('all');
    setSelectedCondition('all');
    setSelectedTransmission('all');
    setMaxPrice(3000000);
    setSortBy('featured');
  };

  const isFiltered = searchQuery || selectedBrand !== 'all' || selectedCategory !== 'all' || 
    selectedCondition !== 'all' || selectedTransmission !== 'all' || maxPrice < 3000000;

  const directWhatsAppLink = createGeneralWhatsAppUrl(
    dealerWhatsApp,
    'Hello Aurelius Motors, I am inquiring about custom car sourcing or an unlisted vehicle in your private vault.'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#22222C] pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block">
            The Private Collection
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-display uppercase mt-1">
            Exotic &amp; Luxury Showroom
          </h1>
          <p className="text-xs text-[#90909E] mt-1.5 max-w-xl">
            Browse verified stock with live manufacturer documentation. Click "Negotiate" on any vehicle to propose your private offer directly to the dealer via WhatsApp.
          </p>
        </div>

        {/* WhatsApp Sourcing Quick CTA */}
        <div className="shrink-0 flex items-center gap-3">
          <a
            href={directWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg text-xs font-semibold text-[#25D366] bg-[#142618] border border-[#25D366]/40 hover:bg-[#1A3320] transition-colors flex items-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Request Off-Market Sourcing</span>
          </a>
        </div>
      </div>

      {/* Main Search & Control Bar */}
      <div className="bg-[#121217] border border-[#242430] rounded-xl p-4 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Keyword Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-[#757584]" />
            <input
              type="text"
              placeholder="Search by Marque, Model, Stock #, or V12 / Hybrid engine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#181822] border border-[#2C2C3A] focus:border-[#D4AF37] rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-[#686876] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-[#8A8A96] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Category Selector */}
          <div className="w-full md:w-auto flex items-center gap-2 shrink-0">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-44 bg-[#181822] border border-[#2C2C3A] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Quick Brand Selector */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full md:w-44 bg-[#181822] border border-[#2C2C3A] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="all">All Marques</option>
              {brands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-44 bg-[#181822] border border-[#2C2C3A] focus:border-[#D4AF37] rounded-lg px-3 py-2 text-xs text-[#F3E5AB] font-medium focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="year-desc">Year: Newest First</option>
              <option value="mileage-asc">Lowest Mileage</option>
              <option value="power-desc">Maximum Horsepower</option>
            </select>

            {/* Toggle Full Filters Button */}
            <button
              type="button"
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors shrink-0 ${
                showFiltersPanel || isFiltered
                  ? 'bg-[#292212] border-[#D4AF37] text-[#F3E5AB]'
                  : 'bg-[#181822] border-[#2C2C3A] text-[#9E9EAA] hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Quick Search Suggestions */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 text-xs text-[#8A8A96]">
          <span className="shrink-0 text-[11px] text-[#A0A0B0]">Trending Searches:</span>
          <button
            type="button"
            onClick={() => setSearchQuery('Brabus')}
            className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] transition-all flex items-center gap-1.5 cursor-pointer ${
              searchQuery.toLowerCase().includes('brabus')
                ? 'bg-[#D4AF37] text-black font-semibold'
                : 'bg-[#201B11] text-[#F3E5AB] hover:bg-[#2C2415] border border-[#D4AF37]/40'
            }`}
          >
            <span>🔥 2025 Brabus G63 AMG (4K Video)</span>
          </button>
          <button
            type="button"
            onClick={() => setSearchQuery('Mercedes-Benz')}
            className="shrink-0 px-2.5 py-1 rounded-full text-[11px] bg-[#1C1C26] text-[#B0B0C0] hover:bg-[#252535] border border-[#2D2D3E] cursor-pointer"
          >
            Mercedes-Benz
          </button>
          <button
            type="button"
            onClick={() => setSearchQuery('Armored')}
            className="shrink-0 px-2.5 py-1 rounded-full text-[11px] bg-[#1C1C26] text-[#B0B0C0] hover:bg-[#252535] border border-[#2D2D3E] cursor-pointer"
          >
            Armored B6 / B7
          </button>
          <button
            type="button"
            onClick={() => setSearchQuery('Rolls-Royce')}
            className="shrink-0 px-2.5 py-1 rounded-full text-[11px] bg-[#1C1C26] text-[#B0B0C0] hover:bg-[#252535] border border-[#2D2D3E] cursor-pointer"
          >
            Rolls-Royce
          </button>
        </div>
        {showFiltersPanel && (
          <div className="pt-4 border-t border-[#22222E] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in">
            {/* Condition */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#7E7E8C] mb-1">Vehicle Condition</label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full bg-[#181822] border border-[#2C2C3A] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="all">All Conditions</option>
                <option value="Brand New (Foreign Direct)">Brand New (Foreign Direct)</option>
                <option value="Tokunbo (Foreign Used)">Tokunbo (Foreign Used)</option>
                <option value="Certified Pre-Owned">Certified Pre-Owned</option>
                <option value="Collector Grade">Collector Grade</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#7E7E8C] mb-1">Transmission</label>
              <select
                value={selectedTransmission}
                onChange={(e) => setSelectedTransmission(e.target.value)}
                className="w-full bg-[#181822] border border-[#2C2C3A] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="all">Any Gearbox</option>
                <option value="Automatic">Automatic</option>
                <option value="Dual-Clutch">Dual-Clutch</option>
                <option value="Direct-Drive EV">Direct-Drive EV</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            {/* Price Cap Slider */}
            <div>
              <div className="flex justify-between text-[10px] uppercase tracking-wider text-[#7E7E8C] mb-1">
                <span>Maximum Price</span>
                <span className="text-[#D4AF37] font-mono">
                  {maxPrice >= 1000000000 ? `₦${(maxPrice / 1000000000).toFixed(2)}B` : `₦${(maxPrice / 1000000).toFixed(0)}M`}
                </span>
              </div>
              <input
                type="range"
                min="100000000"
                max="1500000000"
                step="50000000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#D4AF37] h-1.5 bg-[#262635] rounded cursor-pointer mt-2"
              />
            </div>

            {/* Reset */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={resetFilters}
                className="w-full py-2 px-3 rounded-lg bg-[#20202B] hover:bg-[#282835] border border-[#303040] text-xs text-[#B5B5C2] hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          </div>
        )}

        {/* Filter Results Status Strip */}
        <div className="flex items-center justify-between text-xs text-[#8A8A96] pt-1">
          <div>
            Showing <strong className="text-white">{filteredCars.length}</strong> of <strong className="text-white">{cars.length}</strong> vehicles in inventory
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[#D4AF37] hover:underline flex items-center gap-1 text-[11px]"
            >
              <span>Clear active filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid Display */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              currency={currency}
              onSelectCar={onSelectCar}
              onNegotiate={onNegotiate}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-[#101015] border border-[#20202B] rounded-2xl p-8">
          <div className="w-12 h-12 rounded-full bg-[#1C1810] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center mx-auto">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">
            No Matching Vehicles Found
          </h3>
          <p className="text-xs text-[#8A8A96] max-w-md mx-auto">
            We regularly secure confidential off-market allocations not publicly advertised on our web directory. Connect with our acquisitions desk on WhatsApp for private inventory.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 rounded-lg bg-[#242430] hover:bg-[#303040] text-xs text-white transition-colors"
            >
              Reset Search Filters
            </button>
            <a
              href={directWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[#25D366] text-black font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
