import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { industries } from '../constants/data';

const IndustriesPage: React.FC = () => {
  return (
    <div className="bg-[#f5efe4] text-[#6b6258]">
      {/* ── Dark hero ── */}
      <div className="bg-[#1a1814] pt-16 pb-12">
        <PageWrapper className="py-0">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl text-center" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Industries We Serve
          </h1>
          <p className="mt-6 text-xl text-[#6b6258] max-w-3xl mx-auto text-center">
            Delivering specialized transformer solutions to power critical sectors around the globe.
          </p>
        </PageWrapper>
      </div>

      {/* ── Alternating split layout ── */}
      <div className="max-w-screen-xl mx-auto">
        {industries.map((industry, index) => {
          const isEven = index % 2 === 1;
          const bgColor = isEven ? '#ede4d3' : '#f5efe4';
          return (
            <div
              key={industry.name}
              className="grid grid-cols-1 md:grid-cols-2 border-b border-[#ddd8cf] last:border-b-0"
              style={{ minHeight: 280 }}
            >
              {/* Image side */}
              <div
                className={`relative overflow-hidden ${isEven ? 'md:order-2' : 'md:order-1'}`}
                style={{ minHeight: 220 }}
              >
                <img
                  src={industry.imageUrl}
                  alt={industry.name}
                  className="w-full h-full object-cover"
                  style={{ position: 'absolute', inset: 0 }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                {/* Cream fade toward text side */}
                <div style={{
                  position: 'absolute',
                  top: 0, bottom: 0,
                  [isEven ? 'left' : 'right']: 0,
                  width: 72,
                  background: `linear-gradient(to ${isEven ? 'right' : 'left'}, ${bgColor}, transparent)`,
                  zIndex: 10,
                }} />
              </div>

              {/* Text side */}
              <div
                className={`px-10 py-12 flex flex-col justify-center ${isEven ? 'md:order-1' : 'md:order-2'}`}
                style={{ backgroundColor: bgColor }}
              >
                <div className="w-7 h-0.5 bg-[#2d5a3d] mb-3" />
                <div className="text-[9px] text-[#a09585] tracking-[0.25em] uppercase mb-3">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, fontWeight: 400, color: '#1a1814', lineHeight: 1.2, marginBottom: 14 }}>
                  {industry.name}
                </h2>
                <p className="text-sm text-[#6b6258] leading-7">
                  {industry.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 mt-6 text-[11px] tracking-[0.15em] uppercase text-[#2d5a3d] font-medium group"
                  style={{ width: 'fit-content' }}
                >
                  <span className="border-b border-[#2d5a3d]/30 group-hover:border-[#2d5a3d] transition-colors duration-300">Learn more</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndustriesPage;
