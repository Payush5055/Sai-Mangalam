
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { seedImages } from '../constants/seed-images';

const AboutPage: React.FC = () => {
    return (
        <div className="bg-transparent text-slate-300">
            <div className="bg-slate-900/50 pt-16 pb-12">
                 <PageWrapper className="py-0">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl text-center">About SaiMangalam Electrical & Engineerings</h1>
                    <p className="mt-6 text-xl text-slate-300 max-w-3xl mx-auto text-center">
                        Pioneering transformer technology and delivering unparalleled quality and reliability for over 35 years.
                    </p>
                </PageWrapper>
            </div>

            <PageWrapper>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-blue-400">Our History</h2>
                        <p className="mt-4 text-lg text-slate-300">
                            Founded in 1985, SaiMangalam began with a vision to revolutionize the power industry. From a modest workshop, we have grown into a global manufacturing powerhouse, consistently pushing the boundaries of innovation.
                        </p>
                        <p className="mt-4 text-slate-400">
                            Our journey is marked by significant milestones, from developing our first high-voltage transformer in the 90s to pioneering eco-friendly dry-type transformers in the 2000s. Today, we stand as a testament to engineering excellence and unwavering commitment to our clients.
                        </p>
                    </div>
                    <div>
                        <img src={seedImages.factoryHistoric} alt="Historic SaiMangalam factory building" className="rounded-lg shadow-lg border border-slate-700"/>
                    </div>
                </div>

                 <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass-surface p-8 rounded-lg">
                        <h3 className="text-2xl font-bold text-slate-100">Our Mission</h3>
                        <p className="mt-2 text-slate-300">To engineer and manufacture the world's most reliable and efficient transformers, empowering global progress through stable and sustainable energy solutions.</p>
                    </div>
                    <div className="glass-surface p-8 rounded-lg">
                        <h3 className="text-2xl font-bold text-slate-100">Our Vision</h3>
                        <p className="mt-2 text-slate-300">To be the undisputed global leader in transformer technology, driving the future of energy with innovation, integrity, and a commitment to a greener planet.</p>
                    </div>
                </div>
            </PageWrapper>
            
            <div className="bg-slate-900/50">
                <PageWrapper>
                     <h2 className="text-3xl font-bold text-slate-50 text-center mb-12">Our Manufacturing Facilities</h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <img src={seedImages.factoryInterior} alt="Modern factory interior with machinery" className="rounded-lg shadow-md w-full h-64 object-cover border border-slate-700"/>
                        <img src={seedImages.rdTeam} alt="Research and Development Team collaborating" className="rounded-lg shadow-md w-full h-64 object-cover border border-slate-700"/>
                        <img src={seedImages.warehouse} alt="Warehouse with stacked transformer components" className="rounded-lg shadow-md w-full h-64 object-cover border border-slate-700"/>
                     </div>
                     <p className="mt-8 text-lg text-slate-300 max-w-4xl mx-auto text-center">
                        Our state-of-the-art manufacturing plants are equipped with the latest technology and automated systems, ensuring precision, efficiency, and scalability. We invest heavily in R&D to stay at the forefront of the industry.
                     </p>
                </PageWrapper>
            </div>

            <PageWrapper>
                <h2 className="text-3xl font-bold text-slate-50 text-center mb-12">Certifications & Compliance</h2>
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <CheckBadgeIcon className="h-12 w-12 text-green-400"/>
                        <p className="mt-2 font-semibold text-slate-100">ISO 9001:2015</p>
                        <p className="text-sm text-slate-400">Quality Management</p>
                    </div>
                     <div className="flex flex-col items-center">
                        <CheckBadgeIcon className="h-12 w-12 text-green-400"/>
                        <p className="mt-2 font-semibold text-slate-100">ISO 14001:2015</p>
                        <p className="text-sm text-slate-400">Environmental Mgt.</p>
                    </div>
                     <div className="flex flex-col items-center">
                        <CheckBadgeIcon className="h-12 w-12 text-green-400"/>
                        <p className="mt-2 font-semibold text-slate-100">CE Marking</p>
                        <p className="text-sm text-slate-400">European Conformity</p>
                    </div>
                     <div className="flex flex-col items-center">
                        <CheckBadgeIcon className="h-12 w-12 text-green-400"/>
                        <p className="mt-2 font-semibold text-slate-100">IEEE Standards</p>
                        <p className="text-sm text-slate-400">Global Standards</p>
                    </div>
                </div>
            </PageWrapper>

        </div>
    );
};

export default AboutPage;