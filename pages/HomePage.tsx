import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { coreServices, services } from '../constants/data';
import { CheckBadgeIcon, GlobeAltIcon, AcademicCapIcon, BoltIcon } from '@heroicons/react/24/outline';
import CoreServiceCard from '../components/CoreServiceCard';
import { seedImages } from '../constants/seed-images';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import gsap from 'gsap';
import { useMagneticEffect } from '../hooks/useMagneticEffect';

/* ─── Section Divider ─────────────────────────────────────────────────────── */
const SectionDivider: React.FC = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#2d5a3d]/20 to-transparent" />
);

/* ─── Hero Section ────────────────────────────────────────────────────────── */
const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const btn1Ref = useMagneticEffect<HTMLDivElement>();
  const btn2Ref = useMagneticEffect<HTMLDivElement>();

  // Video fade-in/out logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const fadeIn = () => {
      video.style.opacity = '0';
      video.play().catch(() => {});
      let start: number | null = null;
      const animateFadeIn = (ts: number) => {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / 500, 1);
        video.style.opacity = String(progress);
        if (progress < 1) requestAnimationFrame(animateFadeIn);
      };
      requestAnimationFrame(animateFadeIn);
    };

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && parseFloat(video.style.opacity ?? '1') > 0) {
        let start: number | null = null;
        const animateFadeOut = (ts: number) => {
          if (start === null) start = ts;
          const progress = Math.min((ts - start) / 500, 1);
          video.style.opacity = String(1 - progress);
          if (progress < 1) requestAnimationFrame(animateFadeOut);
        };
        requestAnimationFrame(animateFadeOut);
        video.style.opacity = '-1';
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => { video.currentTime = 0; fadeIn(); }, 100);
    };

    video.addEventListener('canplay', fadeIn, { once: true });
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('canplay', fadeIn);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // GSAP word-reveal hero text animations
  useEffect(() => {
    const h1 = headlineRef.current;
    if (!h1) return;

    // Wrap each word in overflow:hidden + animated inner div
    const wordWrappers = h1.querySelectorAll<HTMLSpanElement>('[data-word]');
    const innerDivs: HTMLSpanElement[] = [];

    wordWrappers.forEach(wrapper => {
      wrapper.style.display = 'inline-block';
      wrapper.style.overflow = 'hidden';
      const inner = wrapper.querySelector<HTMLSpanElement>('[data-word-inner]');
      if (inner) {
        inner.style.display = 'inline-block';
        inner.style.transform = 'translateY(100%)';
        innerDivs.push(inner);
      }
    });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(innerDivs,
      { y: '0%', stagger: 0.12, duration: 0.7, ease: 'power3.out' }
    );
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      0.5
    );
    tl.fromTo(buttonsRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0.8
    );
  }, []);

  return (
    <div className="relative text-white min-h-screen bg-black flex items-center hero-noise overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        src="/assets/transformer-hero.mp4"
        poster={seedImages.hero}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ opacity: 0, zIndex: 0 }}
        onError={(e) => { (e.target as HTMLVideoElement).style.display = 'none'; }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" style={{ zIndex: 2 }} />

      {/* Bottom fade into cream section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f4f1eb] to-transparent pointer-events-none" style={{ zIndex: 4 }} />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-0 w-full" style={{ position: 'relative', zIndex: 5 }}>
        <div className="max-w-2xl mx-auto text-center lg:text-left lg:mx-0">
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 border border-white/20 bg-white/10 text-white/80">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Trusted since 1985
          </div>

          <h1
            ref={headlineRef}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-white"
            style={{ fontFamily: "'Instrument Serif', serif", textShadow: '0 2px 40px rgba(0,0,0,0.6)' }}
          >
            <span data-word style={{ marginRight: '0.25em' }}>
              <span data-word-inner className="text-gradient">Create</span>
            </span>
            <span data-word style={{ marginRight: '0.25em' }}>
              <span data-word-inner>Future.</span>
            </span>
            <span data-word>
              <span data-word-inner className="text-gradient">Together</span>
            </span>
          </h1>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-white/80 mb-10"
            style={{ opacity: 0 }}
          >
            SaiMangalam engineers and manufactures high-performance transformers for utilities, industry, and renewable energy projects worldwide.
          </p>
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
            style={{ opacity: 0 }}
          >
            <div ref={btn1Ref}>
              <Link to="/products" className="block btn-primary w-full sm:w-auto text-center">
                Explore Our Products
              </Link>
            </div>
            <div ref={btn2Ref}>
              <Link to="/contact" className="block btn-secondary w-full sm:w-auto text-center rounded-lg">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  { label: 'Years of Excellence', value: 35,   suffix: '+', icon: '🏭' },
  { label: 'Projects Delivered',  value: 500,  suffix: '+', icon: '⚡' },
  { label: 'Quality Standard',    value: 9001, suffix: '', icon: '🏆', isStatic: true, display: 'ISO 9001' },
  { label: 'States Served',       value: 4,    suffix: '', icon: '🗺️' },
];

const StatsSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });

  return (
    <div ref={ref} className="relative bg-[#f4f1eb] overflow-hidden">
      <div className="relative z-10">
        <hr className="section-divider" />
        <PageWrapper className="py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statsData.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                className="bg-white border border-[#ddd8cf] rounded-xl p-5 text-center shadow-sm"
              >
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div
                  className="text-3xl md:text-4xl font-light text-[#1a1814]"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {stat.isStatic ? stat.display : (
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                  )}
                </div>
                <p className="mt-1 text-sm text-[#6b6258]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </PageWrapper>
        <hr className="section-divider" />
      </div>
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
  <div className="relative bg-[#eeeae2] overflow-hidden">
    <div className="relative z-10">
      <PageWrapper className="py-9 md:py-12 lg:py-16">
        <div className="text-center mb-12">
          <div className="w-12 h-0.5 bg-[#2d5a3d] mb-4 mx-auto" />
          <h2
            className="text-3xl font-bold sm:text-4xl text-[#1a1814] inline-block"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            What We Do
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[#6b6258]">
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
  </div>
);

/* ─── Service Card ────────────────────────────────────────────────────────── */
const ServiceCard: React.FC<{ service: typeof services[0] }> = ({ service }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    className="bg-white border border-[#ddd8cf] p-6 rounded-xl flex flex-col items-start text-left border-l-4 hover:border-l-[#2d5a3d] transition-all duration-300 shadow-sm"
    style={{ boxShadow: 'none' }}
  >
    <div
      className="flex justify-center items-center h-12 w-12 rounded-full mb-4 shrink-0 border border-[#2d5a3d]/20 transition-all duration-300"
      style={{ background: 'rgba(45,90,61,0.08)' }}
    >
      {React.cloneElement(service.icon, { className: 'h-6 w-6 text-[#2d5a3d]' })}
    </div>
    <h3 className="text-lg font-bold text-[#1a1814]">{service.title}</h3>
    <p className="mt-2 text-[#6b6258] flex-grow">{service.description}</p>
    <Link
      to={service.path}
      aria-label={`Learn more about ${service.title}`}
      className="mt-4 font-semibold text-[#2d5a3d] hover:underline flex items-center gap-1 group"
    >
      Learn more <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
    </Link>
  </motion.div>
);

const ServicesSection: React.FC = () => (
  <div id="services" className="relative bg-[#f4f1eb] overflow-hidden">
    <div className="relative z-10">
      <PageWrapper className="py-9 md:py-12 lg:py-16">
        <div className="text-center mb-12">
          <div className="w-12 h-0.5 bg-[#2d5a3d] mb-4 mx-auto" />
          <h2
            className="text-3xl font-bold sm:text-4xl text-[#1a1814]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[#6b6258]">
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
  </div>
);

/* ─── Why Choose Us ───────────────────────────────────────────────────────── */
const WhyChooseUs: React.FC = () => {
  const features = [
    { icon: <CheckBadgeIcon className="h-8 w-8 text-[#2d5a3d]" />, title: 'Certified Quality',       description: 'Adhering to the highest international standards (ISO, CE, IEEE) for guaranteed performance.' },
    { icon: <GlobeAltIcon   className="h-8 w-8 text-[#2d5a3d]" />, title: 'Global Presence',         description: 'Serving clients across continents with a robust supply chain and distribution network.' },
    { icon: <AcademicCapIcon className="h-8 w-8 text-[#2d5a3d]"/>, title: '35+ Years of Experience', description: 'Decades of industry leadership and technological innovation in transformer manufacturing.' },
    { icon: <BoltIcon       className="h-8 w-8 text-[#2d5a3d]" />, title: 'Custom Solutions',        description: 'Engineering expertise to design and build transformers tailored to your unique specifications.' },
  ];

  return (
    <div className="relative bg-[#eeeae2] overflow-hidden">
      <div className="relative z-10">
        <PageWrapper className="py-9 md:py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-12 h-0.5 bg-[#2d5a3d] mb-4" />
              <h2
                className="text-3xl font-bold sm:text-4xl text-[#1a1814]"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Why Choose <span className="text-[#2d5a3d]">SaiMangalam</span>?
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-[#6b6258]">
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
                      className="flex justify-center items-center h-12 w-12 rounded-full shrink-0 border border-[#2d5a3d]/20"
                      style={{ background: 'rgba(45,90,61,0.08)' }}
                    >
                      {feature.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-[#1a1814]">{feature.title}</h3>
                      <p className="mt-1 text-[#6b6258]">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src={seedImages.qualityLab}
                alt="Quality testing of transformers at SaiMangalam Electrical & Engineerings."
                className="rounded-xl shadow-lg border border-[#ddd8cf]"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
          </div>
        </PageWrapper>
      </div>
    </div>
  );
};

/* ─── Trust Badges Section ────────────────────────────────────────────────── */
const trustBadges = [
  { name: 'ISO 9001', sub: 'Quality Management',    color: '#2d5a3d', back: 'Certified quality management system ensuring consistent product excellence.' },
  { name: 'CE',       sub: 'European Conformity',   color: '#4a8c60', back: 'European safety, health, and environmental protection standards.' },
  { name: 'IEEE',     sub: 'Standards Compliant',   color: '#2d5a3d', back: 'Meets Institute of Electrical and Electronics Engineers specifications.' },
  { name: 'BIS',      sub: 'Bureau of Indian Std.', color: '#4a8c60', back: 'Certified by the Bureau of Indian Standards for domestic quality assurance.' },
];

const TrustBadgesSection: React.FC = () => (
  <div className="relative bg-[#f4f1eb] overflow-hidden">
    <div className="relative z-10">
      <hr className="section-divider" />
      <PageWrapper className="py-10 md:py-14">
        <div className="text-center mb-10">
          <div className="w-12 h-0.5 bg-[#2d5a3d] mb-4 mx-auto" />
          <h2
            className="text-2xl font-bold text-[#1a1814]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Our Certifications &amp; Standards
          </h2>
          <p className="mt-2 text-[#6b6258] text-sm">Hover each badge to learn more</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {trustBadges.map((badge) => (
            <div key={badge.name} className="badge-flip w-36 h-36">
              <div className="badge-flip-inner w-36 h-36">
                <div
                  className="badge-front w-36 h-36 bg-white border rounded-xl flex flex-col items-center justify-center"
                  style={{ border: `2px solid ${badge.color}30`, boxShadow: `0 4px 16px ${badge.color}15` }}
                >
                  <span className="text-2xl font-extrabold" style={{ color: badge.color }}>{badge.name}</span>
                  <span className="text-xs text-[#6b6258] mt-1 text-center px-2">{badge.sub}</span>
                </div>
                <div
                  className="badge-back w-36 h-36 rounded-xl flex items-center justify-center p-3 text-center text-xs text-white"
                  style={{ background: badge.color, border: `2px solid ${badge.color}` }}
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
  </div>
);

/* ─── Quality CTA Section ─────────────────────────────────────────────────── */
const QualityCTASection: React.FC = () => (
  <div className="relative overflow-hidden" style={{ backgroundColor: '#1a1814' }}>
    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(to right, #2d5a3d, #4ade80, #2d5a3d)' }} />
    <PageWrapper className="py-16 md:py-20 lg:py-24 relative z-10">
      <div className="text-center max-w-3xl mx-auto">
        <div className="w-12 h-0.5 bg-[#2d5a3d] mb-6 mx-auto" />
        <motion.h2
          className="text-3xl font-bold sm:text-5xl text-white inline-block"
          style={{ fontFamily: "'Instrument Serif', serif" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Committed to Uncompromising Quality
        </motion.h2>
        <p className="mt-6 text-lg text-white/60">
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
    <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(to right, #4ade80, #2d5a3d, #4ade80)' }} />
  </div>
);

/* ─── Page Assembly ───────────────────────────────────────────────────────── */
const HomePage: React.FC = () => {
  return (
    <div className="bg-[#f4f1eb]">
      <HeroSection />
      <SectionDivider />
      <StatsSection />
      <SectionDivider />
      <WhatWeDoSection />
      <SectionDivider />
      <ServicesSection />
      <SectionDivider />
      <WhyChooseUs />
      <SectionDivider />
      <TrustBadgesSection />
      <SectionDivider />
      <QualityCTASection />
    </div>
  );
};

export default HomePage;
