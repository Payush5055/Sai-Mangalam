import React from 'react';
import { Link } from 'react-router-dom';

const SocialIcon: React.FC<{ href: string; label: string; children: React.ReactNode }> = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="liquid-glass rounded-full p-3 text-white/40 hover:text-[#c87941] hover:scale-110 transition-all duration-300 inline-flex items-center justify-center"
  >
    {children}
  </a>
);

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const Footer: React.FC = () => {
  return (
    <footer
      className="relative text-white circuit-pattern overflow-hidden"
      style={{ background: '#000000', borderTop: '1px solid rgba(200,121,65,0.12)' }}
    >
      <div className="relative z-10 max-w-screen-xl mx-auto pt-14 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/brand/Logo.jpg" alt="SaiMangalam Mark" className="h-10 w-10 rounded" />
              <span className="text-lg font-bold text-white leading-tight">SaiMangalam Electrical &amp; Engineerings</span>
            </Link>
            <p className="mt-4 text-white/50 text-sm">Powering reliable distribution for utilities, industry, and renewables.</p>
            <div className="mt-6 flex space-x-3">
              <SocialIcon href="#" label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-white/80 tracking-widest uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              {[
                { to: '/about',     label: 'About Us' },
                { to: '/products',  label: 'Products' },
                { to: '/#services', label: 'Services' },
                { to: '/contact',   label: 'Contact' },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-white/50 hover:text-white hover:pl-1 transition-all duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold text-white/80 tracking-widest uppercase">Resources</h3>
            <ul className="mt-4 space-y-3">
              {[
                { to: '/resources', label: 'Downloads' },
                { to: '/#services', label: 'Services' },
                { to: '/quality',   label: 'Quality & Compliance' },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-white/50 hover:text-white hover:pl-1 transition-all duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xs font-semibold text-white/80 tracking-widest uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-white/50 text-sm">
              <li className="flex items-start">
                <span className="font-semibold mr-2 shrink-0 text-[#c87941]">A:</span>
                SR.NO.253/2,PLOT NO 9,KUKDEL,SHIVAR,-PRAKASHA ROAD,SHAHADA,DIST-NANDURBAR 425409
              </li>
              <li>
                <a href="tel:+919881215798" className="hover:text-white flex items-start">
                  <span className="font-semibold mr-2 shrink-0 text-[#c87941]">P:</span>
                  <span>+91 9881215798</span>
                </a>
              </li>
              <li>
                <a href="mailto:saimangalam.electrical@gmail.com" className="hover:text-white flex items-start">
                  <span className="font-semibold mr-2 shrink-0 text-[#c87941]">E:</span>
                  <span>saimangalam.electrical@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xs font-semibold text-white/80 tracking-widest uppercase">Certifications</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                { label: 'ISO 9001', color: '#c87941' },
                { label: 'CE',       color: '#e8c49a' },
                { label: 'IEEE',     color: '#c87941' },
              ].map((cert) => (
                <div
                  key={cert.label}
                  className="liquid-glass rounded-full px-4 py-2 text-sm font-bold border"
                  style={{
                    color: cert.color,
                    borderColor: `${cert.color}50`,
                    boxShadow: `0 0 10px ${cert.color}30`,
                  }}
                >
                  {cert.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copper gradient divider */}
        <div className="mt-12 h-px" style={{ background: 'linear-gradient(to right, transparent, #c87941, #e8c49a, #c87941, transparent)' }} />

        {/* Copyright + back-to-top */}
        <div className="py-6 flex items-center justify-between">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} SaiMangalam Electrical &amp; Engineerings. All Rights Reserved.
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 text-xs font-medium text-white/40 hover:text-[#c87941] hover:scale-105 transition-all duration-200"
          >
            <span>Back to top</span>
            <span className="flex items-center justify-center h-8 w-8 rounded-full border border-white/10 hover:border-[#c87941] transition-colors">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
