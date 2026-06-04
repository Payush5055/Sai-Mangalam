import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import { seedImages } from '../../constants/seed-images';
import { Link } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/24/outline';

const SolarInstallationPage: React.FC = () => {
    return (
        <div className="bg-[#f5efe4] text-[#6b6258]">
            <div className="relative bg-black text-white py-24">
                <img src={seedImages.industriesRenewable} alt="Solar panels in a field" className="absolute inset-0 w-full h-full object-cover opacity-30" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.5))' }} />
                <PageWrapper className="py-0 relative z-10 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">Solar Installation</h1>
                    <p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto">
                        Rooftop and ground-mount solar solutions with expert grid tie-in and transformer integration.
                    </p>
                </PageWrapper>
            </div>

            <PageWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-[#1a1814]">Your Partner in Renewable Energy</h2>
                        <p className="mt-4 text-lg text-[#6b6258]">
                           We offer comprehensive EPC services for commercial and utility-scale solar projects. Our expertise ensures seamless integration with the power grid, maximizing your energy output and return on investment.
                        </p>

                        <h3 className="text-2xl font-bold text-[#1a1814] mt-12">Scope of Work &amp; Deliverables</h3>
                        <ul className="mt-4 space-y-4 text-[#6b6258]">
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-[#2d5a3d] mr-3 mt-1 shrink-0" /><span><strong className="text-[#1a1814]">Site Assessment &amp; Design:</strong> Detailed analysis of solar potential and custom system design for optimal performance.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-[#2d5a3d] mr-3 mt-1 shrink-0" /><span><strong className="text-[#1a1814]">Procurement:</strong> Sourcing of high-quality modules, inverters, and mounting structures from leading manufacturers.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-[#2d5a3d] mr-3 mt-1 shrink-0" /><span><strong className="text-[#1a1814]">Installation &amp; Commissioning:</strong> Professional installation by certified technicians, followed by rigorous testing.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-[#2d5a3d] mr-3 mt-1 shrink-0" /><span><strong className="text-[#1a1814]">Grid Integration:</strong> Expert handling of net metering compliance, grid tie-in, and transformer integration.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-[#2d5a3d] mr-3 mt-1 shrink-0" /><span><strong className="text-[#1a1814]">Monitoring &amp; Maintenance:</strong> Advanced performance monitoring systems and ongoing O&amp;M support.</span></li>
                        </ul>

                        <h3 className="text-2xl font-bold text-[#1a1814] mt-12">Why Go Solar With Us?</h3>
                        <ul className="mt-4 space-y-2 text-[#6b6258] list-disc list-inside">
                             <li><strong className="text-[#1a1814]">Integrated Expertise:</strong> Unique capability to manage both solar and transformer integration in-house.</li>
                             <li><strong className="text-[#1a1814]">Quality Components:</strong> We use only tier-1 modules and equipment to ensure long-term reliability.</li>
                             <li><strong className="text-[#1a1814]">Regulatory Navigation:</strong> We handle all necessary permits and approvals for a hassle-free process.</li>
                             <li><strong className="text-[#1a1814]">Performance Guarantee:</strong> Our systems are designed to meet or exceed projected energy production levels.</li>
                        </ul>
                    </div>
                    <aside className="lg:col-span-1 space-y-8">
                        <div className="bg-white border border-[#ddd8cf] p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold text-[#1a1814]">Get a Solar Proposal</h3>
                            <p className="mt-2 text-[#6b6258]">Let's discuss your renewable energy goals and create a custom proposal.</p>
                            <Link to="/contact" className="mt-4 block w-full text-center btn-primary rounded-lg py-3">
                                Request Proposal
                            </Link>
                        </div>
                        <div className="bg-white border border-[#ddd8cf] p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold text-[#1a1814]">Related Services</h3>
                             <ul className="mt-4 space-y-3">
                                <li><Link to="/services/distribution-transformer-manufacturing" className="font-medium text-[#2d5a3d] hover:underline">Transformer Manufacturing</Link></li>
                                <li><Link to="/services/power-line-installation-maintenance" className="font-medium text-[#2d5a3d] hover:underline">Power Line Installation</Link></li>
                             </ul>
                        </div>
                    </aside>
                </div>
            </PageWrapper>
        </div>
    );
};

export default SolarInstallationPage;
