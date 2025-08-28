import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import { seedImages } from '../../constants/seed-images';
import { Link } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/24/outline';

const DistributionTransformerManufacturingPage: React.FC = () => {
    return (
        <div className="bg-white">
            <div className="relative bg-slate-800 text-white py-24">
                <img src={seedImages.productYard} alt="Distribution Transformers in a yard" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                <PageWrapper className="py-0 relative z-10 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Distribution Transformer Manufacturing</h1>
                    <p className="mt-6 text-xl text-slate-200 max-w-3xl mx-auto">
                        Engineering and manufacturing BIS/IEC-compliant distribution transformers for 11–33 kV networks.
                    </p>
                </PageWrapper>
            </div>

            <PageWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-slate-800">High-Performance Transformers for Modern Grids</h2>
                        <p className="mt-4 text-lg text-slate-600">
                           We provide end-to-end manufacturing solutions for distribution transformers, ensuring reliability and efficiency for your power network. Our process covers everything from initial design and material sourcing to advanced winding, assembly, and rigorous final testing.
                        </p>
                        
                        <h3 className="text-2xl font-bold text-slate-800 mt-12">Scope of Work & Deliverables</h3>
                        <ul className="mt-4 space-y-4 text-slate-600">
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" /><span><strong>Custom Design:</strong> Tailored designs based on customer specifications, application, and local standards.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" /><span><strong>Core & Winding:</strong> Precision-cut cores and expertly wound coils using high-grade copper or aluminum.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" /><span><strong>Tank Fabrication:</strong> Robust, leak-proof tank fabrication with advanced surface treatment and painting.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" /><span><strong>Comprehensive Testing:</strong> Full suite of routine and type tests performed in our NABL-accredited labs.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" /><span><strong>Logistics & Support:</strong> Secure packaging, site-ready delivery, and installation support.</span></li>
                        </ul>

                        <h3 className="text-2xl font-bold text-slate-800 mt-12">Why Choose Our Transformers?</h3>
                        <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
                             <li><strong>Low Losses:</strong> Optimized design for high efficiency and minimal energy loss.</li>
                             <li><strong>Longevity:</strong> Built with premium materials for a long and reliable service life.</li>
                             <li><strong>Compliance:</strong> Fully compliant with IEC, IS, BIS, and other international standards.</li>
                             <li><strong>Customization:</strong> Flexible options for voltage, capacity, fittings, and accessories.</li>
                        </ul>
                    </div>
                    <aside className="lg:col-span-1 space-y-8">
                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-800">Request a Quote</h3>
                            <p className="mt-2 text-slate-600">Get in touch for a custom quote on your transformer requirements.</p>
                            <Link to="/contact" className="mt-4 block w-full text-center bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                                Contact Sales
                            </Link>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-800">Related Services</h3>
                             <ul className="mt-4 space-y-3">
                                <li><Link to="/services/power-line-installation-maintenance" className="font-medium text-blue-600 hover:underline">Power Line Installation</Link></li>
                                <li><Link to="/services/solar-installation" className="font-medium text-blue-600 hover:underline">Solar Installation</Link></li>
                             </ul>
                        </div>
                    </aside>
                </div>
            </PageWrapper>
        </div>
    );
};

export default DistributionTransformerManufacturingPage;
