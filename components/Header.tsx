import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import * as data from '../constants/data';
import { Bars3Icon, XMarkIcon, ChevronRightIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useMagneticEffect } from '../hooks/useMagneticEffect';

const panelDataMap: { [key: string]: any } = {
  'About Us': data.aboutUsMenuData,
  'Products': data.productsMenuData,
  'Industries': data.industriesMenuData,
  'Quality': data.qualityMenuData,
};

const certifications = ['ISO 9001', 'CE Certified', 'IEEE Standards', 'Founded 2019', 'BIS Compliant', 'NABL Tested'];



const Header: React.FC = () => {
  const ctaBtnRef = useMagneticEffect<HTMLDivElement>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [panelPosition, setPanelPosition] = useState({});
  const [mobilePanelsOpen, setMobilePanelsOpen] = useState<{ [key: string]: boolean }>({});

  const location = useLocation();
  const triggerRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
  const panelRef = useRef<HTMLDivElement | null>(null);
  const enterTimer = useRef<number | null>(null);
  const leaveTimer = useRef<number | null>(null);
  const panelInteractionRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobilePanelsOpen({});
    setActivePanel(null);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleMouseEnter = (panelName: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    enterTimer.current = window.setTimeout(() => { setActivePanel(panelName); }, 140);
  };

  const handleMouseLeave = (_isTrigger: boolean) => {
    if (enterTimer.current) clearTimeout(enterTimer.current);
    leaveTimer.current = window.setTimeout(() => {
      if (!panelInteractionRef.current) setActivePanel(null);
    }, 120);
  };

  const handleFocus = (panelName: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActivePanel(panelName);
  };

  const handlePanelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      const triggerButton = (triggerRefs.current[activePanel!]?.querySelector('a'));
      (triggerButton as HTMLElement)?.focus();
      setActivePanel(null);
    } else if (e.key === 'Tab' && panelRef.current) {
      const focusableElements = Array.from(panelRef.current.querySelectorAll('a, button')) as HTMLElement[];
      if (focusableElements.length === 0) return;
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        const triggerButton = (triggerRefs.current[activePanel!]?.querySelector('a'));
        (triggerButton as HTMLElement)?.focus();
        setActivePanel(null);
      }
    }
  };

  useLayoutEffect(() => {
    if (activePanel && triggerRefs.current[activePanel] && panelRef.current) {
      const triggerRect = triggerRefs.current[activePanel]!.getBoundingClientRect();
      const panelWidth = panelRef.current.offsetWidth;
      const viewportWidth = document.documentElement.clientWidth;
      let left = triggerRect.left + (triggerRect.width / 2) - (panelWidth / 2);
      left = Math.max(12, Math.min(left, viewportWidth - panelWidth - 12));
      setPanelPosition({ top: triggerRect.bottom + 12, left });
    }
  }, [activePanel]);

  const navLinkClasses = "relative flex items-center justify-center text-sm font-medium text-[#a09585] transition-colors duration-200 ease-in-out hover:text-[#1a1814] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5a3d] focus-visible:ring-offset-2 rounded-md nav-link-animated";

  const renderPanelContent = (panelName: string) => {
    const panelData = panelDataMap[panelName];
    if (!panelData) return null;
    const isProducts = panelName === 'Products';
    const gridCols = isProducts ? 'grid-cols-2' : 'grid-cols-1';
    return (
      <>
        <div className={`grid ${gridCols} gap-x-8 gap-y-1 text-[#4a4540]`}>
          {panelData.links.map((item: any) => (
            <Link key={item.name} to={item.path} className="group block p-3 -m-3 rounded-lg hover:bg-[#f5efe4] transition-colors duration-200" onClick={() => setActivePanel(null)}>
              <div className="flex items-start gap-4">
                {item.icon && (
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-[#ede4d3] rounded-lg shadow-sm border border-[#ddd8cf] group-hover:border-[#2d5a3d] transition-colors">
                    {React.createElement(item.icon, { className: 'h-6 w-6 text-[#2d5a3d]' })}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-[#1a1814]">{item.name}</p>
                  {item.description && <p className="text-sm text-[#6b6258]">{item.description}</p>}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 border-t border-white/10 pt-4">
          <Link to={panelData.action.path} className="font-semibold text-[#2d5a3d] hover:text-[#1e3e2a] hover:underline flex items-center gap-1" onClick={() => setActivePanel(null)}>
            {panelData.action.name}
          </Link>
        </div>
      </>
    );
  };

  const panelVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 500, damping: 30 } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15 } }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Top info bar */}
        <div className="hidden md:block overflow-hidden" style={{ background: '#1a1814', borderBottom: '1px solid rgba(45,90,61,0.2)' }}>
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
            <div className="flex items-center gap-x-5 text-xs text-white/50 shrink-0">
              <a href="tel:+919881215798" className="flex items-center gap-1.5 hover:text-[#86efac] transition-colors">
                <PhoneIcon className="h-3.5 w-3.5" />
                <span>+91 9881215798</span>
              </a>
              <a href="mailto:saimangalam.electrical@gmail.com" className="flex items-center gap-1.5 hover:text-[#86efac] transition-colors">
                <EnvelopeIcon className="h-3.5 w-3.5" />
                <span>saimangalam.electrical@gmail.com</span>
              </a>
            </div>
            <div className="overflow-hidden ml-6 flex-1 max-w-xs text-xs">
              <div className="marquee-track whitespace-nowrap">
                {[...certifications, ...certifications].map((cert, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 mr-8 font-medium" style={{ color: '#4ade80' }}>
                    <span className="inline-block w-1 h-1 rounded-full" style={{ background: '#4ade80', opacity: 0.7 }}></span>
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className={`transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-[#f5efe4]/95 backdrop-blur-sm border-b border-[#ddd8cf] shadow-[0_1px_12px_rgba(26,24,20,0.06)]' : 'bg-[#f5efe4] border-b border-[#ddd8cf]'}`}>
          <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center space-x-2 group">
                <img src="/brand/Logo.jpg" alt="SaiMangalam Electrical & Engineerings" className="h-9" />
                <span className="hidden sm:inline text-[#1a1814]" style={{ fontFamily: "'Instrument Serif', serif", fontSize: '16px', fontWeight: 400 }}>
                  SaiMangalam Electrical&nbsp;&amp; Engineerings
                </span>
              </Link>

              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-[#4a4540] hover:text-[#2d5a3d] focus:outline-none"
                  aria-controls="mobile-menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
              </div>

              <div className="hidden md:flex items-center">
                <ul className="flex items-center gap-x-2 lg:gap-x-4">
                  {data.headerNavLinks.map((link) => (
                    <motion.li
                      key={link.name}
                      ref={el => { triggerRefs.current[link.name] = el; }}
                      onMouseEnter={panelDataMap[link.name] ? () => handleMouseEnter(link.name) : undefined}
                      onMouseLeave={panelDataMap[link.name] ? () => handleMouseLeave(true) : undefined}
                      whileHover={{ y: -2 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <RouterNavLink
                        to={link.path}
                        onFocus={panelDataMap[link.name] ? () => handleFocus(link.name) : undefined}
                        onBlur={panelDataMap[link.name] ? () => handleMouseLeave(true) : undefined}
                        className={({ isActive }) => {
                          const isPanelActive = activePanel === link.name;
                          const isPageActive = isActive && location.pathname.startsWith(link.path);
                          const showActiveStyle = !panelDataMap[link.name]
                            ? isPageActive
                            : isPanelActive || (isPageActive && activePanel === null);
                          return `${navLinkClasses} h-10 px-4 py-2 ${showActiveStyle ? 'text-[#2d5a3d] border-b-2 border-[#2d5a3d] font-semibold' : ''}`;
                        }}
                        aria-haspopup={!!panelDataMap[link.name]}
                        aria-expanded={activePanel === link.name}
                        aria-controls={panelDataMap[link.name] ? `panel-${link.name}` : undefined}
                      >
                        {link.name}
                      </RouterNavLink>
                    </motion.li>
                  ))}
                </ul>
                <div ref={ctaBtnRef} className="ml-6">
                  <Link to="/contact" className="btn-primary">
                    Request a Quote
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div
              id="mobile-menu"
              className="md:hidden h-[calc(100vh-116px)] overflow-y-auto pb-4 border-t border-[#ddd8cf]"
              style={{ background: '#f5efe4' }}
            >
              <ul className="flex flex-col space-y-2 p-4">
                {data.headerNavLinks.map((link) => {
                  if (panelDataMap[link.name]) {
                    const isOpen = mobilePanelsOpen[link.name];
                    return (
                      <li key={link.name}>
                        <button
                          onClick={() => setMobilePanelsOpen(prev => ({ ...prev, [link.name]: !isOpen }))}
                          className="w-full text-left flex justify-between items-center p-3 rounded-md hover:bg-[#ede4d3] font-medium text-[#1a1814]"
                        >
                          {link.name}
                          <ChevronRightIcon className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                        </button>
                        {isOpen && (
                          <ul className="pl-4 mt-2 space-y-2 border-l-2 border-[#2d5a3d]/30">
                            {panelDataMap[link.name].links.map((item: any) => (
                              <li key={item.name}>
                                <RouterNavLink to={item.path} className="block text-[#4a4540] hover:text-[#2d5a3d] py-1">{item.name}</RouterNavLink>
                              </li>
                            ))}
                            <li>
                              <RouterNavLink to={panelDataMap[link.name].action.path} className="block font-semibold text-[#2d5a3d] hover:underline py-1">
                                {panelDataMap[link.name].action.name}
                              </RouterNavLink>
                            </li>
                          </ul>
                        )}
                      </li>
                    );
                  }
                  return (
                    <li key={link.name}>
                      <RouterNavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `block p-3 rounded-md hover:bg-[#ede4d3] font-medium ${isActive ? 'text-[#2d5a3d] bg-[#2d5a3d]/8 border-l-2 border-[#2d5a3d] pl-3' : 'text-[#4a4540]'}`
                        }
                      >
                        {link.name}
                      </RouterNavLink>
                    </li>
                  );
                })}
                <li className="mt-4">
                  <Link
                    to="/contact"
                    className="w-full text-center block btn-primary"
                  >
                    Request a Quote
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Dropdown panel portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activePanel && (
            <motion.div
              ref={panelRef}
              id={`panel-${activePanel}`}
              role="region"
              style={{ ...panelPosition, position: 'fixed', zIndex: 40, transformOrigin: 'top center' }}
              className="w-max max-w-[min(640px,calc(100vw-24px))] bg-white border border-[#ddd8cf] shadow-xl rounded-xl p-6"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={panelVariants}
              onMouseEnter={() => { panelInteractionRef.current = true; if (leaveTimer.current) clearTimeout(leaveTimer.current); }}
              onMouseLeave={() => { panelInteractionRef.current = false; handleMouseLeave(false); }}
              onKeyDown={handlePanelKeyDown}
            >
              {renderPanelContent(activePanel)}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Header;
