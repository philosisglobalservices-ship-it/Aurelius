import React, { useState, useEffect } from 'react';
import { 
  Car, BlogPost, LeadInquiry, DealershipSettings, PageRoute 
} from './types';
import { CurrencyCode } from './utils/currency';
import { 
  INITIAL_CARS, INITIAL_BLOG_POSTS, INITIAL_LEADS, INITIAL_SETTINGS, 
  STORAGE_KEYS, loadStoredData, saveStoredData 
} from './data/initialData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NegotiateModal } from './components/NegotiateModal';
import { CarDetailModal } from './components/CarDetailModal';
import { HomePage } from './pages/HomePage';
import { InventoryPage } from './pages/InventoryPage';
import { ServicesPage } from './pages/ServicesPage';
import { ValuationPage } from './pages/ValuationPage';
import { GalleryPage } from './pages/GalleryPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { MessageSquare, ArrowUp } from 'lucide-react';
import { createGeneralWhatsAppUrl } from './utils/whatsapp';

export default function App() {
  // Navigation & Page State
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');

  // Application Data with LocalStorage Persistence
  const [cars, setCars] = useState<Car[]>(() => 
    loadStoredData(STORAGE_KEYS.CARS, INITIAL_CARS)
  );

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => 
    loadStoredData(STORAGE_KEYS.BLOG_POSTS, INITIAL_BLOG_POSTS)
  );

  const [leads, setLeads] = useState<LeadInquiry[]>(() => 
    loadStoredData(STORAGE_KEYS.LEADS, INITIAL_LEADS)
  );

  const [settings, setSettings] = useState<DealershipSettings>(() => 
    loadStoredData(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS)
  );

  const [currency, setCurrency] = useState<CurrencyCode>(settings.currency || 'NGN');

  // Active Modals & Selection
  const [selectedCarForDetail, setSelectedCarForDetail] = useState<Car | null>(null);
  const [selectedCarForNegotiate, setSelectedCarForNegotiate] = useState<Car | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(() => blogPosts[0] || null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync state changes to localStorage
  useEffect(() => {
    saveStoredData(STORAGE_KEYS.CARS, cars);
  }, [cars]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.BLOG_POSTS, blogPosts);
  }, [blogPosts]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.LEADS, leads);
  }, [leads]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.SETTINGS, settings);
  }, [settings]);

  // Track scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit Lead Handler (from any form: negotiation, test-drive, quote, contact, trade-in, newsletter)
  const handleSubmitLead = (newLeadData: Omit<LeadInquiry, 'id' | 'createdAt'>) => {
    const newLead: LeadInquiry = {
      ...newLeadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const handleSubscribeNewsletter = (email: string) => {
    handleSubmitLead({
      type: 'newsletter',
      customerName: email.split('@')[0],
      email: email,
      phone: 'Newsletter Subscriber',
      preferredContact: 'email',
      message: 'Subscribed to Aurelius Nigeria Private Allocations & Market Intelligence Digest.',
      status: 'closed'
    });
  };

  const handleSelectPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
    handleNavigate('blog-post');
  };

  const directWhatsAppLink = createGeneralWhatsAppUrl(
    settings.whatsappNumber,
    'Hello Aurelius Motors Nigeria Concierge, I would like to inquire about your vehicle showroom in Victoria Island and VIP allocations.'
  );

  const newLeadsCount = leads.filter(l => l.status === 'new').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0C] text-[#E5E5E7] selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      {/* Universal Top Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currency={currency}
        onCurrencyChange={(c) => {
          setCurrency(c);
          setSettings(prev => ({ ...prev, currency: c }));
        }}
        whatsappNumber={settings.whatsappNumber}
        carsCount={cars.length}
        newLeadsCount={newLeadsCount}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            cars={cars}
            blogPosts={blogPosts}
            currency={currency}
            onNavigate={handleNavigate}
            onSelectCar={(car) => setSelectedCarForDetail(car)}
            onNegotiate={(car) => setSelectedCarForNegotiate(car)}
            onSelectPost={handleSelectPost}
            dealerWhatsApp={settings.whatsappNumber}
          />
        )}

        {currentPage === 'inventory' && (
          <InventoryPage
            cars={cars}
            currency={currency}
            onSelectCar={(car) => setSelectedCarForDetail(car)}
            onNegotiate={(car) => setSelectedCarForNegotiate(car)}
            dealerWhatsApp={settings.whatsappNumber}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            dealerWhatsApp={settings.whatsappNumber}
            onSubmitLead={handleSubmitLead}
          />
        )}

        {currentPage === 'trade-in' && (
          <ValuationPage
            dealerWhatsApp={settings.whatsappNumber}
            currency={currency}
            onSubmitLead={handleSubmitLead}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage />
        )}

        {currentPage === 'blog' && (
          <BlogPage
            posts={blogPosts}
            onSelectPost={handleSelectPost}
          />
        )}

        {currentPage === 'blog-post' && (
          <BlogPostPage
            post={selectedBlogPost}
            onBack={() => handleNavigate('blog')}
            onSelectPost={handleSelectPost}
            allPosts={blogPosts}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            dealerWhatsApp={settings.whatsappNumber}
            onSubmitLead={handleSubmitLead}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            cars={cars}
            blogPosts={blogPosts}
            leads={leads}
            settings={settings}
            currency={currency}
            onUpdateCars={setCars}
            onUpdateBlogPosts={setBlogPosts}
            onUpdateLeads={setLeads}
            onUpdateSettings={setSettings}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={handleNavigate}
        whatsappNumber={settings.whatsappNumber}
        onSubscribeNewsletter={handleSubscribeNewsletter}
      />

      {/* Negotiation Modal with WhatsApp Action and Lead Recording */}
      {selectedCarForNegotiate && (
        <NegotiateModal
          car={selectedCarForNegotiate}
          currency={currency}
          dealerWhatsApp={settings.whatsappNumber}
          onClose={() => setSelectedCarForNegotiate(null)}
          onSubmitLead={(lead) => {
            handleSubmitLead(lead);
          }}
        />
      )}

      {/* Car Detail Modal */}
      {selectedCarForDetail && (
        <CarDetailModal
          car={selectedCarForDetail}
          currency={currency}
          onClose={() => setSelectedCarForDetail(null)}
          onNegotiate={(car) => {
            setSelectedCarForDetail(null);
            setSelectedCarForNegotiate(car);
          }}
          onSubmitLead={handleSubmitLead}
        />
      )}

      {/* Floating Action Buttons (WhatsApp Concierge + Scroll to Top) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        {showScrollTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="pointer-events-auto p-2.5 rounded-full bg-[#181822]/90 hover:bg-[#252533] text-[#D4AF37] border border-[#2F2F40] shadow-lg transition-all"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <a
          href={directWhatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-black font-bold text-xs uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all shadow-[#25D366]/30"
          title="Direct WhatsApp Dealer Concierge"
        >
          <MessageSquare className="w-4 h-4 fill-black" />
          <span className="hidden sm:inline">WhatsApp Concierge</span>
        </a>
      </div>
    </div>
  );
}
