import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { seedImages } from '../constants/seed-images';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Hero ───────────────────────────────────────────────────────────────────── */
const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const wordInnerRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const fadeIn = () => {
      video.style.opacity = '0';
      video.play().catch(() => {});
      let start: number | null = null;
      const doFade = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / 800, 1);
        video.style.opacity = String(p * 0.85);
        if (p < 1) requestAnimationFrame(doFade);
      };
      requestAnimationFrame(doFade);
    };
    video.addEventListener('canplay', fadeIn, { once: true });
    return () => video.removeEventListener('canplay', fadeIn);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    if (eyebrowRef.current) {
      tl.fromTo(eyebrowRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    }
    const inners = wordInnerRefs.current.filter(Boolean);
    if (inners.length) {
      tl.fromTo(inners, { y: '100%' }, { y: '0%', duration: 0.9, stagger: 0.1, ease: 'power4.out' }, '-=0.3');
    }
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4');
    }
    if (buttonsRef.current) {
      tl.fromTo(buttonsRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
    }
  }, []);

  const words = [
    { text: 'Create.', italic: false },
    { text: 'Future.', italic: true, muted: true },
    { text: 'Together.', italic: false },
  ];

  return (
    <div className="relative text-white min-h-screen bg-[#0a0908] flex items-center overflow-hidden">
      <video
        ref={videoRef}
        src="/assets/Transformer_assembly_in_factory.mp4"
        poster={seedImages.hero}
        loop muted playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ opacity: 0, zIndex: 0 }}
        onError={(e) => { (e.target as HTMLVideoElement).style.display = 'none'; }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,9,8,0.88) 0%, rgba(10,9,8,0.55) 60%, rgba(10,9,8,0.25) 100%)', zIndex: 1 }} />
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: 'linear-gradient(to top, #f4f1eb, transparent)', zIndex: 4 }} />
      <div className="max-w-screen-xl mx-auto px-8 w-full relative" style={{ zIndex: 5 }}>
        <div className="max-w-lg">
          <div ref={eyebrowRef} className="flex items-center gap-2 mb-6" style={{ opacity: 0 }}>
            <span style={{ display: 'block', width: 16, height: '0.5px', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
              Electrical &amp; Engineerings · Est. 2019
            </span>
          </div>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, lineHeight: 1.0, letterSpacing: '-0.01em', margin: 0 }}>
            {words.map((w, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span
                  ref={el => { if (el) wordInnerRefs.current[i] = el; }}
                  style={{
                    display: 'block',
                    fontSize: 54,
                    color: w.muted ? 'rgba(255,255,255,0.4)' : '#ffffff',
                    fontStyle: w.italic ? 'italic' : 'normal',
                  }}
                >{w.text}</span>
              </span>
            ))}
          </h1>
          <p
            ref={subtitleRef}
            style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: 320, marginTop: 20, marginBottom: 32, opacity: 0 }}
          >
            SaiMangalam engineers and manufactures high-performance transformers for utilities, industry, and renewable energy.
          </p>
          <div ref={buttonsRef} className="flex items-center gap-3" style={{ opacity: 0 }}>
            <Link
              to="/products"
              style={{ background: '#fff', color: '#1a1814', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '10px 22px', display: 'inline-block' }}
              className="hover:bg-white/90 transition-colors"
            >
              Our Products
            </Link>
            <Link
              to="/contact"
              style={{ background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '9.5px 22px', border: '0.5px solid rgba(255,255,255,0.2)', display: 'inline-block' }}
              className="hover:border-white/40 hover:text-white/70 transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Marquee ────────────────────────────────────────────────────────────────── */
const MARQUEE_ITEMS = ['ISO 9001:2015', 'CE Certified', 'IEEE Standards', 'Founded 2017', '3000+ Projects', 'BIS/IEC Compliant', 'Shahada, Maharashtra', '8+ Years'];

const MarqueeSection: React.FC = () => (
  <div className="bg-[#eeeae2] border-y border-[#ddd8cf] py-3 overflow-hidden">
    <div className="marquee-scroll">
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
        <span key={i} className="flex items-center gap-2.5 shrink-0 mr-9" style={{ fontSize: 9, color: '#a09585', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#2d5a3d', opacity: 0.6, display: 'inline-block', flexShrink: 0 }} />
          {item}
        </span>
      ))}
    </div>
  </div>
);

/* ─── Stats ──────────────────────────────────────────────────────────────────── */
interface CounterProps { target: number; suffix?: string; isVisible: boolean; display?: string; }
const AnimatedCounter: React.FC<CounterProps> = ({ target, suffix = '', isVisible, display }) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!isVisible || started.current || !target) return;
    started.current = true;
    const steps = 60;
    let current = 0;
    const iv = setInterval(() => {
      current += target / steps;
      if (current >= target) { setCount(target); clearInterval(iv); }
      else setCount(Math.floor(current));
    }, 1800 / steps);
    return () => clearInterval(iv);
  }, [isVisible, target]);
  if (display) return <>{display}</>;
  return <>{count}{suffix}</>;
};

const STATS = [
  { label: 'Years of Excellence', value: 8,    suffix: '+' },
  { label: 'Projects Delivered',  value: 3000, suffix: '+' },
  { label: 'Quality Standard',    value: 0,    display: 'ISO 9001' },
  { label: 'States Served',       value: 1,    suffix: '' },
];

const StatsSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });
  return (
    <div ref={ref} className="bg-[#f4f1eb] border-b border-[#ddd8cf]">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={i} className={`px-7 py-6 ${i < STATS.length - 1 ? 'border-r border-[#ddd8cf]' : ''}`}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 36, color: '#1a1814', fontWeight: 400 }}>
              <AnimatedCounter target={s.value} suffix={s.suffix} isVisible={isVisible} display={s.display} />
            </div>
            <div style={{ fontSize: 9, color: '#a09585', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── FullBleed About ────────────────────────────────────────────────────────── */
const FullBleedSection: React.FC = () => {
  const headRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    [headRef, textRef].forEach((r, i) => {
      if (!r.current) return;
      gsap.fromTo(r.current, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.8 - i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: r.current, start: 'top 85%', once: true }
      });
    });
  }, []);
  return (
    <div className="relative overflow-hidden" style={{ height: 320 }}>
      <img src={seedImages.industriesGrid} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center bottom' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(244,241,235,0.97), rgba(244,241,235,0.80) 50%, transparent)' }} />
      <div className="absolute right-9 top-1/2 -translate-y-1/2 pointer-events-none select-none" style={{ fontFamily: "'Instrument Serif', serif", fontSize: 100, color: '#1a1814', opacity: 0.04 }}>2019</div>
      <div className="relative z-10 h-full flex flex-col justify-center max-w-screen-xl mx-auto px-9">
        <div style={{ maxWidth: 380 }}>
          <div className="eyebrow">About SaiMangalam</div>
          <h2 ref={headRef} style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, color: '#1a1814', fontWeight: 400, lineHeight: 1.15, marginTop: 8 }}>
            Engineering reliability<br />
            <span style={{ fontStyle: 'italic', color: '#6b6258' }}>for four decades</span>
          </h2>
          <p ref={textRef} style={{ fontSize: 12, color: '#6b6258', lineHeight: 1.75, marginTop: 12, marginBottom: 20 }}>
            From a single workshop in Shahada to serving utilities across Maharashtra — built on precision, quality, and trust.
          </p>
          <Link to="/about" className="split-link">Read our story</Link>
        </div>
      </div>
    </div>
  );
};

/* ─── Animated SVG Schematic ─────────────────────────────────────────────────── */
const AnimatedSchematic: React.FC = () => {
  const primaryRectRef = useRef<SVGRectElement>(null);
  const secondaryRectRef = useRef<SVGRectElement>(null);
  const primaryLinesRef = useRef<SVGLineElement[]>([]);
  const secondaryLinesRef = useRef<SVGLineElement[]>([]);
  const laminationLinesRef = useRef<SVGLineElement[]>([]);
  const labelsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: primaryRectRef.current, start: 'top 85%', once: true } });

    // Draw primary winding rect
    if (primaryRectRef.current) {
      gsap.set(primaryRectRef.current, { strokeDasharray: 300, strokeDashoffset: 300 });
      tl.to(primaryRectRef.current, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out' }, 0);
    }
    // Draw secondary winding rect
    if (secondaryRectRef.current) {
      gsap.set(secondaryRectRef.current, { strokeDasharray: 300, strokeDashoffset: 300 });
      tl.to(secondaryRectRef.current, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out' }, 0.3);
    }
    // Fade in copper lines
    if (primaryLinesRef.current.length) {
      gsap.set(primaryLinesRef.current, { opacity: 0 });
      tl.to(primaryLinesRef.current, { opacity: 1, stagger: 0.04, duration: 0.3, ease: 'power2.out' }, 0.5);
    }
    // Fade in secondary lines
    if (secondaryLinesRef.current.length) {
      gsap.set(secondaryLinesRef.current, { opacity: 0 });
      tl.to(secondaryLinesRef.current, { opacity: 1, stagger: 0.04, duration: 0.3, ease: 'power2.out' }, 0.5);
    }
    // Draw lamination lines
    if (laminationLinesRef.current.length) {
      laminationLinesRef.current.forEach(l => {
        const len = (l as SVGLineElement).getTotalLength ? 116 : 116;
        gsap.set(l, { strokeDasharray: len, strokeDashoffset: len });
      });
      tl.to(laminationLinesRef.current, { strokeDashoffset: 0, stagger: 0.03, duration: 0.4, ease: 'power2.out' }, 0.2);
    }
    // Fade up labels
    if (labelsRef.current) {
      gsap.set(labelsRef.current, { opacity: 0, y: 8 });
      tl.to(labelsRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1.8);
    }
  }, []);

  const copperLineOpacities = [0.4, 0.5, 0.6, 0.65, 0.7, 0.65, 0.6, 0.65, 0.7, 0.65, 0.6, 0.5, 0.6, 0.4];

  return (
    <svg viewBox="0 0 500 320" width="100%" height="100%" style={{ maxHeight: 320 }} aria-label="Transformer cross-section schematic">
      <defs>
        <marker id="arrowCopper" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#c87941" />
        </marker>
        <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#2d5a3d" />
        </marker>
        <style>{`
          @keyframes flowLeft { from { stroke-dashoffset: 28; } to { stroke-dashoffset: 0; } }
          @keyframes flowRight { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 28; } }
        `}</style>
      </defs>

      {/* Core block */}
      <rect x={180} y={40} width={140} height={240} rx={4} fill="#e5e1d8" stroke="#c5bfb5" strokeWidth={0.5} />
      <rect x={192} y={52} width={116} height={216} rx={3} fill="#f4f1eb" stroke="#ddd8cf" strokeWidth={0.5} />
      {Array.from({ length: 10 }, (_, i) => (
        <line
          key={i}
          ref={el => { if (el) laminationLinesRef.current[i] = el; }}
          x1={192} y1={72 + i * 20} x2={308} y2={72 + i * 20}
          stroke="#ddd8cf" strokeWidth={0.5}
        />
      ))}

      {/* Primary winding block */}
      <rect x={80} y={40} width={92} height={240} rx={4} fill="#fdf8f0" stroke="#c5bfb5" strokeWidth={1.5}
        ref={primaryRectRef} />
      {copperLineOpacities.map((op, i) => (
        <line
          key={i}
          ref={el => { if (el) primaryLinesRef.current[i] = el; }}
          x1={88} y1={56 + i * 16} x2={164} y2={56 + i * 16}
          stroke="#c87941" strokeWidth={1.5} opacity={op}
        />
      ))}

      {/* Secondary winding block */}
      <rect x={328} y={40} width={92} height={240} rx={4} fill="#f0f8f0" stroke="#c5bfb5" strokeWidth={1.5}
        ref={secondaryRectRef} />
      {copperLineOpacities.map((op, i) => (
        <line
          key={i}
          ref={el => { if (el) secondaryLinesRef.current[i] = el; }}
          x1={336} y1={56 + i * 16} x2={412} y2={56 + i * 16}
          stroke="#2d5a3d" strokeWidth={1.5} opacity={op}
        />
      ))}

      {/* Animated current paths */}
      <path d="M20,160 L74,160" stroke="#c87941" strokeWidth={2}
        strokeDasharray="8 6" markerEnd="url(#arrowCopper)"
        style={{ animation: 'flowLeft 1.5s linear infinite' }} />
      <path d="M426,160 L480,160" stroke="#2d5a3d" strokeWidth={2}
        strokeDasharray="8 6" markerEnd="url(#arrowGreen)"
        style={{ animation: 'flowRight 1.5s linear infinite' }} />

      {/* Labels */}
      <g ref={labelsRef}>
        {/* Core label */}
        <text x={250} y={170} textAnchor="middle" fontFamily="'Instrument Serif', serif" fontStyle="italic" fontSize={11} fill="#a09585">Steel core</text>
        <text x={250} y={184} textAnchor="middle" fontFamily="'Instrument Serif', serif" fontStyle="italic" fontSize={9} fill="#a09585">CRGO laminations</text>

        {/* Primary labels */}
        <text x={126} y={294} textAnchor="middle" fontSize={11} fill="#1a1814" fontWeight={500}>Primary</text>
        <text x={126} y={307} textAnchor="middle" fontSize={10} fill="#a09585">11 kV</text>

        {/* Secondary labels */}
        <text x={374} y={294} textAnchor="middle" fontSize={11} fill="#1a1814" fontWeight={500}>Secondary</text>
        <text x={374} y={307} textAnchor="middle" fontSize={10} fill="#a09585">433 V</text>

        {/* Arrow labels */}
        <text x={47} y={178} textAnchor="middle" fontSize={11} fill="#6b6258">AC Input</text>
        <text x={47} y={191} textAnchor="middle" fontSize={11} fill="#6b6258">11 kV</text>
        <text x={453} y={178} textAnchor="middle" fontSize={11} fill="#6b6258">AC Output</text>
        <text x={453} y={191} textAnchor="middle" fontSize={11} fill="#6b6258">433 V</text>
      </g>
    </svg>
  );
};

/* ─── Split 1: Transformers ──────────────────────────────────────────────────── */
const SplitSection1: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) gsap.fromTo(textRef.current, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: textRef.current, start: 'top 80%', once: true } });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgWrapRef.current;
    if (!container || !img) return;

    const handleMouseEnter = () => img.classList.remove('transformer-float');
    const handleMouseLeave = () => {
      img.style.transform = '';
      img.classList.add('transformer-float');
    };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      img.style.transform = `perspective(800px) rotateX(${y * -8}deg) rotateY(${x * 10}deg)`;
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousemove', handleMouseMove);
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#ddd8cf]" style={{ minHeight: 280 }}>
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ background: '#0a0c14', minHeight: '500px' }}
      >
        {/* Arc ring 1 */}
        <div className="transformer-arc transformer-arc-1" style={{
          width: 500, height: 300,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }} />

        {/* Arc ring 2 */}
        <div className="transformer-arc transformer-arc-2" style={{
          width: 600, height: 360,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          borderColor: 'rgba(100,160,255,0.15)',
          borderStyle: 'dashed',
        }} />

        {/* Glow blob */}
        <div className="transformer-glow" style={{
          width: 320, height: 200,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -40%)',
          background: 'radial-gradient(ellipse, rgba(60,120,255,0.2) 0%, transparent 70%)',
          animationDelay: '1s',
        }} />

        {/* Floating transformer image — fills panel, blends into dark bg */}
        <div ref={imgWrapRef} className="transformer-float" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <img
            src={seedImages.electric3DTransformer}
            alt="3D Distribution Transformer"
            style={{ mixBlendMode: 'lighten', width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

      </div>
      <div ref={textRef} className="bg-[#f4f1eb] px-10 py-10 flex flex-col justify-center">
        <div className="eyebrow">Manufacturing</div>
        <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: '#1a1814', fontWeight: 400, lineHeight: 1.2, marginTop: 8 }}>
          Distribution Transformer<br />
          <span style={{ fontStyle: 'italic', color: '#6b6258' }}>Manufacturing</span>
        </h3>
        <div className="flex flex-wrap mt-3 mb-3">
          {['16 kVA – 5 MVA', 'Oil-cooled', 'Dry-type', 'BIS/IEC'].map(t => <span key={t} className="spec-tag">{t}</span>)}
        </div>
        <p style={{ fontSize: 12, color: '#6b6258', lineHeight: 1.75, marginBottom: 20 }}>
          Custom-engineered transformers for 11–33 kV networks. Every unit tested to IEC/IS standards before delivery.
        </p>
        <Link to="/products" className="split-link">Learn more</Link>
      </div>
    </div>
  );
};

/* ─── Split 2: Solar ─────────────────────────────────────────────────────────── */
const SplitSection2: React.FC = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (imgRef.current) gsap.fromTo(imgRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: imgRef.current, start: 'top 85%', once: true } });
    if (textRef.current) gsap.fromTo(textRef.current, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: textRef.current, start: 'top 80%', once: true } });
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#ddd8cf]" style={{ minHeight: 280 }}>
      <div ref={textRef} className="bg-[#eeeae2] px-10 py-10 flex flex-col justify-center">
        <div className="eyebrow">Renewables</div>
        <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: '#1a1814', fontWeight: 400, lineHeight: 1.2, marginTop: 8 }}>
          Solar Installation<br />
          <span style={{ fontStyle: 'italic', color: '#6b6258' }}>&amp; Integration</span>
        </h3>
        <div className="flex flex-wrap mt-3 mb-3">
          {['Rooftop', 'Ground-mount', 'Net metering', 'EPC'].map(t => <span key={t} className="spec-tag">{t}</span>)}
        </div>
        <p style={{ fontSize: 12, color: '#6b6258', lineHeight: 1.75, marginBottom: 20 }}>
          End-to-end EPC — from site survey to panel installation, inverter setup, and transformer integration.
        </p>
        <Link to="/services/solar-installation" className="split-link">Learn more</Link>
      </div>
      <div className="relative overflow-hidden" style={{ minHeight: 200 }}>
        <img ref={imgRef} src={seedImages.solarSplit} alt="Solar installation" loading="lazy" className="w-full h-full object-cover" style={{ minHeight: 200, willChange: 'transform', objectPosition: 'center center' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      </div>
    </div>
  );
};

/* ─── Mosaic Services ────────────────────────────────────────────────────────── */
const MOSAIC = [
  {
    cat: 'On-site',
    title: 'Installation & Commissioning',
    sub: 'Site-ready delivery, testing, and energization.',
    img: seedImages.factoryInterior,
    objPos: 'center center',
    wide: true,
    path: '/contact',
  },
  {
    cat: 'Scheduled',
    title: 'Preventive Maintenance',
    sub: 'Oil analysis, thermography, routine checks.',
    img: seedImages.qualityLab,
    objPos: 'center center',
    wide: false,
    path: '/contact',
  },
  {
    cat: 'Quality',
    title: 'Testing & Calibration',
    sub: 'Routine, type, and special tests per IEC/IS.',
    img: seedImages.transformerTesting,
    objPos: 'center center',
    wide: false,
    path: '/quality',
  },
  {
    cat: 'Workshop',
    title: 'Repairs & Overhauls',
    sub: 'Winding repair, core refurbishment, leak fixes.',
    img: seedImages.qualityInspection,
    objPos: 'center top',
    wide: false,
    path: '/contact',
  },
];

const MosaicSection: React.FC = () => {
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-mosaic]'));
    gsap.fromTo(cards, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: grid, start: 'top 80%', once: true }
    });
  }, []);
  return (
    <div id="services" className="bg-[#eeeae2] px-8 py-10 border-t border-[#ddd8cf]">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: '#1a1814', fontWeight: 400 }}>
            Our <span style={{ fontStyle: 'italic', color: '#6b6258' }}>Services</span>
          </h2>
          <Link to="/services/distribution-transformer-manufacturing" style={{ fontSize: 10, color: '#2d5a3d', letterSpacing: '0.12em', textTransform: 'uppercase' }}>View all →</Link>
        </div>
        <div ref={gridRef} className="grid grid-cols-3 grid-rows-2 gap-[1px] bg-[#ddd8cf]">
          {/* Card 1 — col-span-2 row-span-1 */}
          <div data-mosaic="" onClick={() => navigate(MOSAIC[0].path)} className="col-span-2 row-span-1 bg-[#f4f1eb] relative overflow-hidden cursor-pointer group">
            <div className="overflow-hidden aspect-[2/1]">
              <img
                src={MOSAIC[0].img} alt={MOSAIC[0].title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ opacity: 1, willChange: 'transform', objectPosition: MOSAIC[0].objPos }}
              />
            </div>
            <div className="mosaic-arrow"><ArrowUpRightIcon style={{ width: 12, height: 12 }} /></div>
            <div className="px-4 py-3">
              <div style={{ fontSize: 9, color: '#a09585', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>{MOSAIC[0].cat}</div>
              <div style={{ fontSize: 13, color: '#1a1814', fontWeight: 500, marginBottom: 4 }}>{MOSAIC[0].title}</div>
              <div style={{ fontSize: 11, color: '#6b6258', lineHeight: 1.55 }}>{MOSAIC[0].sub}</div>
            </div>
          </div>
          {/* Card 4 — col-span-1 row-span-2 (placed before Card 2/3 for CSS grid) */}
          <div data-mosaic="" onClick={() => navigate(MOSAIC[3].path)} className="col-span-1 row-span-2 bg-[#f4f1eb] cursor-pointer group flex flex-col overflow-hidden">
            <div className="flex-1 overflow-hidden">
              <img
                src={MOSAIC[3].img} alt={MOSAIC[3].title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ opacity: 1, willChange: 'transform', objectPosition: 'center top' }}
              />
            </div>
            <div className="mosaic-arrow"><ArrowUpRightIcon style={{ width: 12, height: 12, color: '#2d5a3d' }} /></div>
            <div className="px-4 py-3 bg-[#f4f1eb]">
              <div style={{ fontSize: 9, color: '#a09585', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>{MOSAIC[3].cat}</div>
              <div style={{ fontSize: 13, color: '#1a1814', fontWeight: 500, marginBottom: 4 }}>{MOSAIC[3].title}</div>
              <div style={{ fontSize: 11, color: '#6b6258', lineHeight: 1.55 }}>{MOSAIC[3].sub}</div>
            </div>
          </div>
          {/* Card 2 — col-span-1 row-span-1 */}
          <div data-mosaic="" onClick={() => navigate(MOSAIC[1].path)} className="col-span-1 row-span-1 bg-[#f4f1eb] relative overflow-hidden cursor-pointer group">
            <div className="overflow-hidden aspect-[4/3]">
              <img
                src={MOSAIC[1].img} alt={MOSAIC[1].title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ opacity: 1, willChange: 'transform', objectPosition: MOSAIC[1].objPos }}
              />
            </div>
            <div className="mosaic-arrow"><ArrowUpRightIcon style={{ width: 12, height: 12 }} /></div>
            <div className="px-4 py-3">
              <div style={{ fontSize: 9, color: '#a09585', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>{MOSAIC[1].cat}</div>
              <div style={{ fontSize: 13, color: '#1a1814', fontWeight: 500, marginBottom: 4 }}>{MOSAIC[1].title}</div>
              <div style={{ fontSize: 11, color: '#6b6258', lineHeight: 1.55 }}>{MOSAIC[1].sub}</div>
            </div>
          </div>
          {/* Card 3 — col-span-1 row-span-1 */}
          <div data-mosaic="" onClick={() => navigate(MOSAIC[2].path)} className="col-span-1 row-span-1 bg-[#f4f1eb] relative overflow-hidden cursor-pointer group">
            <div className="overflow-hidden aspect-[4/3]">
              <img
                src={MOSAIC[2].img} alt={MOSAIC[2].title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ opacity: 1, willChange: 'transform', objectPosition: MOSAIC[2].objPos }}
              />
            </div>
            <div className="mosaic-arrow"><ArrowUpRightIcon style={{ width: 12, height: 12 }} /></div>
            <div className="px-4 py-3">
              <div style={{ fontSize: 9, color: '#a09585', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>{MOSAIC[2].cat}</div>
              <div style={{ fontSize: 13, color: '#1a1814', fontWeight: 500, marginBottom: 4 }}>{MOSAIC[2].title}</div>
              <div style={{ fontSize: 11, color: '#6b6258', lineHeight: 1.55 }}>{MOSAIC[2].sub}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Editorial List ─────────────────────────────────────────────────────────── */
const LIST_ITEMS = [
  { title: 'Distribution Transformer Manufacturing', sub: '16 kVA – 5 MVA · BIS/IEC',           tag: 'Mfg',     path: '/products' },
  { title: 'Solar Installation',                     sub: 'Rooftop & ground-mount · EPC',         tag: 'Solar',   path: '/services/solar-installation' },
  { title: 'Power Line Installation',                sub: 'HT/LT · Rural electrification',        tag: 'Infra',   path: '/services/power-line-installation-maintenance' },
  { title: 'Repairs & Overhauls',                    sub: 'Winding · Core · Insulation',          tag: 'Service', path: '/contact' },
  { title: 'Testing & Calibration',                  sub: 'IEC/IS · Routine · Type · Special',   tag: 'QA',      path: '/quality' },
];

const EditorialListSection: React.FC = () => {
  const headRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (headRef.current) gsap.fromTo(headRef.current, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true }
    });
    if (listRef.current) {
      const items = Array.from(listRef.current.querySelectorAll<HTMLElement>('[data-li]'));
      gsap.fromTo(items, { opacity: 0, x: -16 }, {
        opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out',
        scrollTrigger: { trigger: listRef.current, start: 'top 80%', once: true }
      });
    }
  }, []);
  return (
    <div className="bg-[#f4f1eb] px-8 py-10 border-t border-[#ddd8cf]">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <div className="accent-bar" />
          <div style={{ fontSize: 9, color: '#a09585', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>What We Do</div>
          <h2 ref={headRef} style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: '#1a1814', fontWeight: 400, lineHeight: 1.2 }}>
            Built for<br />
            <span style={{ fontStyle: 'italic', color: '#6b6258' }}>every scale</span>
          </h2>
          <p style={{ fontSize: 12, color: '#6b6258', lineHeight: 1.75, marginTop: 12, marginBottom: 20 }}>
            From rural electrification to industrial substations — transformers that last decades.
          </p>
          <div className="flex gap-2 flex-wrap">
            {['ISO 9001', 'Since 2019', 'BIS/IEC'].map(pill => (
              <span key={pill} style={{ fontSize: 9, background: 'rgba(45,90,61,0.07)', color: '#2d5a3d', padding: '4px 10px', letterSpacing: '0.1em' }}>{pill}</span>
            ))}
          </div>
        </div>
        <div ref={listRef} className="border-t border-[#c5bfb5]">
          {LIST_ITEMS.map((item, i) => (
            <Link key={i} to={item.path} data-li="" className="flex gap-3 py-3 border-b border-[#ddd8cf] last:border-b-0 items-center cursor-pointer group no-underline" style={{ textDecoration: 'none' }}>
              <span className="list-dot group-hover:scale-150 transition-transform mt-0" style={{ marginTop: 1 }} />
              <div className="flex-1">
                <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1814', transition: 'color 0.2s' }} className="group-hover:text-[#2d5a3d]">{item.title}</div>
                <div style={{ fontSize: 10, color: '#a09585', marginTop: 2, letterSpacing: '0.05em' }}>{item.sub}</div>
              </div>
              <span style={{ fontSize: 9, color: '#a09585', letterSpacing: '0.1em', textTransform: 'uppercase', flexShrink: 0 }}>{item.tag}</span>
              <ArrowUpRightIcon className="opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" style={{ width: 12, height: 12, color: '#2d5a3d' }} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Quality CTA ────────────────────────────────────────────────────────────── */
const QualityCTASection: React.FC = () => {
  const headRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!headRef.current) return;
    gsap.fromTo(headRef.current, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true }
    });
  }, []);
  return (
    <div className="bg-[#1a1814] py-14 px-8 text-center border-t" style={{ borderColor: 'rgba(221,216,207,0.15)' }}>
      <div className="max-w-screen-xl mx-auto">
        <div className="accent-bar mx-auto" />
        <h2 ref={headRef} style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: '#fff', fontWeight: 400 }}>
          Committed to Uncompromising Quality
        </h2>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', maxWidth: 420, margin: '8px auto 28px', lineHeight: 1.75 }}>
          Our quality philosophy is embedded in every step of our process. Stringent international standards ensure every transformer is a benchmark of reliability.
        </p>
        <Link
          to="/quality"
          style={{ background: '#fff', color: '#1a1814', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '10px 28px', display: 'inline-block' }}
          className="hover:bg-white/90 transition-colors"
        >
          Learn More About Our Quality
        </Link>
      </div>
    </div>
  );
};

/* ─── Page ───────────────────────────────────────────────────────────────────── */
const HomePage: React.FC = () => (
  <div className="bg-[#f4f1eb]">
    <HeroSection />
    <MarqueeSection />
    <StatsSection />
    <FullBleedSection />
    <SplitSection1 />
    <SplitSection2 />
    <MosaicSection />
    <EditorialListSection />
    <QualityCTASection />
  </div>
);

export default HomePage;
