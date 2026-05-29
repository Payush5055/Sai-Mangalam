import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import { seedImages } from '../../constants/seed-images';
import { Link } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/24/outline';

const PowerLineInstallationPage: React.FC = () => {
    return (
        <div className="bg-[#0d0d0d] text-white/80">
            <div className="relative bg-black text-white py-24">
                <img src={seedImages.industriesGrid} alt="Power lines against a sky" className="absolute inset-0 w-full h-full object-cover opacity-30" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.5))' }} />
                <PageWrapper className="py-0 relative z-10 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">Power Line Installation &amp; Maintenance</h1>
                    <p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto">
                        Turnkey overhead and underground line installation, upgrades, and preventive maintenance for HT/LT networks.
                    </p>
                </PageWrapper>
            </div>

            <PageWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-white">Reliable Grid Infrastructure, Delivered</h2>
                        <p className="mt-4 text-lg text-white/70">
                           Our experienced teams provide complete EPC services for power line infrastructure. From route survey and design to tower erection, stringing, and commissioning, we ensure your project is completed safely, on time, and to the highest quality standards.
                        </p>

                        <h3 className="text-2xl font-bold text-white mt-12">Scope of Work &amp; Deliverables</h3>
                        <ul className="mt-4 space-y-4 text-white/70">
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-[#c87941] mr-3 mt-1 shrink-0" /><span><strong className="text-white">Turnkey Projects:</strong> End-to-end management of HT/LT overhead and underground line projects.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-[#c87941] mr-3 mt-1 shrink-0" /><span><strong className="text-white">Line Upgrades:</strong> Conductor replacement, pole reinforcement, and capacity enhancement.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-[#c87941] mr-3 mt-1 shrink-0" /><span><strong className="text-white">Preventive Maintenance:</strong> Scheduled line patrols, thermal imaging, and component health checks.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-[#c87941] mr-3 mt-1 shrink-0" /><span><strong className="text-white">Emergency Response:</strong> Rapid mobilization for outage restoration with guaranteed SLAs.</span></li>
                           <li className="flex items-start"><CheckIcon className="h-6 w-6 text-[#c87941] mr-3 mt-1 shrink-0" /><span><strong className="text-white">Substation Integration:</strong> Seamless connection of power lines to new or existing substations.</span></li>
                        </ul>

                        <h3 className="text-2xl font-bold text-white mt-12">Why Choose Our Installation Services?</h3>
                        <ul className="mt-4 space-y-2 text-white/70 list-disc list-inside">
                             <li><strong className="text-white">Safety First:</strong> Uncompromising commitment to safety protocols for our crew and the public.</li>
                             <li><strong className="text-white">Expert Team:</strong> Highly skilled engineers, linemen, and project managers.</li>
                             <li><strong className="text-white">Modern Equipment:</strong> Utilization of advanced tools and machinery for efficiency and precision.</li>
                             <li><strong className="text-white">Regulatory Compliance:</strong> Deep knowledge of local and national grid codes and regulations.</li>
                        </ul>
                    </div>
                    <aside className="lg:col-span-1 space-y-8">
                        <div className="glass-surface p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white">Schedule a Consultation</h3>
                            <p className="mt-2 text-white/70">Discuss your grid infrastructure project with our experts.</p>
                            <Link to="/contact" className="mt-4 block w-full text-center btn-primary rounded-lg py-3">
                                Get in Touch
                            </Link>
                        </div>
                        <div className="glass-surface p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white">Related Services</h3>
                             <ul className="mt-4 space-y-3">
                                <li><Link to="/services/distribution-transformer-manufacturing" className="font-medium text-[#c87941] hover:underline">Transformer Manufacturing</Link></li>
                                <li><Link to="/services/solar-installation" className="font-medium text-[#c87941] hover:underline">Solar Installation</Link></li>
                             </ul>
                        </div>
                    </aside>
                </div>
            </PageWrapper>
        </div>
    );
};

export default PowerLineInstallationPage;
