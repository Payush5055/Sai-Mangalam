import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { seedImages } from '../constants/seed-images';

const CERTS = [
  { name: 'ISO 9001:2015', sub: 'Quality Management' },
  { name: 'ISO 14001:2015', sub: 'Environmental Mgt.' },
  { name: 'CE Marking', sub: 'European Conformity' },
  { name: 'IEEE Standards', sub: 'Global Standards' },
];

const FACILITIES = [
  { src: seedImages.factoryInterior, alt: 'Modern factory interior with machinery',       cat: 'Assembly',  label: 'Main Factory Floor' },
  { src: seedImages.rdTeam,          alt: 'Research and Development Team collaborating',  cat: 'Windings',  label: 'Copper Winding Unit' },
  { src: seedImages.warehouse,       alt: 'Warehouse with stacked transformer components', cat: 'Storage', label: 'Component Warehouse' },
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#f5efe4] text-[#6b6258]">
      {/* ── Dark hero ── */}
      <div className="bg-[#1a1814] pt-16 pb-12">
        <PageWrapper className="py-0">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl text-center" style={{ fontFamily: "'Instrument Serif', serif" }}>
            About SaiMangalam Electrical &amp; Engineerings
          </h1>
          <p className="mt-6 text-xl text-[#6b6258] max-w-3xl mx-auto text-center">
            Pioneering transformer technology and delivering unparalleled quality and reliability for over 35 years.
          </p>
        </PageWrapper>
      </div>

      {/* ── History ── */}
      <div className="border-b border-[#ddd8cf]">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2" style={{ minHeight: 340 }}>
          <div className="px-8 py-12 flex flex-col justify-center">
            <div className="w-7 h-0.5 bg-[#2d5a3d] mb-3" />
            <div className="text-[9px] text-[#a09585] tracking-[0.25em] uppercase mb-3">Our History</div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, fontWeight: 400, color: '#1a1814', lineHeight: 1.2, marginBottom: 16 }}>
              Decades of engineering trust
            </h2>
            <p className="text-sm text-[#6b6258] leading-7 mb-3">
              Founded in 2019, SaiMangalam began with a vision to revolutionize the power industry. From a modest workshop, we have grown into a global manufacturing powerhouse, consistently pushing the boundaries of innovation.
            </p>
            <p className="text-sm text-[#6b6258] leading-7">
              Our journey is marked by significant milestones, from developing our first high-voltage transformer in the 90s to pioneering eco-friendly dry-type transformers in the 2000s. Today, we stand as a testament to engineering excellence and unwavering commitment to our clients.
            </p>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '0.5px solid #ddd8cf' }}>
              <div className="text-[9px] text-[#a09585] tracking-[0.25em] uppercase mb-3">Partners</div>
              <div className="text-[13px] text-[#1a1814] font-medium mb-1">Samir Patil</div>
              <div className="text-[11px] text-[#6b6258] mb-3">Partner &amp; Co-Founder</div>
              <div className="text-[13px] text-[#1a1814] font-medium mb-1">Dhananjay Chaudhari</div>
              <div className="text-[11px] text-[#6b6258]">Partner &amp; Co-Founder</div>
            </div>
          </div>
          <div className="relative overflow-hidden" style={{ minHeight: 280 }}>
            <img
              src={seedImages.factoryHistoric}
              alt="Historic SaiMangalam factory building"
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-[#f5efe4] to-transparent z-10" />
          </div>
        </div>
      </div>

      {/* ── Mission & Vision ── */}
      <div className="border-b border-[#ddd8cf]">
        <div className="max-w-screen-xl mx-auto px-8 pt-10 pb-2">
          <div className="w-7 h-0.5 bg-[#2d5a3d] mb-3" />
          <div className="text-[9px] text-[#a09585] tracking-[0.25em] uppercase mb-2">Our Purpose</div>
        </div>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#ddd8cf] border border-[#ddd8cf] mb-10">
          {/* Mission */}
          <div className="relative overflow-hidden group bg-[#f5efe4] p-8">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#2d5a3d] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <div className="text-[9px] text-[#a09585] tracking-[0.25em] uppercase mb-3">Mission</div>
            <h3 className="transition-colors duration-200 group-hover:text-[#2d5a3d]" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 20, color: '#1a1814', marginBottom: 12 }}>
              Our Mission
            </h3>
            <p className="text-sm text-[#6b6258] leading-7">
              To engineer and manufacture the world's most reliable and efficient transformers, empowering global progress through stable and sustainable energy solutions.
            </p>
            <div style={{ position: 'absolute', top: 12, right: 20, fontFamily: "'Instrument Serif', serif", fontSize: 72, color: '#1a1814', opacity: 0.04, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>01</div>
          </div>
          {/* Vision */}
          <div className="relative overflow-hidden group bg-[#ede4d3] p-8">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#2d5a3d] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <div className="text-[9px] text-[#a09585] tracking-[0.25em] uppercase mb-3">Vision</div>
            <h3 className="transition-colors duration-200 group-hover:text-[#2d5a3d]" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 20, color: '#1a1814', marginBottom: 12 }}>
              Our Vision
            </h3>
            <p className="text-sm text-[#6b6258] leading-7">
              To be the undisputed global leader in transformer technology, driving the future of energy with innovation, integrity, and a commitment to a greener planet.
            </p>
            <div style={{ position: 'absolute', top: 12, right: 20, fontFamily: "'Instrument Serif', serif", fontSize: 72, color: '#1a1814', opacity: 0.04, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>02</div>
          </div>
        </div>
      </div>

      {/* ── Manufacturing Facilities ── */}
      <div className="bg-[#ede4d3] px-8 py-10 border-t border-[#ddd8cf]">
        <div className="max-w-screen-xl mx-auto">
          <div className="w-7 h-0.5 bg-[#2d5a3d] mb-3" />
          <div className="text-[9px] text-[#a09585] tracking-[0.25em] uppercase mb-2">Manufacturing Facilities</div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 24, color: '#1a1814', marginBottom: 8 }}>
            Our manufacturing facilities
          </h2>
          <p className="text-sm text-[#6b6258] leading-7 mb-6 max-w-2xl">
            Purpose-built facilities spanning assembly, precision winding, and component storage — each optimised for quality and throughput.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#ddd8cf]">
            {FACILITIES.map((f) => (
              <div key={f.cat} className="relative overflow-hidden group cursor-pointer h-56">
                <img
                  src={f.src}
                  alt={f.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  style={{ objectPosition: 'center center' }}
                />
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#2d5a3d] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1814]/75 to-transparent group-hover:from-[#1a1814]/88 transition-all duration-400" />
                <div className="absolute top-3 right-3 w-6 h-6 border border-white/20 bg-white/10 flex items-center justify-center text-white/70 text-xs opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">↗</div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1.5 group-hover:translate-y-0 opacity-70 group-hover:opacity-100 transition-all duration-400">
                  <div className="text-[9px] text-white/45 tracking-[0.2em] uppercase mb-1">{f.cat}</div>
                  <div className="text-white text-sm" style={{ fontFamily: "'Instrument Serif', serif" }}>{f.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Certifications ── */}
      <div className="bg-[#f5efe4] px-8 py-10 border-t border-[#ddd8cf]">
        <div className="max-w-screen-xl mx-auto">
          <div className="w-7 h-0.5 bg-[#2d5a3d] mb-3" />
          <div className="text-[9px] text-[#a09585] tracking-[0.25em] uppercase mb-2">Compliance</div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 24, color: '#1a1814', marginBottom: 24 }}>
            Certifications &amp; Compliance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-[#ddd8cf]">
            {CERTS.map((c) => (
              <div key={c.name} className="relative overflow-hidden group bg-[#f5efe4] p-7 text-center hover:bg-[#ede4d3] transition-colors duration-300 cursor-default">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#2d5a3d] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="w-10 h-10 bg-[#e8f0ea] group-hover:bg-[#d0e4d4] rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110">
                  <CheckBadgeIcon className="h-5 w-5 text-[#2d5a3d]" />
                </div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 13, color: '#1a1814', marginBottom: 4 }}>{c.name}</div>
                <div className="text-[10px] text-[#a09585] tracking-[0.08em]">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
