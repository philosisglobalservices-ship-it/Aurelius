import React, { useState } from 'react';
import { Car, LeadInquiry } from '../types';
import { CurrencyCode, formatPrice, formatMileage } from '../utils/currency';
import { FinanceCalculator } from './FinanceCalculator';
import { 
  X, MessageSquare, Zap, Flame, Gauge, Calendar, Shield, 
  MapPin, CheckCircle, FileText, Phone, ChevronRight, ChevronLeft, Share2, Play, Video, Sliders 
} from 'lucide-react';
import { getYouTubeEmbedUrl } from '../utils/video';
import { PictureComparisonSlider } from './PictureComparisonSlider';

interface CarDetailModalProps {
  car: Car | null;
  currency: CurrencyCode;
  onClose: () => void;
  onNegotiate: (car: Car) => void;
  onSubmitLead: (lead: Omit<LeadInquiry, 'id' | 'createdAt'>) => void;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  currency,
  onClose,
  onNegotiate,
  onSubmitLead
}) => {
  if (!car) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mediaMode, setMediaMode] = useState<'photos' | 'video' | 'slider'>('photos');
  const [testDriveName, setTestDriveName] = useState('');
  const [testDrivePhone, setTestDrivePhone] = useState('');
  const [testDriveDate, setTestDriveDate] = useState('');
  const [testDriveSubmitted, setTestDriveSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'finance'>('overview');

  const images = car.images.length > 0 ? car.images : ['/src/assets/images/hero_showroom_luxury_1794144698125.jpg'];

  const handleTestDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testDriveName.trim() || !testDrivePhone.trim()) return;

    onSubmitLead({
      type: 'test_drive',
      carId: car.id,
      carTitle: `${car.year} ${car.title}`,
      stockNumber: car.stockNumber,
      customerName: testDriveName.trim(),
      email: 'Via Test Drive Booker',
      phone: testDrivePhone.trim(),
      preferredContact: 'whatsapp',
      preferredDate: testDriveDate || 'Next available weekend',
      message: `Requested VIP private showing / test drive for stock #${car.stockNumber} on ${testDriveDate || 'flexible date'}.`,
      status: 'new',
      dealerNotes: 'Private viewing booked from vehicle detail page.'
    });

    setTestDriveSubmitted(true);
    setTimeout(() => {
      setTestDriveSubmitted(false);
      setTestDriveName('');
      setTestDrivePhone('');
      setTestDriveDate('');
    }, 6000);
  };

  const handleBrochureDownload = () => {
    // Generate simulated luxury specification sheet for Nigeria
    const content = `AURELIUS MOTORS NIGERIA - OFFICIAL VEHICLE SPECIFICATION & CUSTOMS SHEET\n` +
      `Vehicle: ${car.year} ${car.title}\n` +
      `Stock Number: ${car.stockNumber}\n` +
      `VIN / Chassis: ${car.specifications.vin}\n` +
      `Price: ${formatPrice(car.price, 'NGN')}\n` +
      `Customs Status: ${car.specifications.customsDuty || '100% Fully Paid (NCS Port C84 Attached)'}\n` +
      `Condition: ${car.condition}\n` +
      `Engine: ${car.engine}\n` +
      `Power: ${car.horsepower} BHP\n` +
      `0-60 MPH: ${car.acceleration0to60}s | Top Speed: ${car.topSpeed} km/h\n` +
      `Exterior: ${car.exteriorColor}\n` +
      `Interior: ${car.interiorColor}\n` +
      `Showroom Vault: ${car.specifications.location}\n` +
      `Warranty: ${car.specifications.warranty}\n\n` +
      `Confidential Dealer Spec Sheet - Aurelius Motors Nigeria (Victoria Island Lagos & Maitama Abuja)`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aurelius_NG_SpecSheet_${car.stockNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-[#0F0F13] border border-[#272733] rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#14141B] border-b border-[#22222E] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#252014] text-[#D4AF37] border border-[#D4AF37]/30">
              {car.category}
            </span>
            <span className="text-xs text-[#8A8A96] font-mono">Stock #{car.stockNumber}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBrochureDownload}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1C1C24] hover:bg-[#252530] text-[#C5C5D0] text-xs font-medium border border-[#2F2F3D] transition-colors"
              title="Download spec sheet"
            >
              <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Spec Sheet</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#8A8A96] hover:text-white hover:bg-[#20202B] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 p-6 space-y-8">
          {/* Main Visuals & Purchase Lockup */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Gallery Column (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              {/* Media Mode switch if videoUrl or multiple images exist */}
              <div className="flex items-center gap-1.5 p-1 bg-[#14141B] rounded-lg border border-[#22222E] text-xs">
                <button
                  type="button"
                  onClick={() => setMediaMode('photos')}
                  className={`flex-1 py-1.5 px-2.5 rounded-md font-medium transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    mediaMode === 'photos'
                      ? 'bg-[#20202B] text-white shadow-sm'
                      : 'text-[#8A8A96] hover:text-white'
                  }`}
                >
                  <span>Photos ({images.length})</span>
                </button>

                {images.length >= 2 && (
                  <button
                    type="button"
                    onClick={() => setMediaMode('slider')}
                    className={`flex-1 py-1.5 px-2.5 rounded-md font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      mediaMode === 'slider'
                        ? 'bg-[#D4AF37] text-black font-semibold shadow-md'
                        : 'text-[#D4AF37] hover:bg-[#D4AF37]/10'
                    }`}
                    title="Slide between Exterior and Interior pictures"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>2-Picture Slider</span>
                  </button>
                )}

                {car.videoUrl && (
                  <button
                    type="button"
                    onClick={() => setMediaMode('video')}
                    className={`flex-1 py-1.5 px-2.5 rounded-md font-medium transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      mediaMode === 'video'
                        ? 'bg-[#D4AF37] text-black font-semibold shadow-md'
                        : 'text-[#D4AF37] hover:bg-[#D4AF37]/10'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>4K Video</span>
                  </button>
                )}
              </div>

              {/* Main Media Player / Photo / Comparison Slider */}
              {mediaMode === 'video' && car.videoUrl ? (
                <div className="relative aspect-[16/10] bg-[#08080A] rounded-xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl">
                  <iframe
                    src={getYouTubeEmbedUrl(car.videoUrl) || undefined}
                    title={`${car.year} ${car.title} 4K Video Tour`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded bg-black/85 text-[#D4AF37] border border-[#D4AF37]/40 backdrop-blur-sm flex items-center gap-1.5">
                      <Play className="w-3 h-3 fill-current" />
                      Official 4K Brabus Walkaround
                    </span>
                  </div>
                </div>
              ) : mediaMode === 'slider' && images.length >= 2 ? (
                <div className="rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow-xl bg-[#09090C]">
                  <PictureComparisonSlider
                    comparisons={[
                      {
                        id: car.id,
                        title: `${car.year} ${car.title}`,
                        subtitle: 'Drag slider or press auto-slide to reveal between exterior and interior pictures',
                        badge: `Stock #${car.stockNumber} &middot; ${car.condition}`,
                        imageA: {
                          url: images[0],
                          label: 'Exterior Spec',
                          tagline: `${car.exteriorColor} &middot; ${car.engine}`
                        },
                        imageB: {
                          url: images[1],
                          label: 'Interior Cockpit',
                          tagline: `${car.interiorColor}`
                        }
                      }
                    ]}
                  />
                </div>
              ) : (
                <div className="relative aspect-[16/10] bg-[#08080A] rounded-xl overflow-hidden border border-[#22222C] group">
                  <img
                    src={images[activeImageIndex]}
                    alt={car.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />

                  {/* Previous / Next slide buttons on the picture */}
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
                        }}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white hover:text-[#D4AF37] border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer shadow-lg"
                        title="Slide to previous picture"
                        aria-label="Previous picture"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex((prev) => (prev + 1) % images.length);
                        }}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white hover:text-[#D4AF37] border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer shadow-lg"
                        title="Slide to next picture"
                        aria-label="Next picture"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Photo position counter */}
                      <div className="absolute top-3 right-3 pointer-events-none">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/75 text-white/90 border border-white/10 backdrop-blur-sm">
                          {activeImageIndex + 1} / {images.length}
                        </span>
                      </div>
                    </>
                  )}

                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded bg-black/75 text-[#F3E5AB] backdrop-blur-sm">
                      {car.condition}
                    </span>
                  </div>

                  {car.videoUrl && (
                    <button
                      type="button"
                      onClick={() => setMediaMode('video')}
                      className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/85 hover:bg-black text-[#D4AF37] border border-[#D4AF37]/50 backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#D4AF37]" />
                      <span>Watch 4K Video</span>
                    </button>
                  )}
                </div>
              )}

              {/* Thumbnails row (including Video trigger and 2-Picture Slider trigger) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.length >= 2 && (
                  <button
                    type="button"
                    onClick={() => setMediaMode('slider')}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all flex flex-col items-center justify-center bg-[#181822] cursor-pointer ${
                      mediaMode === 'slider' ? 'border-[#D4AF37] scale-102 ring-2 ring-[#D4AF37]/30' : 'border-[#2D2D3B] hover:border-[#D4AF37]/50'
                    }`}
                    title="Interactive 2-Picture Slider"
                  >
                    <Sliders className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-[8px] font-bold text-[#D4AF37] mt-0.5 uppercase tracking-wider">2-Pic Slider</span>
                  </button>
                )}
                {car.videoUrl && (
                  <button
                    type="button"
                    onClick={() => setMediaMode('video')}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all flex flex-col items-center justify-center bg-[#181822] cursor-pointer ${
                      mediaMode === 'video' ? 'border-[#D4AF37] scale-102 ring-2 ring-[#D4AF37]/30' : 'border-[#2D2D3B] hover:border-[#D4AF37]/50'
                    }`}
                    title="Watch 4K Video Tour"
                  >
                    <Play className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                    <span className="text-[9px] font-bold text-[#D4AF37] mt-0.5 uppercase tracking-wider">4K Video</span>
                  </button>
                )}
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveImageIndex(idx);
                      setMediaMode('photos');
                    }}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      mediaMode === 'photos' && activeImageIndex === idx ? 'border-[#D4AF37] scale-102' : 'border-[#22222E] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* 3 Metrics Callouts */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-[#14141B] rounded-xl border border-[#22222D]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#241E11] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#7D7D8B] block">Brake HP</span>
                    <span className="text-sm font-bold text-white tabular-nums">{car.horsepower} BHP</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#241E11] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#7D7D8B] block">0-60 MPH</span>
                    <span className="text-sm font-bold text-white tabular-nums">{car.acceleration0to60}s</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#241E11] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#7D7D8B] block">Top Speed</span>
                    <span className="text-sm font-bold text-white tabular-nums">{car.topSpeed} MPH</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#9A9AA6] font-medium block">
                  {car.brand} &middot; {car.year}
                </span>
                <h2 className="text-2xl font-bold text-white font-display mt-1 leading-snug">
                  {car.title}
                </h2>
                <p className="text-xs text-[#8A8A96] mt-1">
                  {car.engine} &middot; {car.transmission}
                </p>
              </div>

              {/* Price Block */}
              <div className="p-4 bg-[#14141A] rounded-xl border border-[#272733] space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#7E7E8C]">Showroom Listed Price</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-[#F3E5AB] font-display">
                    {formatPrice(car.price, currency)}
                  </span>
                  {car.originalPrice && (
                    <span className="text-sm text-[#737380] line-through tabular-nums">
                      {formatPrice(car.originalPrice, currency)}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-[#A0A0AC] flex items-center gap-2 pt-1 flex-wrap">
                  <span>Mileage: <strong>{formatMileage(car.mileage)}</strong></span>
                  <span>&middot;</span>
                  <span>Customs: <strong className="text-[#25D366]">100% NCS Cleared</strong></span>
                  {car.specifications.armoredLevel && (
                    <>
                      <span>&middot;</span>
                      <span className="text-[#D4AF37] font-semibold">{car.specifications.armoredLevel}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Primary Negotiation CTA Suite */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => onNegotiate(car)}
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#25D366] to-[#1EBA57] hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>Negotiate Price On WhatsApp</span>
                </button>

                {car.videoUrl && (
                  <button
                    type="button"
                    onClick={() => setMediaMode('video')}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-[#D4AF37] bg-[#1C180E] border border-[#D4AF37]/50 hover:bg-[#D4AF37]/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#D4AF37]/5"
                  >
                    <Play className="w-4 h-4 fill-[#D4AF37]" />
                    <span>Watch 4K Video Walkaround</span>
                  </button>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('finance')}
                    className="py-2.5 px-3 rounded-lg text-xs font-medium bg-[#1B1B22] border border-[#2D2D3A] hover:border-[#D4AF37] text-white transition-colors text-center cursor-pointer"
                  >
                    Finance Calculator
                  </button>
                  <button
                    type="button"
                    onClick={handleBrochureDownload}
                    className="py-2.5 px-3 rounded-lg text-xs font-medium bg-[#1B1B22] border border-[#2D2D3A] hover:border-[#D4AF37] text-white transition-colors text-center cursor-pointer"
                  >
                    Export Spec Sheet
                  </button>
                </div>
              </div>

              {/* Quick VIP Test Drive Drawer */}
              <div className="p-4 bg-[#14141B] border border-[#22222E] rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>Schedule Private Viewing / Test Drive</span>
                </div>

                {testDriveSubmitted ? (
                  <div className="p-3 bg-[#132B1A] border border-[#25D366]/40 rounded-lg text-xs text-[#25D366] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>Viewing request logged with private concierge!</span>
                  </div>
                ) : (
                  <form onSubmit={handleTestDriveSubmit} className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={testDriveName}
                        onChange={(e) => setTestDriveName(e.target.value)}
                        required
                        className="w-full bg-[#1A1A22] border border-[#282835] focus:border-[#D4AF37] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                      />
                      <input
                        type="tel"
                        placeholder="WhatsApp / Phone"
                        value={testDrivePhone}
                        onChange={(e) => setTestDrivePhone(e.target.value)}
                        required
                        className="w-full bg-[#1A1A22] border border-[#282835] focus:border-[#D4AF37] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <input
                      type="date"
                      value={testDriveDate}
                      onChange={(e) => setTestDriveDate(e.target.value)}
                      className="w-full bg-[#1A1A22] border border-[#282835] focus:border-[#D4AF37] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-2 rounded bg-[#D4AF37] text-black font-semibold text-xs hover:bg-[#ECCF84] transition-colors"
                    >
                      Confirm Private Appointment
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-[#22222C] flex items-center gap-6 text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'overview' ? 'text-[#D4AF37] font-semibold' : 'text-[#8A8A96] hover:text-white'
              }`}
            >
              Overview &amp; Features
              {activeTab === 'overview' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'specs' ? 'text-[#D4AF37] font-semibold' : 'text-[#8A8A96] hover:text-white'
              }`}
            >
              Technical Specification Sheet
              {activeTab === 'specs' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('finance')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'finance' ? 'text-[#D4AF37] font-semibold' : 'text-[#8A8A96] hover:text-white'
              }`}
            >
              Finance &amp; Lease Estimator
              {activeTab === 'finance' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]" />
              )}
            </button>
          </div>

          {/* Tab Contents */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                  Curatorial Statement
                </h4>
                <p className="text-sm text-[#C5C5D0] leading-relaxed">
                  {car.description}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                  Factory Options &amp; Bespoke Highlights
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {car.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#14141B] border border-[#22222D] text-xs text-[#E0E0E6]">
                      <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 p-4 bg-[#14141B] rounded-xl border border-[#22222E]">
                <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold pb-2 border-b border-[#22222E]">
                  Powertrain &amp; Dynamics
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#1C1C24]">
                    <span className="text-[#888896]">Engine Configuration</span>
                    <span className="text-white font-medium">{car.engine}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1C1C24]">
                    <span className="text-[#888896]">Horsepower</span>
                    <span className="text-white font-medium">{car.horsepower} BHP</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1C1C24]">
                    <span className="text-[#888896]">Acceleration (0-60 MPH)</span>
                    <span className="text-white font-medium">{car.acceleration0to60} Seconds</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1C1C24]">
                    <span className="text-[#888896]">Maximum Speed</span>
                    <span className="text-white font-medium">{car.topSpeed} MPH</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1C1C24]">
                    <span className="text-[#888896]">Transmission</span>
                    <span className="text-white font-medium">{car.transmission}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#888896]">Drivetrain</span>
                    <span className="text-white font-medium">{car.specifications.drivetrain}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-4 bg-[#14141B] rounded-xl border border-[#22222E]">
                <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold pb-2 border-b border-[#22222E]">
                  Chassis &amp; Provenance
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#1C1C24]">
                    <span className="text-[#888896]">VIN Number</span>
                    <span className="text-[#F3E5AB] font-mono">{car.specifications.vin}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1C1C24]">
                    <span className="text-[#888896]">Exterior Paint</span>
                    <span className="text-white font-medium">{car.exteriorColor}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1C1C24]">
                    <span className="text-[#888896]">Interior Trim</span>
                    <span className="text-white font-medium">{car.interiorColor}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1C1C24]">
                    <span className="text-[#888896]">Mileage</span>
                    <span className="text-white font-medium">{formatMileage(car.mileage)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1C1C24]">
                    <span className="text-[#888896]">Warranty Coverage</span>
                    <span className="text-white font-medium">{car.specifications.warranty}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#888896]">Vault Location</span>
                    <span className="text-white font-medium">{car.specifications.location}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'finance' && (
            <FinanceCalculator
              vehiclePrice={car.price}
              currency={currency}
              onApplyForFinancing={(terms) => {
                onSubmitLead({
                  type: 'quote',
                  carId: car.id,
                  carTitle: `${car.year} ${car.title}`,
                  stockNumber: car.stockNumber,
                  customerName: 'Financing Inquirer',
                  email: 'Pending Contact',
                  phone: 'Pending Contact',
                  preferredContact: 'whatsapp',
                  message: `Pre-qualification requested: Down payment of $${terms.downPayment.toLocaleString()} for ${terms.months} months (~$${terms.monthlyPayment.toLocaleString()}/mo).`,
                  status: 'new'
                });
                onNegotiate(car);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
