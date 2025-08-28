import { Product, Industry, Service, Resource, JobOpening, CoreService, ServicePageContent, QualityData } from '../types';
import { PowerIcon, CogIcon, WrenchScrewdriverIcon, DocumentCheckIcon, CpuChipIcon, BoltIcon, ShieldCheckIcon, BeakerIcon, ArrowPathIcon, BuildingLibraryIcon, UsersIcon, MapIcon, BuildingOffice2Icon, SunIcon, GlobeAltIcon, RocketLaunchIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { seedImages } from './seed-images';
import {
  ClockIcon,         // For 'History' (represents time/heritage)
  CheckBadgeIcon,    // For 'Certifications' (represents verification/achievement)          // For 'Facilities' (represents locations/infrastructure; already in your original)
  ArrowRightIcon     // For the action (indicates "Know more →")
} from '@heroicons/react/24/outline';  // Use 'outline' for line-style icons; swap to '/solid' if preferred

export const headerNavLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Products', path: '/products' },
  { name: 'Industries', path: '/industries' },
  { name: 'Quality', path: '/quality' },
];

export const aboutUsMenuData = {
  links: [
    { name: 'History', path: '/about', icon: ClockIcon },
    { name: 'Certifications', path: '/about', icon: CheckBadgeIcon },
    { name: 'Facilities', path: '/about', icon: MapIcon },
  ],
  action: { name: 'Know more →', path: '/about' }
};

export const productsMenuData = {
  links: [
    { name: 'Distribution Transformers', description: '11–200 kV, ONAN/ONAF, BIS/IEC compliant', path: '/products/distribution-transformers' },
    { name: 'Solar Panels', description: 'Up to 5 MVA, ONAN/ONAF/ODAF, OLTC options', path: '/products/power-transformers' },
    // { name: 'Dry-Type Transformers', description: 'VPI/Cast-Resin, low maintenance, indoor use', path: '/products/dry-type-transformers' },
    // { name: 'Special Purpose', description: 'furnace, rectifier, earthing, isolation', path: '/products/special-purpose-transformers' },
  ],
  action: { name: 'View All Products →', path: '/products' }
};

export const industriesMenuData = {
  links: [
    { name: 'Utilities & Power Grid', path: '/industries', icon: GlobeAltIcon },
    { name: 'Renewable Energy', path: '/industries', icon: SunIcon },
    { name: 'Industrial & Manufacturing', path: '/industries', icon: BuildingOffice2Icon },
    { name: 'Infrastructure & Commercial', path: '/industries', icon: ShieldExclamationIcon },
  ],
  action: { name: 'Explore Industries →', path: '/industries' }
};

export const qualityMenuData = {
    links: [
        { name: 'Quality Assurance', path: '/quality#certifications', icon: ShieldCheckIcon },
        { name: 'Testing Facilities', path: '/quality#testing-facilities', icon: BeakerIcon },
        { name: 'Safety & Sustainability', path: '/quality#safety-sustainability', icon: ShieldExclamationIcon },
    ],
    action: { name: 'View Quality Manual →', path: '/quality' }
};

export const products: Product[] = [
    {
        id: 'distribution-transformers',
        name: 'Distribution Transformers',
        category: 'Oil-Immersed',
        shortDescription: 'Reliable and efficient power distribution for urban and rural networks.',
        imageUrl: seedImages.productYard,
        secondaryImageUrl: seedImages.productLoop.mp4,
        applications: ['Utilities', 'Residential', 'Commercial', 'Renewables'],
        features: ['BIS/IEC compliant designs', 'Low loss and high efficiency', 'Robust construction for long life', 'Wide range of fittings and accessories'],
        specifications: {
            'Capacity': 'Up to 5 MVA',
            'Voltage Class': 'Up to 36 kV',
            'Cooling': 'ONAN/ONAF',
            'Standards': 'IS 2026, IEC 60076',
            'Winding Material': 'Copper / Aluminum',
        }
    },
    {
    id: 'Solar-Panel',
    name: 'Solar Panels',
    category: 'Renewable Energy',
    shortDescription: 'Professional installation of rooftop and ground-mount solar panels, including grid tie-in, inverters, and electrical wiring for efficient renewable energy integration.',
    imageUrl: seedImages.solarPanel,
    applications: ['Residential Rooftops', 'Commercial Buildings', 'Ground-Mount Farms', 'Grid-Tied Systems'],
    features: ['High-efficiency PV modules with anti-reflective coating', 'DC-to-AC inverter integration', 'Weather-resistant mounting and wiring', 'Monitoring for performance optimization'],
    specifications: {
        'Capacity': 'Up to 500 kWp per installation',
        'Voltage Class': 'Up to 1000 V DC',
        'Cooling': 'Passive / Active (fan-assisted)',
        'Standards': 'IEC 61215, UL 1741, IEEE 1547',
        'Phases': 'Single / Three'
    }
},
    //  {
    //     id: 'dry-type-transformers',
    //     name: 'Dry-Type Transformers',
    //     category: 'Dry-Type',
    //     shortDescription: 'Safe, low-maintenance transformers for indoor and sensitive environments.',
    //     imageUrl: seedImages.productDryType,
    //     applications: ['Hospitals', 'Data Centers', 'Airports', 'High-rise Buildings', 'Marine'],
    //     features: ['Vacuum Pressure Impregnated (VPI) or Cast Resin', 'High fire safety (F1 class)', 'Low noise and maintenance-free', 'Environmentally friendly'],
    //     specifications: {
    //         'Capacity': 'Up to 20 MVA',
    //         'Voltage Class': 'Up to 36 kV',
    //         'Cooling': 'AN/AF',
    //         'Insulation Class': 'Class F / H',
    //         'Enclosure': 'IP21 to IP44',
    //     }
    // },
    //  {
    //     id: 'special-purpose-transformers',
    //     name: 'Special Purpose Transformers',
    //     category: 'Specialty',
    //     shortDescription: 'Custom-engineered transformers for unique industrial applications.',
    //     imageUrl: seedImages.productSpecial,
    //     applications: ['Steel Furnaces', 'Rectifier Units', 'Railways', 'Testing Labs', 'Earthing'],
    //     features: ['Designed for specific load cycles and harmonics', 'High mechanical strength for demanding conditions', 'Variety of configurations (e.g., furnace, rectifier, earthing)', 'Precision engineering for specific requirements'],
    //     specifications: {
    //         'Type': 'Furnace, Rectifier, Earthing, Isolation, etc.',
    //         'Capacity': 'As per customer requirement',
    //         'Voltage Class': 'As per customer requirement',
    //         'Standards': 'IEC, IS, and application-specific standards',
    //     }
    // }
];

export const coreServices: CoreService[] = [
  {
    id: 'dist-mfg',
    title: 'Distribution Transformer Manufacturing',
    imageUrl: seedImages.productYard,
    description: "Designing and manufacturing BIS/IEC-compliant distribution transformers for 11–33 kV networks.",
    details: ["kVA ranges up to 5 MVA", "Cooling: ONAN/ONAF", "Standards: BIS/IEC"],
    learnMoreUrl: '/services/distribution-transformer-manufacturing',
  },
  {
    id: 'power-line',
    title: 'Power Line Installation & Maintenance',
    imageUrl: seedImages.industriesGrid,
    description: "Turnkey overhead/underground line installation, upgrades, and preventive maintenance.",
    details: ["HT/LT lines", "Line patrol & thermography", "Outage response SLAs"],
    learnMoreUrl: '/services/power-line-installation-maintenance',
  },
  {
    id: 'solar',
    title: 'Solar Installation',
    imageUrl: seedImages.industriesRenewable,
    description: "Rooftop and ground-mount solar with grid tie-in and transformer integration.",
    details: ["EPC delivery", "Net metering compliance", "Performance monitoring"],
    learnMoreUrl: '/services/solar-installation',
  }
];

export const industries: Industry[] = [
    {
        name: 'Utilities & Power Grid',
        description: 'Providing robust and reliable transformers for national and regional power grids, ensuring stable energy transmission and distribution.',
        imageUrl: seedImages.industriesGrid
    },
    {
        name: 'Renewable Energy',
        description: 'Specialized transformers for solar and wind farms, designed to handle the unique demands of renewable power generation and grid integration.',
        imageUrl: seedImages.industriesRenewable
    },
    {
        name: 'Industrial & Manufacturing',
        description: 'Custom solutions for heavy industries like steel, cement, and chemical plants, engineered for durability in harsh operating environments.',
        imageUrl: seedImages.industriesIndustrial
    },
    {
        name: 'Infrastructure & Commercial',
        description: 'Powering critical infrastructure such as airports, data centers, hospitals, and commercial complexes with safe and efficient dry-type transformers.',
        imageUrl: seedImages.industriesInfra
    }
];

export const services: Service[] = [
  {
    id: 'installation-commissioning',
    path: '/services/installation-commissioning',
    title: 'Installation & Commissioning',
    description: 'Site-ready delivery, testing, and energization.',
    icon: React.createElement(CogIcon, { className: "h-6 w-6 text-blue-600" }),
  },
  {
    id: 'preventive-maintenance',
    path: '/services/preventive-maintenance',
    title: 'Preventive Maintenance',
    description: 'Routine checks, oil analysis, thermography.',
    icon: React.createElement(ShieldCheckIcon, { className: "h-6 w-6 text-blue-600" }),
  },
  {
    id: 'repairs-overhauls',
    path: '/services/repairs-overhauls',
    title: 'Repairs & Overhauls',
    description: 'Winding repair, core refurbishment, leak fixes.',
    icon: React.createElement(WrenchScrewdriverIcon, { className: "h-6 w-6 text-blue-600" }),
  },
  {
    id: 'testing-calibration',
    path: '/services/testing-calibration',
    title: 'Testing & Calibration',
    description: 'Routine, type, and special tests per IEC/IS.',
    icon: React.createElement(BeakerIcon, { className: "h-6 w-6 text-blue-600" }),
  },
  {
    id: 'retrofit-upgrades',
    path: '/services/retrofit-upgrades',
    title: 'Retrofit & Upgrades',
    description: 'OLTC retrofits, cooling upgrades, monitoring.',
    icon: React.createElement(ArrowPathIcon, { className: "h-6 w-6 text-blue-600" }),
  },
  {
    id: 'spares-consumables',
    path: '/services/spares-consumables',
    title: 'Spares & Consumables',
    description: 'Gaskets, bushings, oil, breathers, accessories.',
    icon: React.createElement(CpuChipIcon, { className: "h-6 w-6 text-blue-600" }),
  },
];

export const servicePageData: ServicePageContent[] = [
  {
    id: 'installation-commissioning',
    title: 'Installation & Commissioning',
    heroImage: seedImages.servicesTechnician,
    overview: 'Our expert team ensures your transformers are installed, tested, and energized safely and efficiently, guaranteeing optimal performance from day one. We handle everything from site preparation and delivery to final grid connection.',
    scopeOfWork: [
      'Full site supervision and project management.',
      'Pre-commissioning checks: insulation resistance, vector group, winding resistance.',
      'Oil filtration and filling under vacuum.',
      'Final energization and load testing to ensure operational readiness.',
      'Comprehensive handover documentation and training.',
    ],
    faqs: [
      { question: "Do you handle unloading and positioning?", answer: "Yes, our team is equipped to manage the complete process of unloading, shifting, and placing the transformer on its foundation." },
      { question: "What standards do you follow for testing?", answer: "All our commissioning tests are performed in strict accordance with IEC/IS standards and the client's specific technical requirements." },
      { question: "Is operator training included?", answer: "Yes, we provide basic operational and safety training to the client's personnel upon successful commissioning." },
    ]
  },
  {
    id: 'preventive-maintenance',
    title: 'Preventive Maintenance',
    heroImage: seedImages.qualityInspection,
    overview: 'Proactive maintenance is key to extending the life of your transformers and preventing costly downtime. Our comprehensive maintenance programs include routine checks, advanced diagnostics, and timely interventions.',
    scopeOfWork: [
        'Comprehensive annual maintenance contracts (AMCs).',
        'Dissolved Gas Analysis (DGA) of transformer oil to predict incipient faults.',
        'Infrared thermography to detect loose connections and overheating.',
        'Functional checks of protection devices, tap changers, and cooling systems.',
        'Cleaning of bushings and inspection of gaskets for leaks.'
    ],
    faqs: [
      { question: "How often should preventive maintenance be performed?", answer: "We recommend a comprehensive check at least once a year, with more frequent inspections for critical units or those in harsh environments." },
      { question: "What is Dissolved Gas Analysis (DGA)?", answer: "DGA is a diagnostic test on the insulating oil that can detect early signs of internal faults like overheating, arcing, or partial discharges, long before they become catastrophic failures." },
      { question: "Can you create a custom maintenance plan?", answer: "Absolutely. We tailor our maintenance schedules and activities to the specific type, age, and operational importance of your transformers." },
    ]
  },
  {
    id: 'repairs-overhauls',
    title: 'Repairs & Overhauls',
    heroImage: seedImages.factoryInterior,
    overview: 'From minor on-site repairs to complete factory overhauls, our state-of-the-art facilities and experienced engineers can restore your transformer to its peak condition, extending its service life and enhancing its reliability.',
    scopeOfWork: [
        'On-site and in-shop repairs for all transformer types and brands.',
        'Complete overhauls including coil rewinding, core refurbishment, and tank repairs.',
        'Replacement of bushings, gaskets, tap changers, and other critical components.',
        'Advanced diagnostics to identify root cause of failure.',
        'Full testing regimen post-repair to certify performance.'
    ],
    faqs: [
      { question: "Can you repair transformers from other manufacturers?", answer: "Yes, our team has extensive experience in repairing and overhauling transformers from a wide variety of domestic and international manufacturers." },
      { question: "What is the typical turnaround time for an overhaul?", answer: "Turnaround time varies depending on the extent of the repair needed, but we prioritize efficient workflows to minimize your equipment's downtime." },
      { question: "Is there a warranty on repairs?", answer: "Yes, all our repair and overhaul work is backed by a comprehensive warranty, giving you peace of mind." },
    ]
  },
  {
    id: 'testing-calibration',
    title: 'Testing & Calibration',
    heroImage: seedImages.qualityLab,
    overview: 'Our accredited testing laboratories are equipped with advanced, high-precision instruments to perform a full range of tests according to national and international standards. We provide accurate diagnostics and certification for all transformer types.',
    scopeOfWork: [
      'Full range of routine, type, and special electrical tests as per IS/IEC standards.',
      'Mobile testing units for on-site diagnostics and calibration.',
      'Third-party witness testing coordination and support.',
      'Insulating oil testing (BDV, moisture content, DGA).',
      'Calibration services for protection relays and monitoring equipment.'
    ],
    faqs: [
      { question: "Are your labs accredited?", answer: "Yes, our testing facilities are accredited by NABL (National Accreditation Board for Testing and Calibration Laboratories), ensuring precision and reliability." },
      { question: "Can you perform tests on-site?", answer: "We have mobile testing vans equipped to perform many routine and diagnostic tests directly at your facility, minimizing transport risks and downtime." },
      { question: "What is a 'type test'?", answer: "A type test is a comprehensive test performed on a new transformer design to verify its specifications and performance characteristics, such as temperature rise and impulse voltage withstand." },
    ]
  },
  {
    id: 'retrofit-upgrades',
    title: 'Retrofit & Upgrades',
    heroImage: seedImages.rdTeam,
    overview: 'Modernize your existing assets to improve performance, enhance safety, and comply with new regulations. Our retrofitting and upgrade solutions are a cost-effective way to extend the life and capability of your transformers.',
    scopeOfWork: [
        'Upgrading of protection relays and monitoring systems to modern digital equivalents.',
        'Retrofitting of On-Load Tap Changers (OLTCs) to improve voltage regulation.',
        'Enhancement of cooling systems (e.g., ONAN to ONAF) to increase capacity.',
        'Conversion to biodegradable, higher flash-point ester oil for improved fire safety.',
        'Addition of online monitoring systems for real-time health assessment.'
    ],
    faqs: [
      { question: "Is retrofitting more cost-effective than buying a new transformer?", answer: "In many cases, yes. Retrofitting can provide significant performance and safety improvements at a fraction of the cost of a full replacement, especially for larger transformers." },
      { question: "Can you add remote monitoring capabilities to my old transformer?", answer: "Yes, we can install modern IoT-based monitoring systems that provide real-time data on key parameters like temperature, oil level, and gas accumulation." },
      { question: "How much can a cooling upgrade increase capacity?", answer: "Depending on the original design, adding fans and pumps (ONAF/OFAF cooling) can increase a transformer's power handling capacity by 25-50%." },
    ]
  },
  {
    id: 'spares-consumables',
    title: 'Spares & Consumables',
    heroImage: seedImages.warehouse,
    overview: 'Ensure the longevity and reliability of your transformers with our comprehensive inventory of genuine spare parts and high-quality consumables. We provide fast-track delivery for critical components to minimize your downtime.',
    scopeOfWork: [
      'Genuine spare parts including bushings, tap changers, and protection devices (Buchholz relay, PRV).',
      'High-quality consumables like new transformer oil, silica gel for breathers, and gaskets.',
      'Complete sets of gaskets and seals for overhauls.',
      'Fast-track delivery for critical and emergency spares.',
      'Expert advice on identifying the correct spares for your specific transformer model.'
    ],
    faqs: [
      { question: "Do you stock spares for older models?", answer: "We maintain a large inventory of spares for a wide range of models, including many legacy units. If a part is not in stock, we can often source or manufacture it." },
      { question: "Why is it important to use genuine gaskets?", answer: "Using genuine, high-quality gaskets is critical to prevent oil leaks, which can lead to equipment failure, environmental hazards, and costly repairs. We supply gaskets made from the correct materials for long-term performance." },
      { question: "How quickly can I get an emergency spare part?", answer: "We offer expedited shipping options for emergency situations to help you get your equipment back online as quickly as possible." },
    ]
  },
];

export const qualityPageData: QualityData = {
  intro: 'Quality is not just a final check; it\'s a philosophy embedded in our entire manufacturing process. From raw material inspection to final product testing, every stage is governed by strict quality control protocols to ensure our products are safe, reliable, and built to last.',
  sections: [
    {
      id: 'testing-facilities',
      title: 'State-of-the-Art Testing Facilities',
      content: 'Our in-house, NABL-accredited laboratories are equipped with advanced, high-precision instruments to perform a full spectrum of tests, validating the design, performance, and long-term reliability of every transformer we produce.',
      points: [
        'High-Voltage Impulse Generators for lightning and switching surge tests.',
        'Temperature Rise Test Bay to verify thermal performance under load.',
        'Partial Discharge and Sound Level Measurement labs for insulation integrity and noise analysis.',
        'Full suite of equipment for all routine tests as per IEC 60076 and IS 2026.',
        'SFRA (Sweep Frequency Response Analysis) equipment for core and winding diagnostics.',
      ],
    },
    {
      id: 'certifications',
      title: 'Certifications & Quality Assurance',
      content: 'Our commitment to quality is validated by international certifications and a robust, multi-stage QA process. This documented system ensures consistency, traceability, and adherence to the highest standards from raw materials to final dispatch.',
      points: [
        'ISO 9001:2015 certified for Quality Management Systems.',
        'Incoming inspection of all critical raw materials (CRGO, copper, insulation).',
        'In-process checks at every stage of manufacturing: winding, core assembly, tanking.',
        'Final inspection and testing of every single unit before dispatch.',
        'Type test certificates from accredited independent labs like CPRI and ERDA.',
      ],
    },
    {
      id: 'safety-sustainability',
      title: 'Safety & Sustainability',
      content: 'We are committed to the safety of our employees, clients, and the environment. Our manufacturing processes are designed to minimize environmental impact, promote energy efficiency, and ensure our products operate safely throughout their long service life.',
      points: [
        'Adherence to strict electrical safety protocols (NFPA 70E) and occupational health standards (ISO 45001).',
        'ISO 14001 compliant environmental management system.',
        'Responsible handling, recycling, and disposal of waste oil and materials.',
        'Engineering designs that prioritize energy efficiency to reduce carbon footprint.',
        'Use of environmentally friendly materials and processes wherever feasible.',
      ],
    },
  ],
  downloads: [
    { title: 'Quality Manual 2024 (PDF)', url: '#' },
    { title: 'ISO 9001:2015 Certificate (PDF)', url: '#' },
    { title: 'ISO 14001:2015 Certificate (PDF)', url: '#' },
  ]
};

export const resources: Resource[] = [
    { title: 'Distribution Transformers Catalog 2024', type: 'Catalog', url: '#' },
    { title: 'Power Transformers Brochure', type: 'Brochure', url: '#' },
    { title: 'Dry-Type Transformers Technical Manual', type: 'Manual', url: '#' },
    { title: 'ISO 9001:2015 Certificate', type: 'Certificate', url: '#' },
    { title: 'CE Compliance Declaration', type: 'Certificate', url: '#' },
];

export const jobOpenings: JobOpening[] = [
    {
        title: 'Senior Electrical Design Engineer',
        location: 'Electra City, HQ',
        department: 'Engineering',
        description: 'Lead the design and development of next-generation power and distribution transformers. Requires 8+ years of experience.'
    },
    {
        title: 'Quality Assurance Manager',
        location: 'Electra City, HQ',
        department: 'Quality Control',
        description: 'Oversee all quality assurance protocols, manage the QA team, and ensure compliance with international standards.'
    },
    {
        title: 'Sales Manager - EMEA Region',
        location: 'Remote',
        department: 'Sales',
        description: 'Drive sales growth in the Europe, Middle East, and Africa region. Proven track record in industrial B2B sales required.'
    }
];