export type CarCategory = 
  | 'Super SUV'
  | 'Armored B6/B7'
  | 'Luxury Sedan'
  | 'Grand Tourer'
  | 'Hypercar'
  | 'Exotic Convertible'
  | 'Executive Limousine';

export type CarCondition = 
  | 'Brand New (Foreign Direct)'
  | 'Tokunbo (Foreign Used)'
  | 'Certified Pre-Owned'
  | 'Collector Grade';

export type CarTransmission = 'Dual-Clutch' | 'Automatic' | 'Manual' | 'Direct-Drive EV';

export type CarStatus = 'Available' | 'Reserved' | 'Sold';

export interface Car {
  id: string;
  stockNumber: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  category: CarCategory;
  condition: CarCondition;
  price: number; // in NGN (Nigerian Naira)
  originalPrice?: number;
  mileage: number; // in km/miles
  exteriorColor: string;
  interiorColor: string;
  transmission: CarTransmission;
  engine: string;
  horsepower: number;
  acceleration0to60: number; // in seconds
  topSpeed: number; // in km/h or mph
  fuelType: 'Petrol' | 'Hybrid' | 'Diesel' | 'Electric';
  images: string[];
  videoUrl?: string;
  featured?: boolean;
  status: CarStatus;
  description: string;
  keyFeatures: string[];
  specifications: {
    vin: string;
    drivetrain: string;
    bodyStyle: string;
    doors: number;
    warranty: string;
    location: string; // e.g. 'Victoria Island Showroom, Lagos' | 'Maitama Vault, Abuja'
    customsDuty: string; // e.g. '100% Fully Cleared (NCS Form C84 & Verified SGD Attached)'
    armoredLevel?: string; // e.g. 'CEN B6 Armored Certified'
  };
}

export type LeadType = 
  | 'negotiation'
  | 'quote'
  | 'contact'
  | 'test_drive'
  | 'newsletter'
  | 'trade_in';

export type LeadStatus = 'new' | 'contacted' | 'negotiating' | 'closed' | 'archived';

export interface LeadInquiry {
  id: string;
  type: LeadType;
  carId?: string;
  carTitle?: string;
  stockNumber?: string;
  customerName: string;
  email: string;
  phone: string;
  preferredContact: 'whatsapp' | 'call' | 'email';
  offeredPrice?: number;
  listedPrice?: number;
  deliveryState?: string; // e.g. Lagos, Abuja, Port Harcourt, Kano, etc.
  message: string;
  tradeInDetails?: {
    make: string;
    model: string;
    year: number;
    mileage: number;
    condition: string;
    estimatedValue?: number;
    registrationType?: 'Nigerian Used' | 'Tokunbo (Foreign Used)';
    stateOfRegistration?: string;
  };
  preferredDate?: string;
  status: LeadStatus;
  createdAt: string;
  dealerNotes?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  readTime: string;
  publishedAt: string;
  status: 'Published' | 'Draft';
  tags: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    focusKeyword: string;
    canonicalUrl: string;
    ogImage?: string;
    noIndex?: boolean;
  };
}

export interface DealershipSettings {
  dealershipName: string;
  whatsappNumber: string;
  whatsappDisplayNumber: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  openingHours: string;
  currency: 'NGN' | 'USD' | 'GBP' | 'EUR';
  adminToken: string;
}

export type PageRoute = 
  | 'home'
  | 'inventory'
  | 'car-detail'
  | 'services'
  | 'trade-in'
  | 'gallery'
  | 'blog'
  | 'blog-post'
  | 'about'
  | 'contact'
  | 'admin';
