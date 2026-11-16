import React, { useState, useMemo } from 'react';
import { 
  Car, BlogPost, LeadInquiry, DealershipSettings, 
  CarCategory, CarCondition, CarTransmission 
} from '../types';
import { CurrencyCode, formatPrice, formatMileage } from '../utils/currency';
import { sanitizeWhatsAppNumber } from '../utils/whatsapp';
import { 
  ShieldCheck, Lock, LogOut, MessageSquare, Mail, Phone, 
  Search, Filter, Plus, Edit, Trash2, CheckCircle2, 
  AlertCircle, Download, FileText, Image as ImageIcon, 
  Globe, Eye, Sparkles, Settings, ArrowUpRight, DollarSign, 
  Calendar, Check, Bold, Italic, Heading, Quote, List, ExternalLink 
} from 'lucide-react';

interface AdminPageProps {
  cars: Car[];
  blogPosts: BlogPost[];
  leads: LeadInquiry[];
  settings: DealershipSettings;
  currency: CurrencyCode;
  onUpdateCars: (cars: Car[]) => void;
  onUpdateBlogPosts: (posts: BlogPost[]) => void;
  onUpdateLeads: (leads: LeadInquiry[]) => void;
  onUpdateSettings: (settings: DealershipSettings) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  cars,
  blogPosts,
  leads,
  settings,
  currency,
  onUpdateCars,
  onUpdateBlogPosts,
  onUpdateLeads,
  onUpdateSettings
}) => {
  // Auth state
  const [tokenInput, setTokenInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('aurelius_admin_auth') === 'true';
  });
  const [authError, setAuthError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'leads' | 'inventory' | 'blog' | 'settings'>('leads');

  // Leads Filter & Search
  const [leadTypeFilter, setLeadTypeFilter] = useState<string>('all');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [leadSearchQuery, setLeadSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<LeadInquiry | null>(null);

  // Car Edit Modal State
  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Partial<Car> | null>(null);

  // Blog Editor State (WordPress Style)
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [blogPreviewMode, setBlogPreviewMode] = useState(false);

  // Dealership Settings Temp State
  const [tempSettings, setTempSettings] = useState<DealershipSettings>(settings);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Auth Submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim() === settings.adminToken || tokenInput.trim() === 'AURELIUS-VIP-2026') {
      setIsAuthenticated(true);
      localStorage.setItem('aurelius_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid Security Token. Default token is AURELIUS-VIP-2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('aurelius_admin_auth');
    setTokenInput('');
  };

  // --- LEADS MANAGEMENT ---
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      if (leadTypeFilter !== 'all' && lead.type !== leadTypeFilter) return false;
      if (leadStatusFilter !== 'all' && lead.status !== leadStatusFilter) return false;
      if (leadSearchQuery.trim()) {
        const q = leadSearchQuery.toLowerCase();
        const mName = lead.customerName.toLowerCase().includes(q);
        const mPhone = lead.phone.toLowerCase().includes(q);
        const mEmail = lead.email.toLowerCase().includes(q);
        const mCar = lead.carTitle?.toLowerCase().includes(q);
        if (!mName && !mPhone && !mEmail && !mCar) return false;
      }
      return true;
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [leads, leadTypeFilter, leadStatusFilter, leadSearchQuery]);

  const updateLeadStatus = (leadId: string, status: LeadInquiry['status']) => {
    const updated = leads.map(l => l.id === leadId ? { ...l, status } : l);
    onUpdateLeads(updated);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status });
    }
  };

  const updateLeadNotes = (leadId: string, dealerNotes: string) => {
    const updated = leads.map(l => l.id === leadId ? { ...l, dealerNotes } : l);
    onUpdateLeads(updated);
  };

  const exportLeadsToCSV = () => {
    const headers = ['ID', 'Type', 'Status', 'Date', 'Customer Name', 'Phone', 'Email', 'Preferred Contact', 'Vehicle', 'Stock #', 'Offered Price', 'Listed Price', 'Message', 'Dealer Notes'];
    const rows = leads.map(l => [
      l.id,
      l.type,
      l.status,
      l.createdAt,
      `"${l.customerName.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      l.preferredContact,
      `"${(l.carTitle || '').replace(/"/g, '""')}"`,
      l.stockNumber || '',
      l.offeredPrice || '',
      l.listedPrice || '',
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${(l.dealerNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Aurelius_Leads_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- CAR INVENTORY CRUD ---
  const handleOpenAddCar = () => {
    setEditingCar({
      id: `car-${Date.now()}`,
      stockNumber: `AUR-NG-${Math.floor(100 + Math.random() * 900)}`,
      title: '',
      brand: 'Mercedes-Benz',
      model: '',
      year: 2025,
      category: 'Super SUV',
      condition: 'Brand New (Foreign Direct)',
      price: 350000000, // ₦350 Million
      mileage: 50,
      exteriorColor: 'Obsidian Black Metallic',
      interiorColor: 'Black & Gold Exclusive Leather',
      transmission: 'Automatic',
      engine: 'Twin-Turbo V8',
      horsepower: 650,
      acceleration0to60: 3.8,
      topSpeed: 250,
      fuelType: 'Petrol',
      images: ['/src/assets/images/car_luxury_suv_black_1794144700613.jpg'],
      featured: false,
      status: 'Available',
      description: 'Exceptional luxury specification with 100% genuine Nigerian Customs Duty fully cleared at Lagos Port.',
      keyFeatures: ['100% Genuine Customs Duty Cleared (Verified SGD)', 'High-Capacity Tropical Cooling Pack', 'Bespoke Executive Diamond Interior'],
      specifications: {
        vin: `WDB963${Math.floor(100000000 + Math.random() * 900000000)}N`,
        drivetrain: 'All-Wheel Drive',
        bodyStyle: 'Luxury SUV',
        doors: 5,
        warranty: '2-Year Aurelius Complete Warranty',
        location: 'Victoria Island Flagship Showroom, Lagos',
        customsDuty: '100% Fully Paid (NCS Tin Can Island C84 Attached)'
      }
    });
    setIsCarModalOpen(true);
  };

  const handleSaveCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCar || !editingCar.title || !editingCar.brand) return;

    const carToSave = editingCar as Car;
    const exists = cars.some(c => c.id === carToSave.id);

    let updatedCars: Car[];
    if (exists) {
      updatedCars = cars.map(c => c.id === carToSave.id ? carToSave : c);
    } else {
      updatedCars = [carToSave, ...cars];
    }

    onUpdateCars(updatedCars);
    setIsCarModalOpen(false);
    setEditingCar(null);
  };

  const handleDeleteCar = (id: string) => {
    onUpdateCars(cars.filter(c => c.id !== id));
  };

  // --- BLOG CMS CRUD (WordPress Style) ---
  const handleOpenAddPost = () => {
    setEditingPost({
      id: `post-${Date.now()}`,
      slug: 'new-article-title',
      title: '',
      excerpt: '',
      content: '<p>Write your bespoke editorial content here...</p>',
      featuredImage: '/src/assets/images/hero_showroom_luxury_1794144698125.jpg',
      category: 'Market Insights',
      author: {
        name: 'Julian Sterling',
        role: 'Head of Acquisitions'
      },
      readTime: '4 min read',
      publishedAt: new Date().toISOString().slice(0, 10),
      status: 'Published',
      tags: ['Luxury', 'Collector'],
      seo: {
        metaTitle: '',
        metaDescription: '',
        focusKeyword: '',
        canonicalUrl: 'https://aureliusmotors.com/blog/new-article-title',
        noIndex: false
      }
    });
    setBlogPreviewMode(false);
    setIsBlogModalOpen(true);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !editingPost.title) return;

    // Auto-generate slug if empty
    const slug = editingPost.slug || editingPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    // Auto sync SEO title if empty
    const metaTitle = editingPost.seo?.metaTitle || `${editingPost.title} | Aurelius Motors`;
    const metaDescription = editingPost.seo?.metaDescription || editingPost.excerpt || '';

    const postToSave: BlogPost = {
      ...(editingPost as BlogPost),
      slug,
      seo: {
        ...(editingPost.seo || { focusKeyword: '', canonicalUrl: '', noIndex: false }),
        metaTitle,
        metaDescription,
        focusKeyword: editingPost.seo?.focusKeyword || '',
        canonicalUrl: `https://aureliusmotors.com/blog/${slug}`,
        noIndex: editingPost.seo?.noIndex || false
      }
    };

    const exists = blogPosts.some(p => p.id === postToSave.id);
    let updatedPosts: BlogPost[];
    if (exists) {
      updatedPosts = blogPosts.map(p => p.id === postToSave.id ? postToSave : p);
    } else {
      updatedPosts = [postToSave, ...blogPosts];
    }

    onUpdateBlogPosts(updatedPosts);
    setIsBlogModalOpen(false);
    setEditingPost(null);
  };

  const handleDeletePost = (id: string) => {
    onUpdateBlogPosts(blogPosts.filter(p => p.id !== id));
  };

  // Format Helper for WordPress Content Toolbar
  const insertContentMarkup = (prefix: string, suffix: string = '') => {
    if (!editingPost) return;
    const current = editingPost.content || '';
    setEditingPost({
      ...editingPost,
      content: `${current}\n${prefix}${suffix}`
    });
  };

  // --- SETTINGS SAVE ---
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(tempSettings);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 4000);
  };

  // If NOT authenticated, show executive Token Protection Wall
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-[#121217] border border-[#D4AF37]/40 rounded-2xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#241F12] border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto shadow-lg shadow-[#D4AF37]/10">
              <Lock className="w-6 h-6" />
            </div>

            <h2 className="text-2xl font-bold text-white font-display uppercase tracking-wider">
              Dealer Management Terminal
            </h2>
            <p className="text-xs text-[#8E8E9C] leading-relaxed">
              Token-protected administrative suite for buyer inquiries, price negotiations, vehicle stock, and WordPress blog publishing.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-1.5">
                Security Access Token
              </label>
              <input
                type="password"
                placeholder="Enter admin token..."
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                required
                className="w-full bg-[#1A1A22] border border-[#2F2F3D] focus:border-[#D4AF37] rounded-lg px-3 py-2.5 text-sm text-white font-mono focus:outline-none"
              />
              <p className="text-[11px] text-[#787884] mt-1.5 flex items-center gap-1">
                <span>Default Demo Token:</span>
                <button
                  type="button"
                  onClick={() => setTokenInput('AURELIUS-VIP-2026')}
                  className="text-[#D4AF37] hover:underline font-mono"
                >
                  AURELIUS-VIP-2026
                </button>
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-red-950/50 border border-red-700/50 rounded-lg text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#ECCF84] via-[#D4AF37] to-[#B89225] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
            >
              Authenticate Terminal
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-[#636370]">
            Aurelius Motors Executive Operating System v4.2
          </div>
        </div>
      </div>
    );
  }

  // Calculate quick KPI statistics
  const newLeads = leads.filter(l => l.status === 'new').length;
  const negotiationCount = leads.filter(l => l.type === 'negotiation').length;
  const quotesCount = leads.filter(l => l.type === 'quote').length;
  const totalOfferedVolume = leads
    .filter(l => l.offeredPrice)
    .reduce((sum, l) => sum + (l.offeredPrice || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Admin Top Bar */}
      <div className="bg-[#121217] border border-[#242430] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#241F12] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white font-display uppercase tracking-wider">
                Dealer Executive Suite
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#182B1B] text-[#25D366] border border-[#25D366]/30">
                Secure Session
              </span>
            </div>
            <p className="text-xs text-[#8A8A96]">
              Logged in &middot; Real-time inquiries from all website contact, quote &amp; WhatsApp forms
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={exportLeadsToCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181822] hover:bg-[#22222E] border border-[#2F2F3D] text-xs text-[#D4AF37] transition-colors"
            title="Download CSV of all inquiries"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F1717] hover:bg-[#2B1F1F] border border-red-900/40 text-xs text-red-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Terminal</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#121217] border border-[#242430] space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-[#8A8A96] block">Total Inquiries</span>
          <div className="text-2xl font-bold text-white font-display">{leads.length}</div>
          <span className="text-[10px] text-[#25D366]">{newLeads} awaiting review</span>
        </div>

        <div className="p-4 rounded-xl bg-[#121217] border border-[#242430] space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-[#8A8A96] block">WhatsApp Negotiations</span>
          <div className="text-2xl font-bold text-[#F3E5AB] font-display">{negotiationCount}</div>
          <span className="text-[10px] text-[#D4AF37]">Active buyer offers</span>
        </div>

        <div className="p-4 rounded-xl bg-[#121217] border border-[#242430] space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-[#8A8A96] block">Vehicles In Stock</span>
          <div className="text-2xl font-bold text-white font-display">{cars.length}</div>
          <span className="text-[10px] text-[#A0A0AD]">{cars.filter(c => c.status === 'Available').length} available</span>
        </div>

        <div className="p-4 rounded-xl bg-[#121217] border border-[#242430] space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-[#8A8A96] block">Negotiated Pipeline Value</span>
          <div className="text-2xl font-bold text-[#25D366] font-display">
            {formatPrice(totalOfferedVolume, currency)}
          </div>
          <span className="text-[10px] text-[#868694]">Cumulative cash offers</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-[#242430] flex items-center gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setActiveTab('leads')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-t-lg text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'leads'
              ? 'border-[#D4AF37] bg-[#16161D] text-[#F3E5AB]'
              : 'border-transparent text-[#8A8A96] hover:text-white hover:bg-[#14141A]'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-[#25D366]" />
          <span>Inquiries &amp; Leads Hub ({leads.length})</span>
          {newLeads > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-black text-[10px] font-bold flex items-center justify-center">
              {newLeads}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-t-lg text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'inventory'
              ? 'border-[#D4AF37] bg-[#16161D] text-[#F3E5AB]'
              : 'border-transparent text-[#8A8A96] hover:text-white hover:bg-[#14141A]'
          }`}
        >
          <FileText className="w-4 h-4 text-[#D4AF37]" />
          <span>Inventory Manager ({cars.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('blog')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-t-lg text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'blog'
              ? 'border-[#D4AF37] bg-[#16161D] text-[#F3E5AB]'
              : 'border-transparent text-[#8A8A96] hover:text-white hover:bg-[#14141A]'
          }`}
        >
          <Globe className="w-4 h-4 text-[#D4AF37]" />
          <span>WordPress Blog CMS ({blogPosts.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-t-lg text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'settings'
              ? 'border-[#D4AF37] bg-[#16161D] text-[#F3E5AB]'
              : 'border-transparent text-[#8A8A96] hover:text-white hover:bg-[#14141A]'
          }`}
        >
          <Settings className="w-4 h-4 text-[#D4AF37]" />
          <span>Dealership Settings</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: CENTRAL LEADS & INQUIRIES INBOX                        */}
      {/* ============================================================ */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-[#121217] border border-[#242430] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-72">
              <Search className="w-3.5 h-3.5 text-[#737380] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search buyer name, car, phone..."
                value={leadSearchQuery}
                onChange={(e) => setLeadSearchQuery(e.target.value)}
                className="w-full bg-[#181822] border border-[#2A2A38] focus:border-[#D4AF37] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#686874] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
              <select
                value={leadTypeFilter}
                onChange={(e) => setLeadTypeFilter(e.target.value)}
                className="bg-[#181822] border border-[#2A2A38] focus:border-[#D4AF37] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="all">All Channels</option>
                <option value="negotiation">WhatsApp Price Offers</option>
                <option value="test_drive">Test Drives / Viewings</option>
                <option value="quote">Quotes</option>
                <option value="contact">Contact Messages</option>
                <option value="trade_in">Trade-In Appraisals</option>
                <option value="newsletter">Newsletters</option>
              </select>

              <select
                value={leadStatusFilter}
                onChange={(e) => setLeadStatusFilter(e.target.value)}
                className="bg-[#181822] border border-[#2A2A38] focus:border-[#D4AF37] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="negotiating">Negotiating</option>
                <option value="closed">Closed / Won</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Inquiries Table / Cards */}
          <div className="bg-[#121217] border border-[#242430] rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#181822] border-b border-[#242432] text-[#868694] uppercase tracking-wider font-semibold text-[10px]">
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Vehicle / Subject</th>
                    <th className="py-3 px-4">Offered / Terms</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Instant Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1D1D26]">
                  {filteredLeads.map((lead) => {
                    const cleanPhone = sanitizeWhatsAppNumber(lead.phone);
                    const waReplyMsg = encodeURIComponent(
                      `Hello ${lead.customerName}, this is the Aurelius Motors Dealer Desk following up regarding your ${lead.type} inquiry on ${lead.carTitle || 'our exotic showroom'}.`
                    );
                    const waReplyUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${waReplyMsg}`;

                    return (
                      <tr key={lead.id} className="hover:bg-[#16161F] transition-colors">
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            lead.type === 'negotiation'
                              ? 'bg-[#142A1A] text-[#25D366] border border-[#25D366]/40'
                              : lead.type === 'test_drive'
                              ? 'bg-[#292212] text-[#F3E5AB] border border-[#D4AF37]/40'
                              : lead.type === 'trade_in'
                              ? 'bg-[#20182E] text-[#D8B4FE] border border-[#A855F7]/30'
                              : 'bg-[#1A1A24] text-[#A6A6B8] border border-[#2C2C3A]'
                          }`}>
                            {lead.type.replace('_', ' ')}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-semibold text-white">{lead.customerName}</div>
                          <div className="text-[11px] text-[#7A7A88] flex items-center gap-2">
                            <span>{lead.phone}</span>
                            {lead.email && <span>&middot; {lead.email}</span>}
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          {lead.carTitle ? (
                            <div>
                              <span className="font-medium text-[#E5E5E8]">{lead.carTitle}</span>
                              {lead.stockNumber && (
                                <span className="block font-mono text-[10px] text-[#70707D]">Stock #{lead.stockNumber}</span>
                              )}
                            </div>
                          ) : lead.tradeInDetails ? (
                            <span className="text-[#D8B4FE]">
                              Trade-in: {lead.tradeInDetails.year} {lead.tradeInDetails.make} {lead.tradeInDetails.model}
                            </span>
                          ) : (
                            <span className="text-[#868694] truncate max-w-[200px] block">{lead.message}</span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          {lead.offeredPrice ? (
                            <div>
                              <span className="font-bold text-[#25D366] font-display">
                                {formatPrice(lead.offeredPrice, currency)}
                              </span>
                              {lead.listedPrice && (
                                <span className="text-[10px] text-[#767684] block">
                                  Listed: {formatPrice(lead.listedPrice, currency)}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-[#6D6D7A]">—</span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                            className={`text-[11px] font-semibold rounded px-2 py-1 bg-[#1A1A22] border ${
                              lead.status === 'new'
                                ? 'text-[#D4AF37] border-[#D4AF37]/50'
                                : lead.status === 'negotiating'
                                ? 'text-[#25D366] border-[#25D366]/40'
                                : lead.status === 'closed'
                                ? 'text-[#93C5FD] border-blue-500/30'
                                : 'text-[#8A8A96] border-[#2D2D3A]'
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="negotiating">Negotiating</option>
                            <option value="closed">Closed / Won</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>

                        <td className="py-3 px-4 text-[#7A7A88] text-[11px] whitespace-nowrap">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* WhatsApp Direct Reply Button */}
                            <a
                              href={waReplyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-[#142A1A] hover:bg-[#1E3E26] text-[#25D366] border border-[#25D366]/30 transition-colors"
                              title="Direct WhatsApp reply"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>

                            {/* Email Reply */}
                            {lead.email && lead.email.includes('@') && (
                              <a
                                href={`mailto:${lead.email}?subject=Aurelius Motors Inquiry Follow-up`}
                                className="p-1.5 rounded-lg bg-[#1A1A24] hover:bg-[#252533] text-[#A6A6B8] border border-[#2E2E3E] transition-colors"
                                title="Reply via Email"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                            )}

                            {/* Open Details Drawer */}
                            <button
                              type="button"
                              onClick={() => setSelectedLead(lead)}
                              className="px-2 py-1 rounded bg-[#1F1F2A] hover:bg-[#2C2C3B] text-[11px] text-white border border-[#2F2F40] transition-colors"
                            >
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredLeads.length === 0 && (
              <div className="py-12 text-center text-xs text-[#7A7A88]">
                No buyer inquiries matching filter criteria.
              </div>
            )}
          </div>

          {/* Lead Details Drawer / Modal */}
          {selectedLead && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedLead(null)}
            >
              <div 
                className="max-w-lg w-full bg-[#121217] border border-[#2C2C3A] rounded-2xl p-6 space-y-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-[#22222E] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-bold text-[#D4AF37]">
                      Inquiry #{selectedLead.id}
                    </span>
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-[#1C1C24] text-[#A0A0AD]">
                      {selectedLead.type}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedLead(null)}
                    className="text-[#888896] hover:text-white"
                  >
                    &times;
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[#7A7A88] block text-[10px] uppercase">Client Information</span>
                    <div className="font-bold text-white text-sm">{selectedLead.customerName}</div>
                    <div className="text-[#A0A0AE]">{selectedLead.phone} &middot; {selectedLead.email}</div>
                  </div>

                  {selectedLead.carTitle && (
                    <div className="p-3 bg-[#181822] rounded-lg border border-[#262635]">
                      <span className="text-[#7A7A88] block text-[10px] uppercase">Vehicle Target</span>
                      <div className="font-semibold text-white">{selectedLead.carTitle}</div>
                      <div className="text-[#D4AF37] mt-1 flex justify-between">
                        {selectedLead.offeredPrice && <span>Offered: {formatPrice(selectedLead.offeredPrice, currency)}</span>}
                        {selectedLead.listedPrice && <span>Listed: {formatPrice(selectedLead.listedPrice, currency)}</span>}
                      </div>
                    </div>
                  )}

                  {selectedLead.tradeInDetails && (
                    <div className="p-3 bg-[#1D1728] rounded-lg border border-[#3E2958]">
                      <span className="text-[#D8B4FE] block text-[10px] uppercase font-semibold">Trade-In Vehicle Details</span>
                      <div className="font-semibold text-white">
                        {selectedLead.tradeInDetails.year} {selectedLead.tradeInDetails.make} {selectedLead.tradeInDetails.model}
                      </div>
                      <div className="text-[#C4B5FD] text-[11px] mt-0.5">
                        Mileage: {selectedLead.tradeInDetails.mileage.toLocaleString()} mi &middot; Condition: {selectedLead.tradeInDetails.condition}
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="text-[#7A7A88] block text-[10px] uppercase">Client Message / Notes</span>
                    <p className="p-3 bg-[#181822] rounded-lg border border-[#262635] text-[#D0D0DC] leading-relaxed">
                      {selectedLead.message}
                    </p>
                  </div>

                  <div>
                    <span className="text-[#7A7A88] block text-[10px] uppercase mb-1">Internal Dealer Notes</span>
                    <textarea
                      rows={3}
                      defaultValue={selectedLead.dealerNotes || ''}
                      onBlur={(e) => updateLeadNotes(selectedLead.id, e.target.value)}
                      placeholder="Add private dealer notes (e.g., funds confirmed via UBS Geneva)..."
                      className="w-full bg-[#1A1A24] border border-[#2B2B38] focus:border-[#D4AF37] rounded-lg p-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <a
                    href={`https://api.whatsapp.com/send?phone=${sanitizeWhatsAppNumber(selectedLead.phone)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-[#25D366] text-black font-semibold text-xs flex items-center gap-1.5 shadow"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Launch WhatsApp Chat</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedLead(null)}
                    className="px-4 py-2 rounded-lg bg-[#20202B] text-white text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: CAR INVENTORY MANAGEMENT                              */}
      {/* ============================================================ */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white font-display uppercase tracking-wider">
              Showroom Motorcar Inventory ({cars.length})
            </h2>

            <button
              type="button"
              onClick={handleOpenAddCar}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#ECCF84] via-[#D4AF37] to-[#B89225] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Motorcar</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div
                key={car.id}
                className="bg-[#121217] border border-[#242430] rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] bg-black">
                  <img
                    src={car.images[0] || '/src/assets/images/hero_showroom_luxury_1794144698125.jpg'}
                    alt={car.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-black/80 text-[#D4AF37]">
                      {car.category}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/80 text-[#888896]">
                      #{car.stockNumber}
                    </span>
                  </div>

                  <div className="absolute top-2 right-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      car.status === 'Available' ? 'bg-emerald-950/80 text-emerald-400' : 'bg-red-950/80 text-red-300'
                    }`}>
                      {car.status}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-[#888896] block">{car.brand} &middot; {car.year}</span>
                    <h3 className="text-sm font-bold text-white line-clamp-1">{car.title}</h3>
                    <div className="text-base font-bold text-[#F3E5AB] font-display mt-1">
                      {formatPrice(car.price, currency)}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1F1F28] flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCar(car);
                        setIsCarModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded bg-[#1B1B24] hover:bg-[#282836] text-[#D4AF37] font-medium border border-[#2D2D3E] flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Car</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteCar(car.id)}
                      className="p-1.5 rounded hover:bg-red-950/40 text-[#888896] hover:text-red-400 transition-colors"
                      title="Delete car"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit Car Modal */}
          {isCarModalOpen && editingCar && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
              onClick={() => setIsCarModalOpen(false)}
            >
              <div 
                className="max-w-2xl w-full bg-[#111116] border border-[#2E2E3C] rounded-2xl p-6 sm:p-8 space-y-5 my-8 max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-[#22222E] pb-3">
                  <h3 className="text-base font-bold text-white font-display uppercase">
                    {cars.some(c => c.id === editingCar.id) ? 'Edit Motorcar Details' : 'Add New Motorcar To Directory'}
                  </h3>
                  <button type="button" onClick={() => setIsCarModalOpen(false)} className="text-[#888896] hover:text-white">&times;</button>
                </div>

                <form onSubmit={handleSaveCar} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#8E8E9C] mb-1">Stock Number *</label>
                      <input
                        type="text"
                        required
                        value={editingCar.stockNumber || ''}
                        onChange={(e) => setEditingCar({ ...editingCar, stockNumber: e.target.value })}
                        className="w-full bg-[#181822] border border-[#2A2A38] rounded px-3 py-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[#8E8E9C] mb-1">Marque / Brand *</label>
                      <input
                        type="text"
                        required
                        value={editingCar.brand || ''}
                        onChange={(e) => setEditingCar({ ...editingCar, brand: e.target.value })}
                        className="w-full bg-[#181822] border border-[#2A2A38] rounded px-3 py-1.5 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#8E8E9C] mb-1">Vehicle Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ferrari SF90 Stradale Assetto Fiorano"
                      value={editingCar.title || ''}
                      onChange={(e) => setEditingCar({ ...editingCar, title: e.target.value })}
                      className="w-full bg-[#181822] border border-[#2A2A38] rounded px-3 py-1.5 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[#8E8E9C] mb-1">Year</label>
                      <input
                        type="number"
                        value={editingCar.year || 2025}
                        onChange={(e) => setEditingCar({ ...editingCar, year: Number(e.target.value) })}
                        className="w-full bg-[#181822] border border-[#2A2A38] rounded px-3 py-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[#8E8E9C] mb-1">Price (USD) *</label>
                      <input
                        type="number"
                        required
                        value={editingCar.price || 0}
                        onChange={(e) => setEditingCar({ ...editingCar, price: Number(e.target.value) })}
                        className="w-full bg-[#181822] border border-[#2A2A38] rounded px-3 py-1.5 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[#8E8E9C] mb-1">Mileage (Miles)</label>
                      <input
                        type="number"
                        value={editingCar.mileage || 0}
                        onChange={(e) => setEditingCar({ ...editingCar, mileage: Number(e.target.value) })}
                        className="w-full bg-[#181822] border border-[#2A2A38] rounded px-3 py-1.5 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[#8E8E9C] mb-1">Category</label>
                      <select
                        value={editingCar.category || 'Hypercar'}
                        onChange={(e) => setEditingCar({ ...editingCar, category: e.target.value as CarCategory })}
                        className="w-full bg-[#181822] border border-[#2A2A38] rounded px-2.5 py-1.5 text-white"
                      >
                        <option value="Hypercar">Hypercar</option>
                        <option value="Super SUV">Super SUV</option>
                        <option value="Grand Tourer">Grand Tourer</option>
                        <option value="Track Specialist">Track Specialist</option>
                        <option value="Exotic Convertible">Exotic Convertible</option>
                        <option value="Luxury Sedan">Luxury Sedan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#8E8E9C] mb-1">Condition</label>
                      <select
                        value={editingCar.condition || 'New'}
                        onChange={(e) => setEditingCar({ ...editingCar, condition: e.target.value as CarCondition })}
                        className="w-full bg-[#181822] border border-[#2A2A38] rounded px-2.5 py-1.5 text-white"
                      >
                        <option value="New">New</option>
                        <option value="Certified Pre-Owned">Certified Pre-Owned</option>
                        <option value="Collector Grade">Collector Grade</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#8E8E9C] mb-1">Status</label>
                      <select
                        value={editingCar.status || 'Available'}
                        onChange={(e) => setEditingCar({ ...editingCar, status: e.target.value as any })}
                        className="w-full bg-[#181822] border border-[#2A2A38] rounded px-2.5 py-1.5 text-white"
                      >
                        <option value="Available">Available</option>
                        <option value="Reserved">Reserved</option>
                        <option value="Sold">Sold</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[#8E8E9C] mb-1">Horsepower (BHP)</label>
                      <input
                        type="number"
                        value={editingCar.horsepower || 600}
                        onChange={(e) => setEditingCar({ ...editingCar, horsepower: Number(e.target.value) })}
                        className="w-full bg-[#181822] border border-[#2A2A38] rounded px-3 py-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[#8E8E9C] mb-1">0-60 MPH (sec)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={editingCar.acceleration0to60 || 3.0}
                        onChange={(e) => setEditingCar({ ...editingCar, acceleration0to60: Number(e.target.value) })}
                        className="w-full bg-[#181822] border border-[#2A2A38] rounded px-3 py-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[#8E8E9C] mb-1">Top Speed (MPH)</label>
                      <input
                        type="number"
                        value={editingCar.topSpeed || 200}
                        onChange={(e) => setEditingCar({ ...editingCar, topSpeed: Number(e.target.value) })}
                        className="w-full bg-[#181822] border border-[#2A2A38] rounded px-3 py-1.5 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#8E8E9C] mb-1">Main Image URL / Asset</label>
                    <input
                      type="text"
                      value={editingCar.images?.[0] || ''}
                      onChange={(e) => setEditingCar({ ...editingCar, images: [e.target.value] })}
                      className="w-full bg-[#181822] border border-[#2A2A38] rounded px-3 py-1.5 text-white"
                    />
                    <div className="flex gap-2 mt-1.5">
                      <span className="text-[10px] text-[#7A7A88]">Preset Luxury Photos:</span>
                      <button
                        type="button"
                        onClick={() => setEditingCar({ ...editingCar, images: ['/src/assets/images/car_hypercar_gold_black_1794144699718.jpg'] })}
                        className="text-[10px] text-[#D4AF37] hover:underline"
                      >
                        Hypercar Gold
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingCar({ ...editingCar, images: ['/src/assets/images/car_luxury_suv_black_1794144700613.jpg'] })}
                        className="text-[10px] text-[#D4AF37] hover:underline"
                      >
                        Luxury SUV
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingCar({ ...editingCar, images: ['/src/assets/images/car_grand_tourer_coupe_1794144700826.jpg'] })}
                        className="text-[10px] text-[#D4AF37] hover:underline"
                      >
                        Grand Tourer
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#8E8E9C] mb-1">YouTube Walkaround Video URL (e.g. 4K Tour)</label>
                    <input
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=v_xcBcVVsp4"
                      value={editingCar.videoUrl || ''}
                      onChange={(e) => setEditingCar({ ...editingCar, videoUrl: e.target.value })}
                      className="w-full bg-[#181822] border border-[#2A2A38] rounded px-3 py-1.5 text-white"
                    />
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-[#7A7A88]">Sample Preset:</span>
                      <button
                        type="button"
                        onClick={() => setEditingCar({ ...editingCar, videoUrl: 'https://www.youtube.com/watch?v=v_xcBcVVsp4' })}
                        className="text-[10px] text-[#D4AF37] hover:underline"
                      >
                        2025 Mercedes-Benz G63 Brabus 800 YouTube Video
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#8E8E9C] mb-1">Curatorial Statement &amp; Description</label>
                    <textarea
                      rows={3}
                      value={editingCar.description || ''}
                      onChange={(e) => setEditingCar({ ...editingCar, description: e.target.value })}
                      className="w-full bg-[#181822] border border-[#2A2A38] rounded p-2 text-white resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-[#22222E]">
                    <button
                      type="button"
                      onClick={() => setIsCarModalOpen(false)}
                      className="px-4 py-2 rounded bg-[#20202B] text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded bg-[#D4AF37] text-black font-semibold uppercase tracking-wider"
                    >
                      Save Motorcar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: WORDPRESS STYLE BLOG & ARTICLE CMS                     */}
      {/* ============================================================ */}
      {activeTab === 'blog' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white font-display uppercase tracking-wider">
                WordPress Gazette CMS ({blogPosts.length})
              </h2>
              <p className="text-xs text-[#8A8A96]">
                Manage articles, featured media, rich layouts, and Google SERP SEO parameters
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddPost}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#ECCF84] via-[#D4AF37] to-[#B89225] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Article</span>
            </button>
          </div>

          {/* Posts List */}
          <div className="bg-[#121217] border border-[#242430] rounded-xl overflow-hidden shadow-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#181822] border-b border-[#242432] text-[#868694] uppercase tracking-wider font-semibold text-[10px]">
                  <th className="py-3 px-4">Article Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">SEO Focus Keyword</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Published</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1D1D26]">
                {blogPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-[#16161F] transition-colors">
                    <td className="py-3 px-4 font-semibold text-white max-w-xs truncate">
                      {post.title}
                    </td>
                    <td className="py-3 px-4 text-[#D4AF37]">{post.category}</td>
                    <td className="py-3 px-4 text-[#A0A0AD]">{post.author.name}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#A6D8B4]">
                      {post.seo.focusKeyword || '—'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        post.status === 'Published' ? 'bg-[#142A1A] text-[#25D366]' : 'bg-[#292212] text-[#F3E5AB]'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#7A7A88] text-[11px]">{post.publishedAt}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPost(post);
                            setIsBlogModalOpen(true);
                          }}
                          className="p-1.5 rounded hover:bg-[#20202C] text-[#D4AF37]"
                          title="Edit in WordPress CMS"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1.5 rounded hover:bg-red-950/40 text-[#888896] hover:text-red-400"
                          title="Delete post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* WordPress-Style Full Screen Content Editor Modal */}
          {isBlogModalOpen && editingPost && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
              onClick={() => setIsBlogModalOpen(false)}
            >
              <div 
                className="max-w-5xl w-full bg-[#111116] border border-[#2B2B38] rounded-2xl shadow-2xl flex flex-col max-h-[94vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* WP Top Bar */}
                <div className="px-6 py-3.5 bg-[#171720] border-b border-[#242432] flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#201C11] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-bold text-xs">
                      W
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider font-display">
                      Aurelius WordPress Editor
                    </span>
                    <span className="text-[11px] text-[#7A7A88]">
                      &middot; {editingPost.status || 'Draft'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setBlogPreviewMode(!blogPreviewMode)}
                      className="px-3 py-1.5 rounded bg-[#1F1F2A] hover:bg-[#2A2A38] text-xs text-[#C5C5CE] flex items-center gap-1.5 border border-[#2E2E3E]"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{blogPreviewMode ? 'Edit Mode' : 'Live Preview'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSavePost}
                      className="px-4 py-1.5 rounded bg-[#D4AF37] hover:bg-[#ECCF84] text-black text-xs font-bold uppercase tracking-wider"
                    >
                      Publish / Update
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsBlogModalOpen(false)}
                      className="text-[#888896] hover:text-white text-lg pl-2"
                    >
                      &times;
                    </button>
                  </div>
                </div>

                {/* Main 2-Column Editor Body */}
                <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#20202B]">
                  {/* Left Column: Title & WordPress Rich Content (8 cols) */}
                  <div className="lg:col-span-8 p-6 space-y-5">
                    {/* Title */}
                    <div>
                      <input
                        type="text"
                        placeholder="Add Post Title..."
                        value={editingPost.title || ''}
                        onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                        className="w-full bg-transparent text-xl sm:text-2xl font-bold font-display text-white placeholder-[#5A5A66] focus:outline-none"
                      />
                      <div className="text-[11px] text-[#737380] font-mono mt-1 flex items-center gap-1">
                        <span>Permalink: /blog/</span>
                        <input
                          type="text"
                          value={editingPost.slug || ''}
                          onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                          className="bg-[#181822] text-[#D4AF37] px-1.5 py-0.5 rounded border border-[#282835] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* WordPress Formatting Toolbar */}
                    {!blogPreviewMode && (
                      <div className="flex items-center gap-1 p-2 bg-[#171720] border border-[#262635] rounded-lg text-xs text-[#A0A0AD] flex-wrap">
                        <button
                          type="button"
                          onClick={() => insertContentMarkup('<h2>', '</h2>')}
                          className="p-1.5 rounded hover:bg-[#252533] hover:text-white"
                          title="Heading 2"
                        >
                          <Heading className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertContentMarkup('<strong>', '</strong>')}
                          className="p-1.5 rounded hover:bg-[#252533] hover:text-white font-bold"
                          title="Bold"
                        >
                          <Bold className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertContentMarkup('<em>', '</em>')}
                          className="p-1.5 rounded hover:bg-[#252533] hover:text-white italic"
                          title="Italic"
                        >
                          <Italic className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertContentMarkup('<blockquote>\n  "', '"\n</blockquote>')}
                          className="p-1.5 rounded hover:bg-[#252533] hover:text-white"
                          title="Blockquote"
                        >
                          <Quote className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertContentMarkup('<ul>\n  <li>Feature Item 1</li>\n  <li>Feature Item 2</li>\n</ul>')}
                          className="p-1.5 rounded hover:bg-[#252533] hover:text-white"
                          title="Bullet list"
                        >
                          <List className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertContentMarkup('<p><img src="/src/assets/images/hero_showroom_luxury_1794144698125.jpg" alt="Showroom View" /></p>')}
                          className="p-1.5 rounded hover:bg-[#252533] hover:text-[#D4AF37] flex items-center gap-1"
                          title="Insert Media Image"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Insert Media</span>
                        </button>
                      </div>
                    )}

                    {/* Content Textarea OR Live Preview */}
                    {blogPreviewMode ? (
                      <div className="p-6 bg-[#0E0E12] rounded-xl border border-[#22222D] min-h-[350px]">
                        <h2 className="text-xl font-bold font-display text-white mb-4">
                          {editingPost.title}
                        </h2>
                        <div 
                          className="prose prose-invert text-xs text-[#C5C5CE] space-y-4"
                          dangerouslySetInnerHTML={{ __html: editingPost.content || '' }}
                        />
                      </div>
                    ) : (
                      <textarea
                        rows={14}
                        placeholder="Start typing your luxury story in HTML or clean text..."
                        value={editingPost.content || ''}
                        onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                        className="w-full bg-[#15151D] border border-[#262635] focus:border-[#D4AF37] rounded-xl p-4 text-xs text-white font-mono leading-relaxed focus:outline-none"
                      />
                    )}

                    {/* Excerpt Module */}
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block">
                        Excerpt (Article Teaser)
                      </label>
                      <textarea
                        rows={2}
                        value={editingPost.excerpt || ''}
                        onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                        placeholder="Write a 1-2 sentence lead summary..."
                        className="w-full bg-[#15151D] border border-[#262635] rounded-lg p-2.5 text-xs text-white resize-none"
                      />
                    </div>
                  </div>

                  {/* Right Column: Settings & WordPress SEO Parameters Module (4 cols) */}
                  <div className="lg:col-span-4 p-6 space-y-6 bg-[#0E0E12]">
                    {/* Publishing Panel */}
                    <div className="p-4 bg-[#14141B] border border-[#242430] rounded-xl space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#22222D] pb-2">
                        Publish Options
                      </h4>

                      <div className="space-y-2 text-xs">
                        <div>
                          <label className="block text-[#8A8A96] mb-1">Status</label>
                          <select
                            value={editingPost.status || 'Published'}
                            onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value as any })}
                            className="w-full bg-[#1B1B24] border border-[#2C2C3A] rounded px-2.5 py-1 text-white"
                          >
                            <option value="Published">Published</option>
                            <option value="Draft">Draft</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[#8A8A96] mb-1">Category</label>
                          <select
                            value={editingPost.category || 'Market Insights'}
                            onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                            className="w-full bg-[#1B1B24] border border-[#2C2C3A] rounded px-2.5 py-1 text-white"
                          >
                            <option value="Market Insights">Market Insights</option>
                            <option value="Bespoke Craft">Bespoke Craft</option>
                            <option value="Performance & Tech">Performance &amp; Tech</option>
                            <option value="Showroom News">Showroom News</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Featured Image Module */}
                    <div className="p-4 bg-[#14141B] border border-[#242430] rounded-xl space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#22222D] pb-2">
                        Featured Image
                      </h4>

                      <div className="aspect-[16/10] bg-black rounded-lg overflow-hidden border border-[#282835]">
                        <img
                          src={editingPost.featuredImage || '/src/assets/images/hero_showroom_luxury_1794144698125.jpg'}
                          alt="Featured Media"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <input
                        type="text"
                        value={editingPost.featuredImage || ''}
                        onChange={(e) => setEditingPost({ ...editingPost, featuredImage: e.target.value })}
                        className="w-full bg-[#1B1B24] border border-[#2C2C3A] rounded px-2.5 py-1 text-xs text-white"
                      />

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingPost({ ...editingPost, featuredImage: '/src/assets/images/car_hypercar_gold_black_1794144699718.jpg' })}
                          className="text-[10px] text-[#D4AF37] hover:underline"
                        >
                          Use Hypercar
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingPost({ ...editingPost, featuredImage: '/src/assets/images/dealership_vip_lounge_1794144698439.jpg' })}
                          className="text-[10px] text-[#D4AF37] hover:underline"
                        >
                          Use VIP Lounge
                        </button>
                      </div>
                    </div>

                    {/* WordPress SEO Parameters (Yoast / RankMath Style) */}
                    <div className="p-4 bg-[#14141B] border border-[#D4AF37]/30 rounded-xl space-y-3">
                      <div className="flex items-center justify-between border-b border-[#22222D] pb-2">
                        <h4 className="text-xs font-bold text-[#F3E5AB] uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>SEO Parameters (Yoast)</span>
                        </h4>
                        <span className="text-[10px] font-mono text-[#25D366]">Google Ready</span>
                      </div>

                      <div className="space-y-3 text-xs">
                        {/* Focus Keyword */}
                        <div>
                          <label className="block text-[#8A8A96] mb-1">Focus Keyword *</label>
                          <input
                            type="text"
                            placeholder="e.g. V12 hypercar investment"
                            value={editingPost.seo?.focusKeyword || ''}
                            onChange={(e) => setEditingPost({
                              ...editingPost,
                              seo: { ...(editingPost.seo || { canonicalUrl: '', noIndex: false, metaDescription: '', metaTitle: '' }), focusKeyword: e.target.value }
                            })}
                            className="w-full bg-[#1B1B24] border border-[#2C2C3A] rounded px-2.5 py-1 text-white font-mono"
                          />
                        </div>

                        {/* Meta Title */}
                        <div>
                          <div className="flex justify-between text-[#8A8A96] mb-1">
                            <span>SEO Meta Title</span>
                            <span className="text-[10px] font-mono">{(editingPost.seo?.metaTitle || '').length}/60</span>
                          </div>
                          <input
                            type="text"
                            value={editingPost.seo?.metaTitle || ''}
                            onChange={(e) => setEditingPost({
                              ...editingPost,
                              seo: { ...(editingPost.seo || { canonicalUrl: '', noIndex: false, focusKeyword: '', metaDescription: '' }), metaTitle: e.target.value }
                            })}
                            className="w-full bg-[#1B1B24] border border-[#2C2C3A] rounded px-2.5 py-1 text-white"
                          />
                        </div>

                        {/* Meta Description */}
                        <div>
                          <div className="flex justify-between text-[#8A8A96] mb-1">
                            <span>Meta Description</span>
                            <span className="text-[10px] font-mono">{(editingPost.seo?.metaDescription || '').length}/160</span>
                          </div>
                          <textarea
                            rows={2}
                            value={editingPost.seo?.metaDescription || ''}
                            onChange={(e) => setEditingPost({
                              ...editingPost,
                              seo: { ...(editingPost.seo || { canonicalUrl: '', noIndex: false, focusKeyword: '', metaTitle: '' }), metaDescription: e.target.value }
                            })}
                            className="w-full bg-[#1B1B24] border border-[#2C2C3A] rounded p-2 text-white resize-none"
                          />
                        </div>

                        {/* SERP Snippet Preview */}
                        <div className="p-2.5 bg-[#0A0A0E] rounded border border-[#1E1E28] space-y-1">
                          <span className="text-[10px] text-[#7A7A88] uppercase block">Google Snippet Preview</span>
                          <div className="text-xs text-[#8AB4F8] hover:underline truncate">
                            {editingPost.seo?.metaTitle || editingPost.title || 'Untitled Post'}
                          </div>
                          <div className="text-[10px] text-[#34A853] truncate">
                            https://aureliusmotors.com/blog/{editingPost.slug || 'slug'}
                          </div>
                          <div className="text-[10px] text-[#9AA0A6] line-clamp-2">
                            {editingPost.seo?.metaDescription || editingPost.excerpt || 'Article summary appears here...'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: DEALERSHIP SETTINGS & WHATSAPP CONFIG                  */}
      {/* ============================================================ */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl bg-[#121217] border border-[#242430] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#22222E] pb-4">
            <h2 className="text-base font-bold text-white font-display uppercase tracking-wider">
              Dealership Operations &amp; WhatsApp Gateway
            </h2>
            <p className="text-xs text-[#8A8A96] mt-1">
              Configure the WhatsApp notification number for instant price negotiations, dealership address, and security token.
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div className="p-4 bg-[#142618] border border-[#25D366]/40 rounded-xl space-y-2">
              <label className="block text-xs uppercase font-bold text-[#25D366]">
                WhatsApp Dealer Notification Number (Nigeria International Format) *
              </label>
              <input
                type="text"
                required
                value={tempSettings.whatsappNumber}
                onChange={(e) => setTempSettings({ ...tempSettings, whatsappNumber: e.target.value })}
                placeholder="+2348038904653"
                className="w-full bg-[#183321] border border-[#25D366]/50 rounded-lg px-3 py-2 text-white font-mono font-semibold focus:outline-none"
              />
              <p className="text-[11px] text-[#A6DDB6]">
                When buyers click "Negotiate Price" on any car, offers will open a direct WhatsApp chat to this Nigerian phone number with pre-formatted Naira figures and delivery destination!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#8E8E9C] mb-1">Dealership Legal Name</label>
                <input
                  type="text"
                  value={tempSettings.dealershipName}
                  onChange={(e) => setTempSettings({ ...tempSettings, dealershipName: e.target.value })}
                  className="w-full bg-[#181822] border border-[#2A2A38] rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[#8E8E9C] mb-1">Concierge Telephone</label>
                <input
                  type="text"
                  value={tempSettings.phone}
                  onChange={(e) => setTempSettings({ ...tempSettings, phone: e.target.value })}
                  className="w-full bg-[#181822] border border-[#2A2A38] rounded-lg px-3 py-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#8E8E9C] mb-1">Showroom Address</label>
              <input
                type="text"
                value={tempSettings.address}
                onChange={(e) => setTempSettings({ ...tempSettings, address: e.target.value })}
                className="w-full bg-[#181822] border border-[#2A2A38] rounded-lg px-3 py-2 text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#8E8E9C] mb-1">Dealer Security Token</label>
                <input
                  type="text"
                  value={tempSettings.adminToken}
                  onChange={(e) => setTempSettings({ ...tempSettings, adminToken: e.target.value })}
                  className="w-full bg-[#181822] border border-[#2A2A38] rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[#8E8E9C] mb-1">Default Showroom Currency</label>
                <select
                  value={tempSettings.currency}
                  onChange={(e) => setTempSettings({ ...tempSettings, currency: e.target.value as any })}
                  className="w-full bg-[#181822] border border-[#2A2A38] rounded-lg px-3 py-2 text-white"
                >
                  <option value="NGN">Nigerian Naira (₦ NGN)</option>
                  <option value="USD">US Dollar ($ USD)</option>
                  <option value="GBP">British Pound (£ GBP)</option>
                  <option value="EUR">Euro (€ EUR)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              {settingsSavedToast ? (
                <span className="text-xs text-[#25D366] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Settings saved to dealership registry!</span>
                </span>
              ) : <div />}

              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#ECCF84] text-black font-semibold uppercase tracking-wider transition-colors"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
