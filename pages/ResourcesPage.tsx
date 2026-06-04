import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { resources } from '../constants/data';
import { ArrowDownTrayIcon, DocumentTextIcon, CheckBadgeIcon, BoltIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const getIcon = (type: string) => {
    switch (type) {
        case 'Catalog': return <BoltIcon className="h-8 w-8 text-[#2d5a3d]" />;
        case 'Brochure': return <DocumentTextIcon className="h-8 w-8 text-[#2d5a3d]" />;
        case 'Certificate': return <CheckBadgeIcon className="h-8 w-8 text-[#2d5a3d]" />;
        case 'Manual': return <DocumentTextIcon className="h-8 w-8 text-[#2d5a3d]" />;
        default: return <DocumentTextIcon className="h-8 w-8 text-[#2d5a3d]" />;
    }
};

const ResourcesPage: React.FC = () => {
    return (
        <div className="bg-[#f5efe4]">
            <div className="bg-[#1a1814] py-16 text-center">
                <PageWrapper className="py-0">
                    <h1 className="text-4xl font-bold tracking-tight text-[#1a1814] sm:text-5xl" style={{ fontFamily: "'Instrument Serif', serif" }}>Downloads &amp; Resources</h1>
                    <p className="mt-6 text-xl text-[#1a1814]/70 max-w-3xl mx-auto">
                        Access our library of technical documents, product catalogs, and corporate certificates.
                    </p>
                </PageWrapper>
            </div>
            <PageWrapper>
                <div className="max-w-4xl mx-auto">
                    <ul className="space-y-4">
                        {resources.map((resource, index) => (
                            <motion.li
                                key={index}
                                whileHover={{ scale: 1.01, x: 4, boxShadow: '0 0 15px rgba(200,121,65,0.2)' }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                className="bg-white border border-[#ddd8cf] hover:border-[#2d5a3d]/40 p-6 rounded-lg flex items-center justify-between transition-colors duration-300 shadow-sm"
                            >
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 mr-6">
                                        {getIcon(resource.type)}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-[#1a1814]">{resource.title}</h2>
                                        <p className="text-sm text-[#6b6258]">{resource.type}</p>
                                    </div>
                                </div>
                                <motion.a
                                    href={resource.url}
                                    download
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center bg-[#2d5a3d] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#1e3e2a] transition-colors duration-300"
                                >
                                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                                    Download
                                </motion.a>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </PageWrapper>
        </div>
    );
};

export default ResourcesPage;
