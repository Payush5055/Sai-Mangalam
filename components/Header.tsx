import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import * as data from '../constants/data';
import { Bars3Icon, XMarkIcon, ChevronRightIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { createPortal } from 'react-dom';
// FIX: Import 'Variants' to correctly type the framer-motion animation variants.
import { motion, AnimatePresence, Variants } from 'framer-motion';

const panelDataMap: { [key: string]: any } = {
  'About Us': data.aboutUsMenuData,
  'Products': data.productsMenuData,
  'Industries': data.industriesMenuData,
  'Quality': data.qualityMenuData,
};

const Header: React.FC = () => {
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
    enterTimer.current = window.setTimeout(() => {
      setActivePanel(panelName);
    }, 140);
  };

  const handleMouseLeave = (isTrigger: boolean) => {
    if (enterTimer.current) clearTimeout(enterTimer.current);
    leaveTimer.current = window.setTimeout(() => {
      if (!panelInteractionRef.current) {
        setActivePanel(null);
      }
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
    // Dynamically position the active panel directly beneath its trigger link.
    // This effect measures the trigger and panel dimensions after the DOM is updated
    // but before the browser paints, ensuring accurate, flicker-free positioning.
    if (activePanel && triggerRefs.current[activePanel] && panelRef.current) {
      const triggerRect = triggerRefs.current[activePanel]!.getBoundingClientRect();
      const panelWidth = panelRef.current.offsetWidth;
      const viewportWidth = document.documentElement.clientWidth;

      // Calculate position to center the panel horizontally under the trigger.
      let left = triggerRect.left + (triggerRect.width / 2) - (panelWidth / 2);
      
      // Clamp the position to ensure the panel stays within the viewport.
      left = Math.max(12, Math.min(left, viewportWidth - panelWidth - 12));
      
      // Position the panel 12px below the trigger element.
      const top = triggerRect.bottom + 12;

      setPanelPosition({ top, left });
    }
  }, [activePanel]);


  const navLinkClasses = "relative flex items-center justify-center text-sm font-medium text-slate-200 transition-colors duration-200 ease-in-out hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md";

  const renderPanelContent = (panelName: string) => {
      const data = panelDataMap[panelName];
      if (!data) return null;

      const isProducts = panelName === 'Products';
      const gridCols = isProducts ? 'grid-cols-2' : 'grid-cols-1';

      return (
          <>
              <div className={`grid ${gridCols} gap-x-8 gap-y-1 text-slate-200`}>
                  {data.links.map((item: any) => (
                      <Link key={item.name} to={item.path} className="group block p-3 -m-3 rounded-lg hover:bg-slate-700/50 transition-colors duration-200" onClick={() => setActivePanel(null)}>
                          <div className="flex items-start gap-4">
                              {item.icon && <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-slate-800 rounded-lg shadow-sm border border-slate-600 group-hover:border-blue-400">
                                {React.createElement(item.icon, {className: 'h-6 w-6 text-blue-400'})}
                              </div>}
                              <div>
                                  <p className="font-semibold text-slate-100">{item.name}</p>
                                  {item.description && <p className="text-sm text-slate-400">{item.description}</p>}
                              </div>
                          </div>
                      </Link>
                  ))}
              </div>
              <div className="mt-4 border-t border-slate-700 pt-4">
                  <Link to={data.action.path} className="font-semibold text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1" onClick={() => setActivePanel(null)}>
                    {data.action.name}
                  </Link>
              </div>
          </>
      );
  };
  
  // FIX: Explicitly type 'panelVariants' with the 'Variants' type from framer-motion.
  const panelVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 500, damping: 30 } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15 } }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-slate-900/50 backdrop-blur-sm text-white hidden md:block">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center gap-x-6 text-sm h-9">
                <a href="tel:+919881215798" className="flex items-center gap-1.5 hover:text-blue-300 transition-colors">
                    <PhoneIcon className="h-4 w-4" />
                    <span>+91 9881215798</span>
                </a>
                <a href="mailto:saimangalam.electrical@gmail.com" className="flex items-center gap-1.5 hover:text-blue-300 transition-colors">
                    <EnvelopeIcon className="h-4 w-4" />
                    <span>saimangalam.electrical@gmail.com</span>
                </a>
            </div>
        </div>
        <div className={`transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'glass-surface' : 'bg-transparent'}`}>
            <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-20">
                <Link to="/" className="flex items-center space-x-2">
                  <img
                    src="/brand/Logo.jpg"
                    alt="SaiMangalam Electrical & Engineerings"   /* for accessibility */
                    className="h-9"
                  />
                  <span className="text-white font-semibold hidden sm:inline">
                    SaiMangalam Electrical&nbsp;&amp; Engineerings
                  </span>
              </Link>

                <div className="md:hidden">
                  <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-200 hover:text-blue-300 focus:outline-none" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen}>
                    <span className="sr-only">Open main menu</span>
                    {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                  </button>
                </div>

                <div className="hidden md:flex items-center">
                  <ul className="flex items-center gap-x-2 lg:gap-x-4">
                    {data.headerNavLinks.map((link) => (
                      <motion.li key={link.name} 
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
                              const showActiveStyle = !panelDataMap[link.name] ? isPageActive : isPanelActive || (isPageActive && activePanel === null);
                              return `${navLinkClasses} h-10 px-4 py-2 ${showActiveStyle ? 'text-blue-300 bg-blue-500/10' : ''}`;
                            }}
                            aria-haspopup={!!panelDataMap[link.name]}
                            aria-expanded={activePanel === link.name}
                            aria-controls={panelDataMap[link.name] ? `panel-${link.name}`: undefined}
                          >
                            {link.name}
                          </RouterNavLink>
                      </motion.li>
                    ))}
                  </ul>
                   <motion.div className="ml-6" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/contact" className="btn-primary">
                        Request a Quote
                    </Link>
                   </motion.div>
                </div>
              </div>
            </nav>
            {isMobileMenuOpen && (
                <div id="mobile-menu" className="md:hidden h-[calc(100vh-116px)] overflow-y-auto bg-slate-900/95 backdrop-blur-sm pb-4 border-t border-slate-700">
                  <ul className="flex flex-col space-y-2 p-4">
                    {data.headerNavLinks.map((link) => {
                       if (panelDataMap[link.name]) {
                        const isOpen = mobilePanelsOpen[link.name];
                        return (
                          <li key={link.name}>
                            <button onClick={() => setMobilePanelsOpen(prev => ({...prev, [link.name]: !isOpen}))} className={`w-full text-left flex justify-between items-center p-3 rounded-md hover:bg-slate-800 font-medium text-slate-200`}>
                              {link.name}
                              <ChevronRightIcon className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                            </button>
                            {isOpen && (
                              <ul className="pl-4 mt-2 space-y-2 border-l border-slate-700">
                                {panelDataMap[link.name].links.map((item: any) => (
                                  <li key={item.name}>
                                    <RouterNavLink to={item.path} className="block text-slate-300 hover:text-blue-300 py-1">{item.name}</RouterNavLink>
                                  </li>
                                ))}
                                 <li>
                                    <RouterNavLink to={panelDataMap[link.name].action.path} className="block font-semibold text-blue-400 hover:underline py-1">{panelDataMap[link.name].action.name}</RouterNavLink>
                                  </li>
                              </ul>
                            )}
                          </li>
                        )
                      }
                      return (
                      <li key={link.name}>
                         <RouterNavLink to={link.path} className={({ isActive }) => `block p-3 rounded-md hover:bg-slate-800 font-medium ${isActive ? 'text-blue-300 bg-blue-500/10' : 'text-slate-200'}`}>{link.name}</RouterNavLink>
                      </li>
                    )})}
                     <li className="mt-4">
                         <Link to="/contact" className="w-full text-center bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 block">
                          Request a Quote
                        </Link>
                     </li>
                  </ul>
                </div>
            )}
        </div>
      </header>
      {typeof document !== 'undefined' && createPortal(
          <AnimatePresence>
            {activePanel && (
              <motion.div
                ref={panelRef}
                id={`panel-${activePanel}`}
                role="region"
                style={{ ...panelPosition, position: 'fixed', zIndex: 40, transformOrigin: 'top center' }}
                className="w-max max-w-[min(640px,calc(100vw-24px))] glass-surface rounded-xl p-6"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={panelVariants}
                onMouseEnter={() => { panelInteractionRef.current = true; if(leaveTimer.current) clearTimeout(leaveTimer.current); }}
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