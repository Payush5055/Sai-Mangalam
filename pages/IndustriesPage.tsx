import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { industries } from '../constants/data';
import { motion } from 'framer-motion';

const IndustriesPage: React.FC = () => {
    return (
        <div className="bg-transparent">
            <div className="bg-slate-900/50 py-16 text-center">
                <PageWrapper className="py-0">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">Industries We Serve</h1>
                    <p className="mt-6 text-xl text-slate-300 max-w-3xl mx-auto">
                        Delivering specialized transformer solutions to power critical sectors around the globe.
                    </p>
                </PageWrapper>
            </div>
            <PageWrapper>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {industries.map((industry, index) => (
                        <motion.div 
                            key={index}
                            whileHover={{ y: -5, scale: 1.02, boxShadow: "0 0 25px rgba(31, 95, 191, 0.3)" }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="glass-surface rounded-lg overflow-hidden group"
                        >
                             <div className="overflow-hidden h-64">
                                <motion.img 
                                    src={industry.imageUrl} 
                                    alt={industry.name}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-slate-100">{industry.name}</h2>
                                <p className="mt-4 text-slate-300">{industry.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </PageWrapper>
        </div>
    );
};

export default IndustriesPage;