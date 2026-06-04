import React, { useState, useRef, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import ElectricCursor from './components/ElectricCursor';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IntroScreen from '../components/IntroScreen';
import SmoothScroll from '../components/SmoothScroll';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import IndustriesPage from '../pages/IndustriesPage';
import QualityPage from '../pages/QualityPage';
import ServiceDetailPage from '../pages/ServicesPage';
import ResourcesPage from '../pages/ResourcesPage';
import CareersPage from '../pages/CareersPage';
import ContactPage from '../pages/ContactPage';
import DistributionTransformerManufacturingPage from '../pages/services/DistributionTransformerManufacturingPage';
import PowerLineInstallationPage from '../pages/services/PowerLineInstallationPage';
import SolarInstallationPage from '../pages/services/SolarInstallationPage';
import gsap from 'gsap';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const alreadyShown = sessionStorage.getItem('intro_shown') === 'true';
  const [introComplete, setIntroComplete] = useState(alreadyShown);
  const siteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!introComplete || !siteRef.current) return;
    if (alreadyShown) {
      // No intro was shown — make site immediately visible
      siteRef.current.style.opacity = '1';
      siteRef.current.style.visibility = 'visible';
    } else {
      // Animate site in after intro
      setTimeout(() => {
        if (siteRef.current) {
          gsap.fromTo(
            siteRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: 'power2.out' }
          );
        }
      }, 50);
    }
  }, [introComplete, alreadyShown]);

  const siteStyle: React.CSSProperties = alreadyShown
    ? {}
    : {
        visibility: introComplete ? 'visible' : 'hidden',
        width: '100%',
        opacity: 0,
      };

  return (
    <SmoothScroll>
      <>
        <ElectricCursor />
        {!introComplete && (
          <IntroScreen onComplete={() => setIntroComplete(true)} />
        )}
        <div ref={siteRef} style={siteStyle}>
          <HashRouter>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-[#f5efe4]">
              <Header />
              <main className="flex-grow pt-[124px]">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:productId" element={<ProductDetailPage />} />
                  <Route path="/services/distribution-transformer-manufacturing" element={<DistributionTransformerManufacturingPage />} />
                  <Route path="/services/power-line-installation-maintenance" element={<PowerLineInstallationPage />} />
                  <Route path="/services/solar-installation" element={<SolarInstallationPage />} />
                  <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
                  <Route path="/industries" element={<IndustriesPage />} />
                  <Route path="/quality" element={<QualityPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </HashRouter>
        </div>
      </>
    </SmoothScroll>
  );
};

export default App;
