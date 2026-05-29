import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import { seedImages } from '../../constants/seed-images';
import { Link } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/24/outline';

const DistributionTransformerManufacturingPage: React.FC = () => {
    return (
        <div className="bg-[#0d0d0d] text-white/80">
            <div className="relative bg-black text-white py-24">
                <img src={seedImages.productYard} alt="Distribution Transformers in a yard" className="absolute inset-0 w-full h-full object-cover opacity-30" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.5))' }} />
                <PageWrapper className="py-0 relative z-10 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">Distribution Transformer Manufacturing</h1>
                    <p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto">
                        Engineering and manufacturing BIS/IEC-compliant distribution transformers for 11–33 kV networks.
                    </p>
                </PageWrapper>
            </div>

            <PageWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-white">High-Performance Transformers for Modern Grids</h2>
                        <p className="mt-4 text-lg text-white/70">
                           We provide end-to-end manufacturing solutions for distribution transformers, ensuring reliability and efficiency for your power network. Our process covers everything from initial design and material sourcing to advanced winding, assembly, and rigorous final testing.
                        </p>

                        <h3 className="text-2xl font-bold text-white mt-12">Scope of Work &amp; Deliverables</h3>
                        <ul className="mt-4 space-y-4 text-white/70">
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-[#c87941] mr-3 mt-1 shrink-0" /><span><strong className="text-white">Custom Design:</strong> Tailored designs based on customer specifications, application, and local standards.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-[#c87941] mr-3 mt-1 shrink-0" /><span><strong className="text-white">Core &amp; Winding:</strong> Precision-cut cores and expertly wound coils using high-grade copper or aluminum.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-[#c87941] mr-3 mt-1 shrink-0" /><span><strong className="text-white">Tank Fabrication:</strong> Robust, leak-proof tank fabrication with advanced surface treatment and painting.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-[#c87941] mr-3 mt-1 shrink-0" /><span><strong className="text-white">Comprehensive Testing:</strong> Full suite of routine and type tests performed in our NABL-accredited labs.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-[#c87941] mr-3 mt-1 shrink-0" /><span><strong className="text-white">Logistics &amp; Support:</strong> Secure packaging, site-ready delivery, and installation support.</span></li>
                        </ul>

                        <h3 className="text-2xl font-bold text-white mt-12">Why Choose Our Transformers?</h3>
                        <ul className="mt-4 space-y-2 text-white/70 list-disc list-inside">
                             <li><strong className="text-white">Low Losses:</strong> Optimized design for high efficiency and minimal energy loss.</li>
                             <li><strong className="text-white">Longevity:</strong> Built with premium materials for a long and reliable service life.</li>
                             <li><strong className="text-white">Compliance:</strong> Fully compliant with IEC, IS, BIS, and other international standards.</li>
                             <li><strong className="text-white">Customization:</strong> Flexible options for voltage, capacity, fittings, and accessories.</li>
                        </ul>
                    </div>
                    <aside className="lg:col-span-1 space-y-8">
                        <div className="glass-surface p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white">Request a Quote</h3>
                            <p className="mt-2 text-white/70">Get in touch for a custom quote on your transformer requirements.</p>
                            <Link to="/contact" className="mt-4 block w-full text-center btn-primary rounded-lg py-3">
                                Contact Sales
                            </Link>
                        </div>
                        <div className="glass-surface p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white">Related Services</h3>
                             <ul className="mt-4 space-y-3">
                                <li><Link to="/services/power-line-installation-maintenance" className="font-medium text-[#c87941] hover:underline">Power Line Installation</Link></li>
                                <li><Link to="/services/solar-installation" className="font-medium text-[#c87941] hover:underline">Solar Installation</Link></li>
                             </ul>
                        </div>
                    </aside>
                </div>
            </PageWrapper>
        </div>
    );
};

export default DistributionTransformerManufacturingPage;
