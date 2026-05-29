
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { seedImages } from '../constants/seed-images';

const AboutPage: React.FC = () => {
    return (
        <div className="bg-[#0a0a0a] text-white/80">
            <div className="bg-[#0d0d0d] pt-16 pb-12" style={{ borderBottom: '1px solid rgba(200,121,65,0.12)' }}>
                <PageWrapper className="py-0">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl text-center">About SaiMangalam Electrical &amp; Engineerings</h1>
                    <p className="mt-6 text-xl text-white/70 max-w-3xl mx-auto text-center">
                        Pioneering transformer technology and delivering unparalleled quality and reliability for over 35 years.
                    </p>
                </PageWrapper>
            </div>

            <PageWrapper>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-[#c87941]">Our History</h2>
                        <p className="mt-4 text-lg text-white/70">
                            Founded in 1985, SaiMangalam began with a vision to revolutionize the power industry. From a modest workshop, we have grown into a global manufacturing powerhouse, consistently pushing the boundaries of innovation.
                        </p>
                        <p className="mt-4 text-white/60">
                            Our journey is marked by significant milestones, from developing our first high-voltage transformer in the 90s to pioneering eco-friendly dry-type transformers in the 2000s. Today, we stand as a testament to engineering excellence and unwavering commitment to our clients.
                        </p>
                    </div>
                    <div>
                        <img
                            src={seedImages.factoryHistoric}
                            alt="Historic SaiMangalam factory building"
                            className="rounded-lg shadow-lg border border-white/10"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                    </div>
                </div>

                <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass-surface p-8 rounded-lg">
                        <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                        <p className="mt-2 text-white/70">To engineer and manufacture the world's most reliable and efficient transformers, empowering global progress through stable and sustainable energy solutions.</p>
                    </div>
                    <div className="glass-surface p-8 rounded-lg">
                        <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                        <p className="mt-2 text-white/70">To be the undisputed global leader in transformer technology, driving the future of energy with innovation, integrity, and a commitment to a greener planet.</p>
                    </div>
                </div>
            </PageWrapper>

            <div className="bg-[#0d0d0d]">
                <PageWrapper>
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Our Manufacturing Facilities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <img src={seedImages.factoryInterior} alt="Modern factory interior with machinery" className="rounded-lg shadow-md w-full h-64 object-cover border border-white/10" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        <img src={seedImages.rdTeam} alt="Research and Development Team collaborating" className="rounded-lg shadow-md w-full h-64 object-cover border border-white/10" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        <img src={seedImages.warehouse} alt="Warehouse with stacked transformer components" className="rounded-lg shadow-md w-full h-64 object-cover border border-white/10" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                    <p className="mt-8 text-lg text-white/70 max-w-4xl mx-auto text-center">
                        Our state-of-the-art manufacturing plants are equipped with the latest technology and automated systems, ensuring precision, efficiency, and scalability. We invest heavily in R&amp;D to stay at the forefront of the industry.
                    </p>
                </PageWrapper>
            </div>

            <PageWrapper>
                <h2 className="text-3xl font-bold text-white text-center mb-12">Certifications &amp; Compliance</h2>
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <CheckBadgeIcon className="h-12 w-12 text-[#c87941]" />
                        <p className="mt-2 font-semibold text-white">ISO 9001:2015</p>
                        <p className="text-sm text-white/50">Quality Management</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <CheckBadgeIcon className="h-12 w-12 text-[#c87941]" />
                        <p className="mt-2 font-semibold text-white">ISO 14001:2015</p>
                        <p className="text-sm text-white/50">Environmental Mgt.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <CheckBadgeIcon className="h-12 w-12 text-[#c87941]" />
                        <p className="mt-2 font-semibold text-white">CE Marking</p>
                        <p className="text-sm text-white/50">European Conformity</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <CheckBadgeIcon className="h-12 w-12 text-[#c87941]" />
                        <p className="mt-2 font-semibold text-white">IEEE Standards</p>
                        <p className="text-sm text-white/50">Global Standards</p>
                    </div>
                </div>
            </PageWrapper>
        </div>
    );
};

export default AboutPage;
