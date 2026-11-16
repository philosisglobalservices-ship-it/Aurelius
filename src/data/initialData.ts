import { Car, BlogPost, LeadInquiry, DealershipSettings } from '../types';

export const INITIAL_SETTINGS: DealershipSettings = {
  dealershipName: 'Aurelius Motors Nigeria',
  whatsappNumber: '+2348038904653',
  whatsappDisplayNumber: '+234 (0) 803 890 GOLD',
  phone: '+234 (0) 1 890 2873',
  email: 'concierge@aureliusmotors.ng',
  address: 'Plot 12A Akin Adesola Street, Victoria Island',
  city: 'Lagos State, Nigeria',
  openingHours: 'Mon - Sat: 8:30 AM - 7:30 PM (WAT) | Sunday by VIP Executive Appointment',
  currency: 'NGN',
  adminToken: 'AURELIUS-VIP-2026'
};

export const INITIAL_CARS: Car[] = [
  {
    id: 'car-1',
    stockNumber: 'AUR-NG-901',
    title: 'Mercedes-Benz G63 AMG Brabus 800 Widestar Gold Crest',
    brand: 'Mercedes-Benz',
    model: 'G63 AMG Brabus 800',
    year: 2025,
    category: 'Super SUV',
    condition: 'Brand New (Foreign Direct)',
    price: 495000000, // ₦495 Million
    originalPrice: 530000000,
    mileage: 120,
    exteriorColor: 'Obsidian Black Metallic with Satin Gold Emblems',
    interiorColor: 'Mandarin & Black Diamond Quilted Nappa Leather',
    transmission: 'Automatic',
    engine: '4.0L Handcrafted Biturbo V8 (Brabus 800 Tuning)',
    horsepower: 800,
    acceleration0to60: 4.1,
    topSpeed: 240,
    fuelType: 'Petrol',
    images: [
      '/src/assets/images/brabus_exterior_gold_1794326488165.jpg',
      '/src/assets/images/brabus_interior_gold_1794326472457.jpg',
      '/src/assets/images/car_luxury_suv_black_1794144700613.jpg',
      '/src/assets/images/hero_showroom_luxury_1794144698125.jpg'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=v_xcBcVVsp4',
    featured: true,
    status: 'Available',
    description: 'The definitive executive alpha SUV in Nigeria. Fitted with genuine Brabus 800 Performance package, Brabus Monoblock Z 24-inch forged platinum wheels in gold sheen, valve-controlled active side-exit titanium exhaust with gold tips, and full Star-Roof optic headliner. 100% genuine Customs Duty fully paid at Tin Can Island with verifiable C-Number.',
    keyFeatures: [
      '800 HP / 1,000 Nm Brabus PowerXtra Engine Upgrade',
      'Brabus Widestar Carbon Aerodynamic Bodywork with LED Roof Pods',
      '100% Genuine Nigerian Customs Duty Cleared (Verified SGD & C84)',
      'Brabus RideControl Adaptive Adjustable Suspension for Nigerian Roads',
      'Burmester High-End 3D Surround Audio System'
    ],
    specifications: {
      vin: 'WDB9634991NG00901',
      drivetrain: 'Permanent 4MATIC All-Wheel Drive with 3 Differential Locks',
      bodyStyle: 'Luxury Performance SUV',
      doors: 5,
      warranty: '3-Year Aurelius Comprehensive Concierge Warranty',
      location: 'Victoria Island Flagship Showroom, Lagos',
      customsDuty: '100% Fully Paid (NCS Tin Can Island Command C84 Attached)',
      armoredLevel: 'Heavy Duty Underbody Skid Armor'
    }
  },
  {
    id: 'car-2',
    stockNumber: 'AUR-NG-880',
    title: 'Cadillac Escalade-V Armored B6 Executive Presidential Edition',
    brand: 'Cadillac',
    model: 'Escalade-V Armored B6',
    year: 2026,
    category: 'Armored B6/B7',
    condition: 'Brand New (Foreign Direct)',
    price: 680000000, // ₦680 Million
    mileage: 45,
    exteriorColor: 'Black Raven with Satin Gold Monograms',
    interiorColor: 'Jet Black Semi-Aniline Leather with Gold Piping',
    transmission: 'Automatic',
    engine: '6.2L Supercharged V8 Biturbo',
    horsepower: 682,
    acceleration0to60: 5.2,
    topSpeed: 180,
    fuelType: 'Petrol',
    images: [
      '/src/assets/images/car_luxury_suv_black_1794144700613.jpg',
      '/src/assets/images/dealership_vip_lounge_1794144698439.jpg'
    ],
    featured: true,
    status: 'Available',
    description: 'Certified CEN B6 Level Ballistic Protection engineered specifically for executive security and convoy protocol across Nigeria. Defends against AK-47 (7.62x39mm), high-powered rifles, and dual DM51 floor grenade detonations. Equipped with run-flat tire inserts, emergency oxygen generation system, siren/PA intercom, and executive rear recliner chairs with champagne bar.',
    keyFeatures: [
      'CEN B6 Multi-Hit Ballistic Steel & Curved Glass Protection',
      'Heavy-Duty Hutchinson Run-Flat Tire System (50km at 80km/h)',
      'Reinforced Suspension & Brembo Armored Caliper Braking System',
      'Underbody Blast Shrapnel Deflector Plate',
      'End-user NSA and Ministry of Interior Cleared Documentation'
    ],
    specifications: {
      vin: '1GYS4HK73RR18880N',
      drivetrain: 'Full-Time Active All-Wheel Drive',
      bodyStyle: 'Armored Executive SUV',
      doors: 5,
      warranty: '2-Year Ballistic & Drivetrain Comprehensive Warranty',
      location: 'Maitama Vault, Abuja',
      customsDuty: '100% Fully Cleared with Verified Single Goods Declaration (SGD)',
      armoredLevel: 'CEN B6 Ballistic Level (7.62x39mm & 7.62x51mm NATO)'
    }
  },
  {
    id: 'car-3',
    stockNumber: 'AUR-NG-770',
    title: 'Rolls-Royce Cullinan Series II Black Badge',
    brand: 'Rolls-Royce',
    model: 'Cullinan Black Badge',
    year: 2025,
    category: 'Super SUV',
    condition: 'Brand New (Foreign Direct)',
    price: 980000000, // ₦980 Million
    originalPrice: 1050000000,
    mileage: 85,
    exteriorColor: 'Diamond Black with Mandarin & Gold Double Coachline',
    interiorColor: 'Black & Gold Tailored Leather with Starlight Headliner',
    transmission: 'Automatic',
    engine: '6.75L Twin-Turbocharged V12',
    horsepower: 600,
    acceleration0to60: 4.9,
    topSpeed: 250,
    fuelType: 'Petrol',
    images: [
      '/src/assets/images/dealership_vip_lounge_1794144698439.jpg',
      '/src/assets/images/hero_showroom_luxury_1794144698125.jpg'
    ],
    featured: true,
    status: 'Available',
    description: 'The pinnacle of luxury motoring in West Africa. Cullinan Series II Black Badge equipped with the illuminated Pantheon Grille, gold Spirit of Ecstasy mascot, viewing suite cocktail chairs in the boot, rear theatre configuration, and Flagbearer Magic Carpet ride calibrated for Nigerian highway cruising.',
    keyFeatures: [
      'Twin-Turbo 6.75-Liter V12 with Black Badge High-Output Calibration',
      'Full Starlight Headliner with Shooting Star Animation',
      'Rear Executive Theatre with Motorized Touchscreen Displays & Coolbox',
      'Automatic Soft-Close Coach Doors and Laser Headlights',
      '100% Duty Paid with Original Customs Assessment Receipt'
    ],
    specifications: {
      vin: 'SCA684D09SU00770N',
      drivetrain: 'All-Wheel Drive with 4-Wheel Steering',
      bodyStyle: 'Ultra-Luxury All-Terrain Motorcar',
      doors: 5,
      warranty: '4-Year Rolls-Royce Global Ownership Package',
      location: 'Victoria Island Flagship Showroom, Lagos',
      customsDuty: '100% Fully Cleared (NCS Lagos Port Verified)'
    }
  },
  {
    id: 'car-4',
    stockNumber: 'AUR-NG-650',
    title: 'Lexus LX 600 VIP 4-Seater Ultra Luxury',
    brand: 'Lexus',
    model: 'LX 600 VIP Ultra Luxury',
    year: 2025,
    category: 'Super SUV',
    condition: 'Brand New (Foreign Direct)',
    price: 360000000, // ₦360 Million
    mileage: 60,
    exteriorColor: 'Sonic Titanium Metallic with Gold Chrome Emblems',
    interiorColor: 'Sunflare Diamond Stitched Semi-Aniline Leather',
    transmission: 'Automatic',
    engine: '3.5L Twin-Turbocharged V6',
    horsepower: 409,
    acceleration0to60: 6.9,
    topSpeed: 210,
    fuelType: 'Petrol',
    images: [
      '/src/assets/images/car_luxury_suv_black_1794144700613.jpg',
      '/src/assets/images/hero_showroom_luxury_1794144698125.jpg'
    ],
    featured: true,
    status: 'Available',
    description: 'Nigeria’s most revered reliability luxury flagship. 4-seater executive VIP configuration featuring an ottoman-equipped rear recliner that reclines up to 48 degrees, Mark Levinson 25-speaker Reference Surround sound, active height control suspension, and full tropical cooling specification.',
    keyFeatures: [
      'VIP 4-Seat Executive Layout with Deployable Footrest and Massage',
      'Multi-Terrain Select with Active Height Control (AHC) for Nigerian Terrains',
      'Mark Levinson 2,400-Watt 25-Speaker Reference Audio',
      'Fingerprint Engine Start Sensor and Anti-Theft Protocol',
      'Customs Verified Single Goods Declaration (SGD) in Hand'
    ],
    specifications: {
      vin: 'JTJHY07W3P400650N',
      drivetrain: 'Full-Time 4WD with Torsen Limited-Slip Center Diff',
      bodyStyle: 'Full-Size Luxury SUV',
      doors: 5,
      warranty: '3-Year Comprehensive Warranty / 100,000 km',
      location: 'Maitama Vault, Abuja',
      customsDuty: '100% Cleared by Nigerian Customs Service'
    }
  },
  {
    id: 'car-5',
    stockNumber: 'AUR-NG-550',
    title: 'Mercedes-Maybach S680 4MATIC V12 Edition Gold',
    brand: 'Mercedes-Benz',
    model: 'Maybach S680',
    year: 2025,
    category: 'Executive Limousine',
    condition: 'Brand New (Foreign Direct)',
    price: 620000000, // ₦620 Million
    mileage: 30,
    exteriorColor: 'Two-Tone Obsidian Black / Kalahari Gold',
    interiorColor: 'Exclusive Nappa Leather Deep Brown & Silk Beige',
    transmission: 'Automatic',
    engine: '6.0L Twin-Turbo Handcrafted V12',
    horsepower: 621,
    acceleration0to60: 4.4,
    topSpeed: 250,
    fuelType: 'Petrol',
    images: [
      '/src/assets/images/hero_showroom_luxury_1794144698125.jpg',
      '/src/assets/images/dealership_vip_lounge_1794144698439.jpg'
    ],
    featured: false,
    status: 'Available',
    description: 'The pinnacle of chauffeured prestige for corporate captains and royal dignitaries in Nigeria. Two-tone paint-to-sample finished with 6.0L V12 powerplant, rear executive First-Class lounge with refrigerated compartment, silver-plated champagne flutes, and electric gesture comfort doors.',
    keyFeatures: [
      'Twin-Turbocharged 6.0-Liter V12 delivering 738 lb-ft Torque',
      'Rear First-Class Continuous Center Console with Folding Tables',
      'E-ACTIVE BODY CONTROL Predictive Road-Scanning Air Suspension',
      'Burmester High-End 4D Surround Sound with Headrest Exciter Speakers',
      'Customs Duty 100% Cleared at PTML Port Lagos'
    ],
    specifications: {
      vin: 'W1KZF8HB3PA00550N',
      drivetrain: 'All-Wheel Drive (4MATIC)',
      bodyStyle: 'Executive Long-Wheelbase Limousine',
      doors: 4,
      warranty: '3-Year Complete Aurelius VIP Warranty',
      location: 'Victoria Island Flagship Showroom, Lagos',
      customsDuty: '100% Fully Cleared with Authentic NCS Portal Receipt'
    }
  },
  {
    id: 'car-6',
    stockNumber: 'AUR-NG-440',
    title: 'Lamborghini Revuelto V12 HPEV Hybrid',
    brand: 'Lamborghini',
    model: 'Revuelto',
    year: 2025,
    category: 'Hypercar',
    condition: 'Brand New (Foreign Direct)',
    price: 1250000000, // ₦1.25 Billion
    mileage: 18,
    exteriorColor: 'Nero Noctis Gloss with Aurum Gold Accents',
    interiorColor: 'Nero Ade & Giallo Belenus Hexagonal Stitching',
    transmission: 'Dual-Clutch',
    engine: '6.5L Naturally Aspirated V12 + 3 Electric Motors',
    horsepower: 1001,
    acceleration0to60: 2.4,
    topSpeed: 350,
    fuelType: 'Hybrid',
    images: [
      '/src/assets/images/car_hypercar_gold_black_1794144699718.jpg',
      '/src/assets/images/hero_showroom_luxury_1794144698125.jpg'
    ],
    featured: true,
    status: 'Available',
    description: 'The first Lamborghini Revuelto in West Africa. 1,001 brake horsepower combined from a screaming 9,500 RPM naturally aspirated V12 and three electric motors. Front axle lifter system calibrated for speed ramps on Lagos island and Abuja highways.',
    keyFeatures: [
      '1,001 HP Hybrid Powertrain with Full Carbon-Fiber Monofuselage',
      'Front Axle Hydraulic Lift System for Speed Breakers',
      'Titanium Exhaust System and Ad Personam Gold Painted Calipers',
      'Complete Air Freight Delivery to Murtala Muhammed Airport Cargo Terminal',
      'Verified NCS Customs Papers with Zero Duty Exposure'
    ],
    specifications: {
      vin: 'ZHWUR4ZF9RLA0440N',
      drivetrain: 'e-AWD with Torque Vectoring',
      bodyStyle: 'Hypercar Coupe',
      doors: 2,
      warranty: 'Full Factory Lamborghini Global Warranty',
      location: 'Victoria Island Flagship Showroom, Lagos',
      customsDuty: '100% Fully Paid (NCS Tin Can Island Assessment Verified)'
    }
  },
  {
    id: 'car-7',
    stockNumber: 'AUR-NG-320',
    title: 'Toyota Land Cruiser 300 GR Sport V6 Twin-Turbo',
    brand: 'Toyota',
    model: 'Land Cruiser 300 GR Sport',
    year: 2024,
    category: 'Super SUV',
    condition: 'Tokunbo (Foreign Used)',
    price: 245000000, // ₦245 Million
    originalPrice: 265000000,
    mileage: 8200,
    exteriorColor: 'Precious White Pearl with Black/Gold GR Decals',
    interiorColor: 'Black & Dark Red Smooth Leather with GR Emblems',
    transmission: 'Automatic',
    engine: '3.5L Twin-Turbo V6 (V35A-FTS)',
    horsepower: 409,
    acceleration0to60: 6.7,
    topSpeed: 210,
    fuelType: 'Petrol',
    images: [
      '/src/assets/images/car_grand_tourer_coupe_1794144700826.jpg',
      '/src/assets/images/car_luxury_suv_black_1794144700613.jpg'
    ],
    featured: false,
    status: 'Available',
    description: 'Certified Foreign Used (Tokunbo) direct import from Japan. The undisputed king of Nigerian interstate travel and rugged reliability. Equipped with electronic kinetic dynamic suspension (E-KDSS), front and rear differential locks, 360 multi-terrain monitor, and refrigerated cool box.',
    keyFeatures: [
      'Electronic Kinetic Dynamic Suspension System (E-KDSS)',
      'Front, Center & Rear Electronic Locking Differentials',
      'Cool Box in Center Console and JBL 14-Speaker Audio',
      'Full Genuine Customs Paperwork (SGD Verified on NCS Trade Portal)',
      'Underwent 140-Point Inspection at our Victoria Island Workshop'
    ],
    specifications: {
      vin: 'JTMHX01J4P800320N',
      drivetrain: 'Full-Time 4WD with Dual-Range Transfer Case',
      bodyStyle: 'Heavy-Duty Luxury SUV',
      doors: 5,
      warranty: '1-Year Aurelius Powertrain Warranty',
      location: 'Lekki Showroom Annex, Lagos',
      customsDuty: '100% Fully Cleared (Foreign Used Tokunbo C84 Attached)'
    }
  },
  {
    id: 'car-8',
    stockNumber: 'AUR-NG-210',
    title: 'Aston Martin DBS 770 Ultimate Coupe',
    brand: 'Aston Martin',
    model: 'DBS 770 Ultimate',
    year: 2025,
    category: 'Grand Tourer',
    condition: 'Brand New (Foreign Direct)',
    price: 720000000, // ₦720 Million
    mileage: 95,
    exteriorColor: 'Deep Sapphire Black with Satin Gold Forged Wheels',
    interiorColor: 'Havana Tan Leather with Carbon Sparco Seats',
    transmission: 'Dual-Clutch',
    engine: '5.2L Twin-Turbocharged V12',
    horsepower: 760,
    acceleration0to60: 3.2,
    topSpeed: 340,
    fuelType: 'Petrol',
    images: [
      '/src/assets/images/car_grand_tourer_coupe_1794144700826.jpg',
      '/src/assets/images/hero_showroom_luxury_1794144698125.jpg'
    ],
    featured: true,
    status: 'Reserved',
    description: 'One of just 300 DBS 770 Ultimate coupes worldwide, custom ordered for delivery in Lagos. 760 BHP V12 British symphony with carbon ceramic brakes and bespoke gold wheel package. Client currently processing registration with Lagos State MVAA for custom VIP number plate.',
    keyFeatures: [
      'Twin-Turbocharged 5.2-Liter V12 delivering 664 lb-ft Torque',
      'Solid Mounted Steering Column for Laser-Sharp Feedback',
      'Carbon Ceramic Brakes (410mm Front / 360mm Rear)',
      'Aston Martin Certified Global Provenance',
      'Enclosed Interstate Transport to any State Capital in Nigeria'
    ],
    specifications: {
      vin: 'SCFRTFAW4PG00210N',
      drivetrain: 'Rear-Wheel Drive with Mechanical Limited Slip Differential',
      bodyStyle: 'Grand Tourer Coupe',
      doors: 2,
      warranty: '2-Year Aston Martin Timeless Global Coverage',
      location: 'Victoria Island Flagship Showroom, Lagos',
      customsDuty: '100% Fully Paid with Port Assessment Papers'
    }
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'nigerian-customs-duty-verification-guide-2026',
    title: 'Navigating Nigerian Customs Duty Verification & SGD Validation for Luxury Imports in 2026',
    excerpt: 'Avoid impoundment and fraudulent paperwork. An essential guide for high-net-worth Nigerian buyers on authenticating Customs Form C84, Single Goods Declaration (SGD), and port assessment receipts.',
    content: `
      <h2>The Critical Importance of Genuine Customs Duty in Nigeria</h2>
      <p>For any luxury or exotic car buyer in Nigeria, authentic customs clearance documentation is not just a formality—it is the bedrock of your investment. With Nigerian Customs Service (NCS) operating integrated e-verification checkpoints along interstate expressways and Federal Operation Units (FOU), purchasing a vehicle with compromised duty papers risks outright seizure and severe penalties.</p>
      
      <p>At Aurelius Motors Nigeria, every vehicle in our inventory—whether Brand New Foreign Direct or Tokunbo Certified—comes with 100% genuine, fully verified documentation directly logged into the NCS automated portal.</p>

      <blockquote>
        "A luxury motorcar without verified customs documentation is a liability. Discerning buyers in Victoria Island and Maitama prioritize authentic C-Numbers and Single Goods Declarations (SGD) above all else."
      </blockquote>

      <h3>Key Documents Every Nigerian Luxury Buyer Must Verify</h3>
      <ul>
        <li><strong>Single Goods Declaration (SGD):</strong> The primary legal declaration showing the chassis number (VIN), port of entry (Tin Can, Apapa, PTML, or Onne), and exact tariff paid.</li>
        <li><strong>Customs Assessment Notice & Form C84:</strong> The itemized computation of import duty, surcharge, and ECOWAS trade levy.</li>
        <li><strong>Bank Payment Receipt (Remita e-Invoice):</strong> Proof of full settlement directly to the Federal Government account.</li>
        <li><strong>Port Terminal Gate Pass:</strong> Confirming legal exit from authorized bonded terminals.</li>
      </ul>

      <p>Before making a wire transfer or taking delivery, Aurelius Motors provides physical copies and live QR portal verification so your legal team can validate duty status before release.</p>
    `,
    featuredImage: '/src/assets/images/hero_showroom_luxury_1794144698125.jpg',
    category: 'Import & Customs Advisory',
    author: {
      name: 'Babajide Adeleke',
      role: 'Director of Customs Compliance & Logistics'
    },
    readTime: '6 min read',
    publishedAt: '2026-03-24',
    status: 'Published',
    tags: ['Customs Duty', 'Nigeria Import', 'SGD Verification', 'Lagos Ports'],
    seo: {
      metaTitle: 'Nigerian Customs Duty Verification Guide 2026 | Aurelius Motors Nigeria',
      metaDescription: 'Essential guide to verifying genuine Nigerian Customs Duty, Form C84, and SGD documents for luxury car purchases in Lagos and Abuja.',
      focusKeyword: 'Nigerian customs duty car verification',
      canonicalUrl: 'https://aureliusmotors.ng/blog/nigerian-customs-duty-verification-guide-2026',
      noIndex: false
    }
  },
  {
    id: 'post-2',
    slug: 'armored-vehicles-b6-nigeria-executive-transport',
    title: 'CEN B6 Armoring in Nigeria: The Engineering Behind Executive Convoy Defense',
    excerpt: 'As executive mobility demands uncompromising security between Lagos Island, Abuja FCT, and oil-producing hubs, discover how ballistic B6 armor safeguards Nigerian leaders.',
    content: `
      <h2>The Standard of Defense in Nigerian Executive Mobility</h2>
      <p>From the bustling expressways of Lagos to long-distance interstate corridors connecting Abuja, Kaduna, and Port Harcourt, executive protection requires engineered survivability. CEN B6 ballistic armoring represents the gold standard for high-profile individuals, corporate executives, and state dignitaries.</p>

      <p>A properly certified B6 conversion does not simply add bulletproof glass; it requires a systemic re-engineering of the vehicle’s chassis, door hinges, brake calipers, and computerized suspension dynamics.</p>

      <h3>Key Architectural Features of Aurelius B6 Builds</h3>
      <ul>
        <li><strong>7.62x39mm AK-47 Protection:</strong> High-density ballistic steel overlapping all door seams, pillars, and roof panels to eliminate ballistic gap vulnerabilities.</li>
        <li><strong>39mm Multi-Layer Polycarbonate Glass:</strong> Curved glass with anti-spall interior shield that prevents glass splinters from entering the cabin under automatic fire.</li>
        <li><strong>Hutchinson Heavy-Duty Run-Flats:</strong> Solid composite inner rings allowing the vehicle to travel at 80 km/h for up to 50 kilometers even after all four tires are fully deflated.</li>
        <li><strong>Dual DM51 Floor Blast Defense:</strong> Reinforced floor plating engineered to dissipate simultaneous under-vehicle grenade detonations.</li>
      </ul>
    `,
    featuredImage: '/src/assets/images/car_luxury_suv_black_1794144700613.jpg',
    category: 'Ballistic Security',
    author: {
      name: 'Col. Danladi Umar (Rtd.)',
      role: 'Head of Armored Vehicles & Tactical Fleet'
    },
    readTime: '5 min read',
    publishedAt: '2026-03-15',
    status: 'Published',
    tags: ['Armored Car', 'B6 Protection', 'Nigeria Security', 'Escalade-V'],
    seo: {
      metaTitle: 'CEN B6 Armored Vehicles in Nigeria: Executive Transport Guide | Aurelius',
      metaDescription: 'Complete guide to B6 bulletproof luxury SUVs in Nigeria. Ballistic protection, run-flat tires, and blast defense engineered for Lagos and Abuja.',
      focusKeyword: 'armored cars nigeria B6',
      canonicalUrl: 'https://aureliusmotors.ng/blog/armored-vehicles-b6-nigeria-executive-transport',
      noIndex: false
    }
  },
  {
    id: 'post-3',
    slug: 'top-luxury-suvs-nigerian-terrains',
    title: 'Dominating Nigerian Roads: Why the G63 Brabus and Lexus LX 600 Reign Supreme',
    excerpt: 'Analyzing the unique automotive landscape of Nigeria, where immense presence, ground clearance, high-heat cooling packs, and prestige converge.',
    content: `
      <h2>The Unique Demands of Nigerian Luxury Motoring</h2>
      <p>Few automotive markets in the world demand as much versatility from a luxury motorcar as Nigeria. Drivers demand the speed and prestige of a Monaco boulevard alongside the suspension travel, wheel durability, and tropical cooling capacity required for rainy season flooding on Lekki-Epe expressway or highway expansion works in Abuja.</p>

      <p>The Mercedes-Benz G63 AMG (particularly tuned by Brabus) and the Lexus LX 600 VIP have emerged as the twin monarchs of Nigerian executive garages for distinct, compelling reasons.</p>
    `,
    featuredImage: '/src/assets/images/dealership_vip_lounge_1794144698439.jpg',
    category: 'Market Insights',
    author: {
      name: 'Chinedu Okonkwo',
      role: 'Senior Automotive Editor'
    },
    readTime: '4 min read',
    publishedAt: '2026-02-28',
    status: 'Published',
    tags: ['Lexus LX600', 'G63 AMG', 'Nigeria Supercars', 'Victoria Island'],
    seo: {
      metaTitle: 'Top Luxury SUVs for Nigerian Roads | Aurelius Motors Nigeria',
      metaDescription: 'Discover why the Mercedes G63 AMG Brabus and Lexus LX 600 are the undisputed luxury SUV choices for Nigerian roads and executives.',
      focusKeyword: 'luxury cars in nigeria',
      canonicalUrl: 'https://aureliusmotors.ng/blog/top-luxury-suvs-nigerian-terrains',
      noIndex: false
    }
  }
];

export const INITIAL_LEADS: LeadInquiry[] = [
  {
    id: 'lead-1',
    type: 'negotiation',
    carId: 'car-1',
    carTitle: 'Mercedes-Benz G63 AMG Brabus 800 Widestar Gold Crest',
    stockNumber: 'AUR-NG-901',
    customerName: 'Chief Femi Oladipo',
    email: 'f.oladipo@oladipo-energy.com',
    phone: '+234 803 555 0192',
    preferredContact: 'whatsapp',
    offeredPrice: 470000000, // ₦470 Million
    listedPrice: 495000000,
    deliveryState: 'Lagos (Ikoyi)',
    message: 'We are ready to pay full balance via GTBank or Zenith wire transfer once our legal team confirms the C-number on the NCS portal. Delivery to our residence on Alexander Avenue, Ikoyi.',
    status: 'negotiating',
    createdAt: '2026-03-27T10:15:00Z',
    dealerNotes: 'Client verified via private banking desk. Sent C-number documentation on WhatsApp.'
  },
  {
    id: 'lead-2',
    type: 'test_drive',
    carId: 'car-2',
    carTitle: 'Cadillac Escalade-V Armored B6 Executive Presidential Edition',
    stockNumber: 'AUR-NG-880',
    customerName: 'Senator Aliyu Garba',
    email: 'senator.aliyu@garba-invest.ng',
    phone: '+234 802 777 4433',
    preferredContact: 'call',
    deliveryState: 'Abuja FCT',
    message: 'Requesting private inspection at your Maitama Abuja vault this Friday with my chief security officer to inspect the ballistic certification and run-flats.',
    preferredDate: '2026-03-31',
    status: 'new',
    createdAt: '2026-03-27T08:42:00Z',
    dealerNotes: 'Abuja showroom director notified to arrange private viewing room.'
  },
  {
    id: 'lead-3',
    type: 'trade_in',
    customerName: 'Emeka Nwosu',
    email: 'emeka@nwosugroup.com',
    phone: '+234 818 999 1234',
    preferredContact: 'whatsapp',
    deliveryState: 'Rivers State (Port Harcourt)',
    message: 'Looking to swap my 2022 Lexus LX 570 Super Sport (Foreign Used Tokunbo, clean customs papers) toward the 2025 Lexus LX 600 VIP.',
    tradeInDetails: {
      make: 'Lexus',
      model: 'LX 570 Super Sport',
      year: 2022,
      mileage: 24000,
      condition: 'Pristine, 1st owner in Nigeria, fully cleared Lagos port duty',
      estimatedValue: 145000000,
      registrationType: 'Tokunbo (Foreign Used)',
      stateOfRegistration: 'Lagos'
    },
    status: 'contacted',
    createdAt: '2026-03-26T16:20:00Z',
    dealerNotes: 'Exchanged valuation photos on WhatsApp. Client sending car to Victoria Island for physical inspection.'
  },
  {
    id: 'lead-4',
    type: 'quote',
    carId: 'car-3',
    carTitle: 'Rolls-Royce Cullinan Series II Black Badge',
    stockNumber: 'AUR-NG-770',
    customerName: 'Alhaji Bashir Dantata',
    email: 'b.dantata@dantata-synergy.com',
    phone: '+234 803 111 2299',
    preferredContact: 'whatsapp',
    deliveryState: 'Kano State',
    message: 'Inquiring about total landed price including enclosed hydraulic flatbed transport from Lagos to our residence in Nassarawa GRA, Kano.',
    status: 'new',
    createdAt: '2026-03-26T11:05:00Z',
    dealerNotes: 'Calculated covered interstate transport with armed escort to Kano.'
  },
  {
    id: 'lead-5',
    type: 'newsletter',
    customerName: 'Tunde Bakare',
    email: 'tunde.bakare.capital@gmail.com',
    phone: '+234 809 333 4455',
    preferredContact: 'email',
    message: 'Subscribed to Aurelius Nigeria Private Client Exotic Allocations Digest.',
    status: 'closed',
    createdAt: '2026-03-25T14:30:00Z'
  }
];

export const STORAGE_KEYS = {
  CARS: 'aurelius_cars_ng_v4',
  BLOG_POSTS: 'aurelius_blog_posts_ng_v2',
  LEADS: 'aurelius_leads_ng_v2',
  SETTINGS: 'aurelius_settings_ng_v2',
  ADMIN_AUTH: 'aurelius_admin_auth_v1'
};

export function loadStoredData<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (err) {
    console.error(`Error loading storage key ${key}:`, err);
    return fallback;
  }
}

export function saveStoredData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving storage key ${key}:`, err);
  }
}
