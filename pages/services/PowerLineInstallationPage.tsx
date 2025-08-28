import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import { seedImages } from '../../constants/seed-images';
import { Link } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/24/outline';

const PowerLineInstallationPage: React.FC = () => {
    return (
        <div className="bg-white">
            <div className="relative bg-slate-800 text-white py-24">
                <img src={seedImages.industriesGrid} alt="Power lines against a sky" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                <PageWrapper className="py-0 relative z-10 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Power Line Installation & Maintenance</h1>
                    <p className="mt-6 text-xl text-slate-200 max-w-3xl mx-auto">
                        Turnkey overhead and underground line installation, upgrades, and preventive maintenance for HT/LT networks.
                    </p>
                </PageWrapper>
            </div>

            <PageWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-slate-800">Reliable Grid Infrastructure, Delivered</h2>
                        <p className="mt-4 text-lg text-slate-600">
                           Our experienced teams provide complete EPC services for power line infrastructure. From route survey and design to tower erection, stringing, and commissioning, we ensure your project is completed safely, on time, and to the highest quality standards.
                        </p>
                        
                        <h3 className="text-2xl font-bold text-slate-800 mt-12">Scope of Work & Deliverables</h3>
                        <ul className="mt-4 space-y-4 text-slate-600">
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" /><span><strong>Turnkey Projects:</strong> End-to-end management of HT/LT overhead and underground line projects.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" /><span><strong>Line Upgrades:</strong> Conductor replacement, pole reinforcement, and capacity enhancement.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" /><span><strong>Preventive Maintenance:</strong> Scheduled line patrols, thermal imaging, and component health checks.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" /><span><strong>Emergency Response:</strong> Rapid mobilization for outage restoration with guaranteed service-level agreements (SLAs).</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" /><span><strong>Substation Integration:</strong> Seamless connection of power lines to new or existing substations.</span></li>
                        </ul>

                        <h3 className="text-2xl font-bold text-slate-800 mt-12">Why Choose Our Installation Services?</h3>
                        <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
                             <li><strong>Safety First:</strong> Uncompromising commitment to safety protocols for our crew and the public.</li>
                             <li><strong>Expert Team:</strong> Highly skilled engineers, linemen, and project managers.</li>
                             <li><strong>Modern Equipment:</strong> Utilization of advanced tools and machinery for efficiency and precision.</li>
                             <li><strong>Regulatory Compliance:</strong> Deep knowledge of local and national grid codes and regulations.</li>
                        </ul>
                    </div>
                    <aside className="lg:col-span-1 space-y-8">
                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-800">Schedule a Consultation</h3>
                            <p className="mt-2 text-slate-600">Discuss your grid infrastructure project with our experts.</p>
                            <Link to="/contact" className="mt-4 block w-full text-center bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                                Get in Touch
                            </Link>
                        </div>
                         <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-800">Related Services</h3>
                             <ul className="mt-4 space-y-3">
                                <li><Link to="/services/distribution-transformer-manufacturing" className="font-medium text-blue-600 hover:underline">Transformer Manufacturing</Link></li>
                                <li><Link to="/services/solar-installation" className="font-medium text-blue-600 hover:underline">Solar Installation</Link></li>
                             </ul>
                        </div>
                    </aside>
                </div>
            </PageWrapper>
        </div>
    );
};

export default PowerLineInstallationPage;
