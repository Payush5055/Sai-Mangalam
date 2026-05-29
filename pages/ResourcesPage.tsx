import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { resources } from '../constants/data';
import { ArrowDownTrayIcon, DocumentTextIcon, CheckBadgeIcon, BoltIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const getIcon = (type: string) => {
    switch (type) {
        case 'Catalog': return <BoltIcon className="h-8 w-8 text-[#c87941]" />;
        case 'Brochure': return <DocumentTextIcon className="h-8 w-8 text-[#c87941]" />;
        case 'Certificate': return <CheckBadgeIcon className="h-8 w-8 text-[#c87941]" />;
        case 'Manual': return <DocumentTextIcon className="h-8 w-8 text-[#c87941]" />;
        default: return <DocumentTextIcon className="h-8 w-8 text-[#c87941]" />;
    }
};

const ResourcesPage: React.FC = () => {
    return (
        <div className="bg-[#0a0a0a]">
            <div className="bg-[#0d0d0d] py-16 text-center" style={{ borderBottom: '1px solid rgba(200,121,65,0.12)' }}>
                <PageWrapper className="py-0">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Downloads &amp; Resources</h1>
                    <p className="mt-6 text-xl text-white/70 max-w-3xl mx-auto">
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
                                className="bg-[#1a1a1f] border border-white/10 hover:border-[#c87941]/40 p-6 rounded-lg flex items-center justify-between transition-colors duration-300"
                            >
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 mr-6">
                                        {getIcon(resource.type)}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">{resource.title}</h2>
                                        <p className="text-sm text-white/50">{resource.type}</p>
                                    </div>
                                </div>
                                <motion.a
                                    href={resource.url}
                                    download
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center bg-[#c87941] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#a0622f] transition-colors duration-300"
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
