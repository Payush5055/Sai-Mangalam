import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import { seedImages } from '../../constants/seed-images';
import { Link } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/24/outline';

const SolarInstallationPage: React.FC = () => {
    return (
        <div className="bg-white">
            <div className="relative bg-slate-800 text-white py-24">
                <img src={seedImages.industriesRenewable} alt="Solar panels in a field" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                <PageWrapper className="py-0 relative z-10 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Solar Installation</h1>
                    <p className="mt-6 text-xl text-slate-200 max-w-3xl mx-auto">
                        Rooftop and ground-mount solar solutions with expert grid tie-in and transformer integration.
                    </p>
                </PageWrapper>
            </div>

            <PageWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-slate-800">Your Partner in Renewable Energy</h2>
                        <p className="mt-4 text-lg text-slate-600">
                           We offer comprehensive EPC (Engineering, Procurement, and Construction) services for commercial and utility-scale solar projects. Our expertise ensures seamless integration with the power grid, maximizing your energy output and return on investment.
                        </p>
                        
                        <h3 className="text-2xl font-bold text-slate-800 mt-12">Scope of Work & Deliverables</h3>
                        <ul className="mt-4 space-y-4 text-slate-600">
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" /><span><strong>Site Assessment & Design:</strong> Detailed analysis of solar potential and custom system design for optimal performance.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" /><span><strong>Procurement:</strong> Sourcing of high-quality modules, inverters, and mounting structures from leading manufacturers.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" /><span><strong>Installation & Commissioning:</strong> Professional installation by certified technicians, followed by rigorous testing and commissioning.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" /><span><strong>Grid Integration:</strong> Expert handling of net metering compliance, grid tie-in, and integration with correctly sized transformers.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" /><span><strong>Monitoring & Maintenance:</strong> Setup of advanced performance monitoring systems and ongoing O&M support.</span></li>
                        </ul>

                        <h3 className="text-2xl font-bold text-slate-800 mt-12">Why Go Solar With Us?</h3>
                        <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
                             <li><strong>Integrated Expertise:</strong> Unique capability to manage both solar and transformer integration in-house.</li>
                             <li><strong>Quality Components:</strong> We use only tier-1 modules and equipment to ensure long-term reliability.</li>
                             <li><strong>Regulatory Navigation:</strong> We handle all necessary permits and approvals for a hassle-free process.</li>
                             <li><strong>Performance Guarantee:</strong> Our systems are designed to meet or exceed projected energy production levels.</li>
                        </ul>
                    </div>
                    <aside className="lg:col-span-1 space-y-8">
                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-800">Get a Solar Proposal</h3>
                            <p className="mt-2 text-slate-600">Let's discuss your renewable energy goals and create a custom proposal.</p>
                            <Link to="/contact" className="mt-4 block w-full text-center bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                                Request Proposal
                            </Link>
                        </div>
                         <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-800">Related Services</h3>
                             <ul className="mt-4 space-y-3">
                                <li><Link to="/services/distribution-transformer-manufacturing" className="font-medium text-blue-600 hover:underline">Transformer Manufacturing</Link></li>
                                <li><Link to="/services/power-line-installation-maintenance" className="font-medium text-blue-600 hover:underline">Power Line Installation</Link></li>
                             </ul>
                        </div>
                    </aside>
                </div>
            </PageWrapper>
        </div>
    );
};

export default SolarInstallationPage;
