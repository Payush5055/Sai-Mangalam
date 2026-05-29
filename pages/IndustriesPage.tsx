import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { industries } from '../constants/data';
import { motion } from 'framer-motion';

const IndustriesPage: React.FC = () => {
    return (
        <div className="bg-[#f4f1eb]">
            <div className="bg-[#1a1814] py-16 text-center">
                <PageWrapper className="py-0">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl" style={{ fontFamily: "'Instrument Serif', serif" }}>Industries We Serve</h1>
                    <p className="mt-6 text-xl text-white/70 max-w-3xl mx-auto">
                        Delivering specialized transformer solutions to power critical sectors around the globe.
                    </p>
                </PageWrapper>
            </div>
            <PageWrapper>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {industries.map((industry, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5, scale: 1.02, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            className="bg-white rounded-lg overflow-hidden group border border-[#ddd8cf] hover:border-[#2d5a3d]/40 transition-all duration-300 shadow-sm"
                        >
                            <div className="overflow-hidden h-64">
                                <motion.img
                                    src={industry.imageUrl}
                                    alt={industry.name}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                            </div>
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-[#1a1814]">{industry.name}</h2>
                                <p className="mt-4 text-[#6b6258]">{industry.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </PageWrapper>
        </div>
    );
};

export default IndustriesPage;
