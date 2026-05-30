import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { jobOpenings } from '../constants/data';
import { MapPinIcon, BuildingOffice2Icon } from '@heroicons/react/24/solid';
import { seedImages } from '../constants/seed-images';
import { motion } from 'framer-motion';

const CareersPage: React.FC = () => {
    return (
        <div className="bg-[#f4f1eb] text-[#6b6258]">
            <div className="relative bg-[#1a1814] text-white py-24 text-center">
                <img
                    src={seedImages.careersHero}
                    alt="Team of engineers collaborating in a modern office"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                    style={{ objectPosition: 'center center' }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.8))' }} />
                <PageWrapper className="py-0 relative z-10">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">Join Our Team</h1>
                    <p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto">
                        Be a part of a dynamic and innovative company that's shaping the future of energy. Explore our open positions and grow with us.
                    </p>
                </PageWrapper>
            </div>

            <PageWrapper>
                <h2 className="text-3xl font-bold text-[#1a1814] mb-8" style={{ fontFamily: "'Instrument Serif', serif" }}>Current Openings</h2>
                <div className="space-y-6">
                    {jobOpenings.map((job, index) => (
                        <div key={index} className="bg-white border border-[#ddd8cf] p-6 rounded-lg hover:border-[#2d5a3d]/40 transition-colors duration-300 shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-bold text-[#2d5a3d]">{job.title}</h3>
                                    <div className="flex items-center space-x-4 mt-2 text-[#6b6258]">
                                        <span className="flex items-center"><BuildingOffice2Icon className="h-5 w-5 mr-1" /> {job.department}</span>
                                        <span className="flex items-center"><MapPinIcon className="h-5 w-5 mr-1" /> {job.location}</span>
                                    </div>
                                    <p className="mt-4 text-[#6b6258]">{job.description}</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-2 bg-[#2d5a3d] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#1e3e2a] transition-colors duration-300 whitespace-nowrap"
                                >
                                    Apply Now
                                </motion.button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-white border border-[#ddd8cf] p-12 rounded-lg shadow-sm">
                    <h2 className="text-3xl font-bold text-[#1a1814] text-center mb-8" style={{ fontFamily: "'Instrument Serif', serif" }}>Apply Here</h2>
                    <form className="max-w-2xl mx-auto space-y-6">
                        <div>
                            <label htmlFor="careers-name" className="block text-sm font-medium text-[#6b6258]">Full Name</label>
                            <input type="text" id="careers-name" className="mt-1 block w-full px-3 py-2 form-input" />
                        </div>
                        <div>
                            <label htmlFor="careers-email" className="block text-sm font-medium text-[#6b6258]">Email Address</label>
                            <input type="email" id="careers-email" className="mt-1 block w-full px-3 py-2 form-input" />
                        </div>
                        <div>
                            <label htmlFor="careers-position" className="block text-sm font-medium text-[#6b6258]">Position Applied For</label>
                            <input type="text" id="careers-position" className="mt-1 block w-full px-3 py-2 form-input" />
                        </div>
                        <div>
                            <label htmlFor="resume" className="block text-sm font-medium text-[#6b6258]">Upload Resume (PDF)</label>
                            <input type="file" id="resume" accept=".pdf" className="mt-1 block w-full text-sm text-[#6b6258] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2d5a3d]/10 file:text-[#2d5a3d] hover:file:bg-[#2d5a3d]/20" />
                        </div>
                        <div className="text-center">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary"
                            >
                                Submit Application
                            </motion.button>
                        </div>
                    </form>
                </div>
            </PageWrapper>
        </div>
    );
};

export default CareersPage;
