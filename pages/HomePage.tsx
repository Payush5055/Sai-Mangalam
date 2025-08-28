import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { coreServices, services } from '../constants/data';
import { CheckBadgeIcon, GlobeAltIcon, AcademicCapIcon, BoltIcon } from '@heroicons/react/24/outline';
import CoreServiceCard from '../components/CoreServiceCard';
import { seedImages } from '../constants/seed-images';
import { motion } from 'framer-motion';

const heroCards = [
  {
    title: 'Distribution Transformers',
    imageUrl: seedImages.productYard,
  },
  {
    title: 'Dry-Type Transformers',
    imageUrl: seedImages.productDryType,
  },
  {
    title: 'Special Purpose Transformers',
    imageUrl: seedImages.productSpecial,
  },
];

const HeroCardStack: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    const cardAnimationConfig = [
        // Bottom card
        {
            initial: { opacity: 0, y: 40, rotate: -12, scale: 0.9,height: '250px',
        width: '180px' },
            animate: {
                opacity: 1,
                y: isHovered ? -20 : 0,
                rotate: isHovered ? -18 : -6,
                x: isHovered ? -50 : 0,
                scale: 0.9,
            },
            // FIX: Explicitly cast 'spring' to a const to ensure TypeScript infers a literal type,
            // resolving the assignability error with framer-motion's `Transition` type.
            transition: { type: 'spring' as const, stiffness: 300, damping: 20, delay: 0.2 },
            className: "z-10"
        },
        // Middle card
        {
            initial: { opacity: 0, y: 40, scale: 0.95 ,height: '250px',  // Initial height (e.g., smaller on load)
        width: '180px'},
            animate: {
                opacity: 1,
                y: isHovered ? -40 : 0,
                rotate: isHovered ? 4 : 0,
                scale: 0.95,
            },
            transition: { type: 'spring' as const, stiffness: 300, damping: 20, delay: 0.1 },
            className: "z-20"
        },
        // Top card
        {
            initial: { opacity: 0, y: 40, rotate: 12, scale: 1,height: '250px',  // Initial height (e.g., smaller on load)
        width: '180px' },
            animate: {
                opacity: 1,
                y: isHovered ? -20 : 0,
                rotate: isHovered ? 18 : 6,
                x: isHovered ? 50 : 0,
                scale: 1,
            },
            transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
            className: "z-30"
        },
    ];

    return (
        <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative h-64 w-72"
        >
            {heroCards.map((card, index) => (
                 <motion.div
                    key={index}
                    className={`absolute inset-0 h-full w-full rounded-xl glass-surface overflow-hidden shadow-2xl ${cardAnimationConfig[index].className}`}
                    initial={cardAnimationConfig[index].initial}
                    animate={cardAnimationConfig[index].animate}
                    transition={cardAnimationConfig[index].transition}
                 >
                    <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h4 className="absolute bottom-4 left-4 text-white font-bold text-base">{card.title}</h4>
                </motion.div>
            ))}
        </motion.div>
    );
};

const HeroSection: React.FC = () => (
    <div className="relative text-white min-h-[300px] lg:h-[60vh] max-h-[500px] flex items-center">
        <div className="animated-glow"></div>
        <div className="absolute inset-0 overflow-hidden">
            <img 
                src={seedImages.hero}
                alt="High-voltage electrical substation at dusk"
                className="w-full h-full object-cover"
                width="1920"
                height="1080"
                fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent"></div>
        </div>
        <PageWrapper className="relative z-10 py-0 w-full">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 text-white">
                        <span className="text-accent">Create</span>. Future. <span className="text-accent">Together</span>.
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 mb-8">
                        SaiMangalam engineers and manufactures high-performance transformers for utilities, industry, and renewable energy projects worldwide.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/products" className="block btn-primary w-full sm:w-auto text-center">
                                Explore Our Products
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/contact" className="block btn-secondary w-full sm:w-auto text-center">
                                Request a Quote
                            </Link>
                        </motion.div>
                    </div>
                </div>
                <div className="hidden lg:flex items-center justify-center [perspective:1200px] h-full">
                    <HeroCardStack />
                </div>
            </div>
        </PageWrapper>
    </div>
);

const WhatWeDoSection: React.FC = () => (
    <div className="bg-transparent">
        <PageWrapper className="py-9 md:py-12 lg:py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-50 sm:text-4xl">What We Do</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
                    Focused solutions in power distribution and renewable integration.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coreServices.map((service) => (
                    <CoreServiceCard key={service.id} service={service} />
                ))}
            </div>
        </PageWrapper>
    </div>
);

const ServiceCard: React.FC<{ service: typeof services[0] }> = ({ service }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02, boxShadow: "0 0 25px rgba(31, 95, 191, 0.3)" }}
    transition={{ type: "spring", stiffness: 400, damping: 20 }}
    className="glass-surface p-6 rounded-xl flex flex-col items-start text-left"
  >
    <div className="flex justify-center items-center h-12 w-12 rounded-full bg-slate-700 mb-4 shrink-0 border border-slate-600">
      {/* FIX: Ensure service.icon is a valid ReactElement by correcting its type in `types.ts`. */}
      {React.cloneElement(service.icon, { className: "h-6 w-6 text-blue-400" })}
    </div>
    <h3 className="text-lg font-bold text-slate-100">{service.title}</h3>
    <p className="mt-2 text-slate-300 flex-grow">{service.description}</p>
    <Link 
      to={service.path}
      aria-label={`Learn more about ${service.title}`}
      className="mt-4 font-semibold text-blue-400 hover:underline flex items-center gap-1 group"
    >
      Learn more <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
    </Link>
  </motion.div>
);

const ServicesSection: React.FC = () => (
    <div id="services" className="bg-slate-900/50">
        <PageWrapper className="py-9 md:py-12 lg:py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-50 sm:text-4xl">Services</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
                    Lifecycle support from commissioning to overhaul.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </PageWrapper>
    </div>
);

const WhyChooseUs: React.FC = () => {
    const features = [
        {
            icon: <CheckBadgeIcon className="h-10 w-10 text-blue-400" />,
            title: 'Certified Quality',
            description: 'Adhering to the highest international standards (ISO, CE, IEEE) for guaranteed performance.'
        },
        {
            icon: <GlobeAltIcon className="h-10 w-10 text-blue-400" />,
            title: 'Global Presence',
            description: 'Serving clients across continents with a robust supply chain and distribution network.'
        },
        {
            icon: <AcademicCapIcon className="h-10 w-10 text-blue-400" />,
            title: '35+ Years of Experience',
            description: 'Decades of industry leadership and technological innovation in transformer manufacturing.'
        },
        {
            icon: <BoltIcon className="h-10 w-10 text-blue-400" />,
            title: 'Custom Solutions',
            description: 'Engineering expertise to design and build transformers tailored to your unique specifications.'
        }
    ];

    return (
         <div className="bg-transparent">
            <PageWrapper className="py-9 md:py-12 lg:py-16">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-50 sm:text-4xl">Why Choose SaiMangalam?</h2>
                        <p className="mt-4 max-w-2xl text-lg text-slate-300">
                            We are the trusted partner for industries that demand reliability and performance. Our commitment to quality, innovation, and customer satisfaction sets us apart.
                        </p>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.slice(0,4).map((feature, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="flex justify-center items-center h-12 w-12 rounded-full bg-slate-800/50 border border-slate-700 shrink-0">
                                       {feature.icon}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-bold text-slate-100">{feature.title}</h3>
                                        <p className="mt-1 text-slate-400">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <img src={seedImages.qualityLab} alt="Quality testing of transformers at SaiMangalam Electrical & Engineerings." className="rounded-xl shadow-lg border border-slate-700"/>
                    </div>
                </div>
            </PageWrapper>
        </div>
    );
};

const QualityCTASection: React.FC = () => (
    <div className="bg-slate-900/50">
        <PageWrapper className="py-9 md:py-12 lg:py-16">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-50 sm:text-4xl">Committed to Uncompromising Quality</h2>
                <p className="mt-4 text-lg text-slate-300">
                    Our quality philosophy is embedded in every step of our process. We adhere to stringent international standards and hold key certifications, ensuring every transformer we deliver is a benchmark of reliability and safety.
                </p>
                <div className="mt-8">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                        <Link 
                            to="/quality" 
                            className="inline-block btn-primary"
                        >
                            Learn More About Our Quality
                        </Link>
                    </motion.div>
                </div>
            </div>
        </PageWrapper>
    </div>
);

const HomePage: React.FC = () => {
    return (
        <div>
            <HeroSection />
            <WhatWeDoSection />
            <ServicesSection />
            <WhyChooseUs />
            <QualityCTASection />
        </div>
    );
};

export default HomePage;