import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { industries } from '../constants/data';
import { motion } from 'framer-motion';

const IndustriesPage: React.FC = () => {
    return (
        <div className="bg-[#0a0a0a]">
            <div className="bg-[#0d0d0d] py-16 text-center" style={{ borderBottom: '1px solid rgba(200,121,65,0.12)' }}>
                <PageWrapper className="py-0">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Industries We Serve</h1>
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
                            whileHover={{ y: -5, scale: 1.02, boxShadow: '0 0 25px rgba(200,121,65,0.2)' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            className="bg-[#1a1a1f] rounded-lg overflow-hidden group border border-white/10 hover:border-[#c87941]/40 transition-all duration-300"
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
                                <h2 className="text-2xl font-bold text-white">{industry.name}</h2>
                                <p className="mt-4 text-white/70">{industry.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </PageWrapper>
        </div>
    );
};

export default IndustriesPage;
