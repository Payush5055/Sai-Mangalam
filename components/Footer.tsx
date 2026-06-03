import React from 'react';
import { Link } from 'react-router-dom';

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const Footer: React.FC = () => {
  return (
    <footer className="relative text-white overflow-hidden" style={{ background: '#1a1814' }}>
      <div className="max-w-screen-xl mx-auto px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-3">
            <img src="/brand/Logo.jpg" alt="SaiMangalam" className="h-9 w-9 rounded" />
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: '15px', fontWeight: 400, color: '#fff' }}>
              SaiMangalam
            </span>
          </Link>
          <p className="mt-4 text-[11px] text-white/40 leading-relaxed">
            Powering reliable distribution for utilities, industry, and renewables since 2019.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[9px] font-semibold text-white/40 tracking-[0.2em] uppercase mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {[
              { to: '/about',     label: 'About Us' },
              { to: '/products',  label: 'Products' },
              { to: '/#services', label: 'Services' },
              { to: '/contact',   label: 'Contact' },
            ].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-[12px] text-white/40 hover:text-white transition-colors duration-200">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-[9px] font-semibold text-white/40 tracking-[0.2em] uppercase mb-4">Resources</h3>
          <ul className="space-y-3">
            {[
              { to: '/resources', label: 'Downloads' },
              { to: '/quality',   label: 'Quality & Compliance' },
              { to: '/careers',   label: 'Careers' },
            ].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-[12px] text-white/40 hover:text-white transition-colors duration-200">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[9px] font-semibold text-white/40 tracking-[0.2em] uppercase mb-4">Contact</h3>
          <ul className="space-y-3 text-[12px] text-white/40">
            <li className="leading-relaxed">SR.NO.253/2, Kukdel, Shahada, Nandurbar 425409</li>
            <li>
              <a href="tel:+919881215798" className="hover:text-white transition-colors">+91 9881215798</a>
            </li>
            <li>
              <a href="mailto:saimangalam.electrical@gmail.com" className="hover:text-white transition-colors">saimangalam.electrical@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ background: '#111009' }}>
        <div className="max-w-screen-xl mx-auto px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-white/25">
            &copy; {new Date().getFullYear()} SaiMangalam Electrical &amp; Engineerings. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['ISO 9001', 'CE', 'IEEE', 'BIS'].map((cert) => (
              <span key={cert} className="text-[9px] text-white/30 tracking-[0.15em] uppercase">{cert}</span>
            ))}
          </div>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="text-[10px] text-white/25 hover:text-white/60 transition-colors tracking-widest uppercase"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
