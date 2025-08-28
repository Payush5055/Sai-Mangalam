

import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
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

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
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
  );
};

export default App;