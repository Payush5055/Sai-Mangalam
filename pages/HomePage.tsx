import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { coreServices, services } from '../constants/data';
import { CheckBadgeIcon, GlobeAltIcon, AcademicCapIcon, BoltIcon } from '@heroicons/react/24/outline';
import CoreServiceCard from '../components/CoreServiceCard';
import { seedImages } from '../constants/seed-images';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const heroCards = [
  { title: 'Distribution Transformers', imageUrl: seedImages.productYard },
  { title: 'Dry-Type Transformers',     imageUrl: seedImages.productDryType },
  { title: 'Special Purpose Transformers', imageUrl: seedImages.productSpecial },
];

/* ─── Hero Card Stack ─────────────────────────────────────────────────────── */
const HeroCardStack: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const cardAnimationConfig = [
    {
      initial: { opacity: 0, y: 40, rotate: -12, scale: 0.9, height: '250px', width: '180px' },
      animate: { opacity: 1, y: isHovered ? -20 : 0, rotate: isHovered ? -18 : -6, x: isHovered ? -50 : 0, scale: 0.9 },
      transition: { type: 'spring' as const, stiffness: 300, damping: 20, delay: 0.2 },
      className: 'z-10',
    },
    {
      initial: { opacity: 0, y: 40, scale: 0.95, height: '250px', width: '180px' },
      animate: { opacity: 1, y: isHovered ? -40 : 0, rotate: isHovered ? 4 : 0, scale: 0.95 },
      transition: { type: 'spring' as const, stiffness: 300, damping: 20, delay: 0.1 },
      className: 'z-20',
    },
    {
      initial: { opacity: 0, y: 40, rotate: 12, scale: 1, height: '250px', width: '180px' },
      animate: { opacity: 1, y: isHovered ? -20 : 0, rotate: isHovered ? 18 : 6, x: isHovered ? 50 : 0, scale: 1 },
      transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
      className: 'z-30',
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <h4 className="absolute bottom-4 left-4 text-white font-bold text-base">{card.title}</h4>
        </motion.div>
      ))}
    </motion.div>
  );
};

/* ─── Floating Particle Dots ──────────────────────────────────────────────── */
const FloatingDots: React.FC = () => {
  const dots = [
    { size: 4, top: '15%', left: '8%', delay: '0s', dur: '4s' },
    { size: 6, top: '70%', left: '12%', delay: '1s', dur: '5s' },
    { size: 3, top: '30%', left: '85%', delay: '0.5s', dur: '3.5s' },
    { size: 5, top: '80%', left: '75%', delay: '2s', dur: '6s' },
    { size: 4, top: '50%', left: '92%', delay: '1.5s', dur: '4.5s' },
    { size: 3, top: '20%', left: '60%', delay: '0.8s', dur: '5.5s' },
    { size: 6, top: '65%', left: '40%', delay: '2.5s', dur: '3.8s' },
  ];
  return (
    <>
      {dots.map((d, i) => (
        <span
          key={i}
          className="floating-dot"
          style={{
            width: d.size,
            height: d.size,
            top: d.top,
            left: d.left,
            animationDelay: d.delay,
            animationDuration: d.dur,
            opacity: 0.5,
          }}
        />
      ))}
    </>
  );
};

/* ─── Animated SVG Lightning Bolt ─────────────────────────────────────────── */
const LightningBolt: React.FC = () => (
  <svg
    className="absolute right-8 top-8 opacity-10 pointer-events-none select-none"
    width="220" height="380" viewBox="0 0 220 380" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <motion.path
      d="M140 10 L60 200 L110 200 L80 370 L180 160 L120 160 L160 10 Z"
      fill="url(#bolt-grad)"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.8, ease: 'easeOut', delay: 0.3 }}
    />
    <defs>
      <linearGradient id="bolt-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
  </svg>
);

/* ─── Hero Section ────────────────────────────────────────────────────────── */
const HeroSection: React.FC = () => (
  <div className="relative text-white min-h-[300px] lg:h-[60vh] max-h-[500px] flex items-center hero-noise overflow-hidden">
    <div className="animated-glow" />
    <FloatingDots />
    <LightningBolt />

    {/* Hero image */}
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={seedImages.hero}
        alt="High-voltage electrical substation at dusk"
        className="w-full h-full object-cover"
        width="1920" height="1080"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1e]/90 via-[#0a0f1e]/65 to-transparent" />
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>

    <PageWrapper className="relative z-10 py-0 w-full">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            <span className="text-gradient">Create</span>
            <span className="text-white">. Future. </span>
            <span className="text-gradient">Together</span>
            <span className="text-white">.</span>
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

/* ─── Animated Counter ────────────────────────────────────────────────────── */
interface CounterProps { target: number; suffix?: string; isVisible: boolean; }
const AnimatedCounter: React.FC<CounterProps> = ({ target, suffix = '', isVisible }) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isVisible || started.current) return;
    started.current = true;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [isVisible, target]);

  return <span>{count}{suffix}</span>;
};

/* ─── Stats Section ───────────────────────────────────────────────────────── */
const statsData = [
  { label: 'Years of Excellence', value: 35, suffix: '+', icon: '🏭' },
  { label: 'Projects Delivered',  value: 500, suffix: '+', icon: '⚡' },
  { label: 'Quality Standard',    value: 9001, suffix: '', icon: '🏆', isStatic: true, display: 'ISO 9001' },
  { label: 'States Served',       value: 4,  suffix: '',  icon: '🗺️' },
];

const StatsSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className="relative"
      style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.07) 0%, rgba(245,158,11,0.05) 100%)' }}
    >
      <hr className="section-divider" />
      <PageWrapper className="py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.55, ease: 'easeOut' }}
              className="glass-surface rounded-xl p-5 text-center"
            >
              <div className="text-3xl mb-1">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-extrabold text-gradient">
                {stat.isStatic ? stat.display : (
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                )}
              </div>
              <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </PageWrapper>
      <hr className="section-divider" />
    </div>
  );
};

/* ─── What We Do Section ──────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const WhatWeDoSection: React.FC = () => (
  <div className="bg-transparent">
    <PageWrapper className="py-9 md:py-12 lg:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold sm:text-4xl text-gradient inline-block">What We Do</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
          Focused solutions in power distribution and renewable integration.
        </p>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {coreServices.map((service) => (
          <motion.div key={service.id} variants={cardVariants}>
            <CoreServiceCard service={service} />
          </motion.div>
        ))}
      </motion.div>
    </PageWrapper>
  </div>
);

/* ─── Service Card ────────────────────────────────────────────────────────── */
const ServiceCard: React.FC<{ service: typeof services[0] }> = ({ service }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    className="glass-surface p-6 rounded-xl flex flex-col items-start text-left border-l-4 border-transparent hover:border-amber-500 transition-all duration-300"
    style={{ boxShadow: 'none' }}
    whileInView={{ opacity: 1 }}
  >
    <div
      className="flex justify-center items-center h-12 w-12 rounded-full mb-4 shrink-0 border border-amber-500/30 transition-all duration-300"
      style={{ background: 'rgba(245,158,11,0.08)' }}
    >
      {React.cloneElement(service.icon, { className: 'h-6 w-6 text-amber-400' })}
    </div>
    <h3 className="text-lg font-bold text-slate-100">{service.title}</h3>
    <p className="mt-2 text-slate-300 flex-grow">{service.description}</p>
    <Link
      to={service.path}
      aria-label={`Learn more about ${service.title}`}
      className="mt-4 font-semibold text-sky-400 hover:underline flex items-center gap-1 group"
    >
      Learn more <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
    </Link>
  </motion.div>
);

const ServicesSection: React.FC = () => (
  <div id="services" style={{ background: 'rgba(13,21,38,0.6)' }}>
    <PageWrapper className="py-9 md:py-12 lg:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: '#f8fafc' }}>Services</h2>
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

/* ─── Why Choose Us ───────────────────────────────────────────────────────── */
const WhyChooseUs: React.FC = () => {
  const features = [
    { icon: <CheckBadgeIcon className="h-8 w-8 text-amber-400" />, title: 'Certified Quality',        description: 'Adhering to the highest international standards (ISO, CE, IEEE) for guaranteed performance.' },
    { icon: <GlobeAltIcon   className="h-8 w-8 text-amber-400" />, title: 'Global Presence',          description: 'Serving clients across continents with a robust supply chain and distribution network.' },
    { icon: <AcademicCapIcon className="h-8 w-8 text-amber-400"/>, title: '35+ Years of Experience',  description: 'Decades of industry leadership and technological innovation in transformer manufacturing.' },
    { icon: <BoltIcon       className="h-8 w-8 text-amber-400" />, title: 'Custom Solutions',         description: 'Engineering expertise to design and build transformers tailored to your unique specifications.' },
  ];

  return (
    <div className="bg-transparent">
      <PageWrapper className="py-9 md:py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Why Choose <span className="text-gradient">SaiMangalam</span>?
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              We are the trusted partner for industries that demand reliability and performance. Our commitment to quality, innovation, and customer satisfaction sets us apart.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="flex justify-center items-center h-12 w-12 rounded-full shrink-0 border border-amber-500/30 glow-amber"
                    style={{ background: 'rgba(245,158,11,0.1)' }}
                  >
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-slate-100">{feature.title}</h3>
                    <p className="mt-1 text-slate-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src={seedImages.qualityLab}
              alt="Quality testing of transformers at SaiMangalam Electrical & Engineerings."
              className="rounded-xl shadow-lg border border-sky-500/20 glow-blue"
            />
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

/* ─── Trust Badges Section ────────────────────────────────────────────────── */
const trustBadges = [
  { name: 'ISO 9001', sub: 'Quality Management',     color: '#0ea5e9', back: 'Certified quality management system ensuring consistent product excellence.' },
  { name: 'CE',       sub: 'European Conformity',    color: '#f59e0b', back: 'European safety, health, and environmental protection standards.' },
  { name: 'IEEE',     sub: 'Standards Compliant',    color: '#0ea5e9', back: 'Meets Institute of Electrical and Electronics Engineers specifications.' },
  { name: 'BIS',      sub: 'Bureau of Indian Std.',  color: '#f59e0b', back: 'Certified by the Bureau of Indian Standards for domestic quality assurance.' },
];

const TrustBadgesSection: React.FC = () => (
  <div style={{ background: 'rgba(13,21,38,0.5)' }}>
    <hr className="section-divider" />
    <PageWrapper className="py-10 md:py-14">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-100">Our Certifications &amp; Standards</h2>
        <p className="mt-2 text-slate-400 text-sm">Hover each badge to learn more</p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {trustBadges.map((badge) => (
          <div key={badge.name} className="badge-flip w-36 h-36">
            <div className="badge-flip-inner w-36 h-36">
              {/* Front */}
              <div
                className="badge-front w-36 h-36 glass-surface rounded-xl flex flex-col items-center justify-center"
                style={{ border: `2px solid ${badge.color}40`, boxShadow: `0 0 18px 2px ${badge.color}30` }}
              >
                <span className="text-2xl font-extrabold" style={{ color: badge.color }}>{badge.name}</span>
                <span className="text-xs text-slate-400 mt-1 text-center px-2">{badge.sub}</span>
              </div>
              {/* Back */}
              <div
                className="badge-back w-36 h-36 rounded-xl flex items-center justify-center p-3 text-center text-xs text-slate-200"
                style={{ background: `linear-gradient(135deg, ${badge.color}22, ${badge.color}44)`, border: `2px solid ${badge.color}60` }}
              >
                {badge.back}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
    <hr className="section-divider" />
  </div>
);

/* ─── Quality CTA Section ─────────────────────────────────────────────────── */
const QualityCTASection: React.FC = () => (
  <div className="relative overflow-hidden diagonal-stripes circuit-pattern" style={{ background: 'rgba(10,15,30,0.95)' }}>
    {/* Bold accent gradient line top */}
    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(to right, #0ea5e9, #f59e0b, #0ea5e9)' }} />
    <PageWrapper className="py-16 md:py-20 lg:py-24 relative z-10">
      <div className="text-center max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl font-bold sm:text-5xl text-gradient inline-block"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Committed to Uncompromising Quality
        </motion.h2>
        <p className="mt-6 text-lg text-slate-300">
          Our quality philosophy is embedded in every step of our process. We adhere to stringent international standards and hold key certifications, ensuring every transformer we deliver is a benchmark of reliability and safety.
        </p>
        <div className="mt-10">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Link to="/quality" className="inline-block btn-primary px-10 py-4 text-lg">
              Learn More About Our Quality
            </Link>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
    <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(to right, #f59e0b, #0ea5e9, #f59e0b)' }} />
  </div>
);

/* ─── Page Assembly ───────────────────────────────────────────────────────── */
const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <WhatWeDoSection />
      <ServicesSection />
      <WhyChooseUs />
      <TrustBadgesSection />
      <QualityCTASection />
    </div>
  );
};

export default HomePage;
