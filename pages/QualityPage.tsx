
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { qualityPageData } from '../constants/data';
import { CheckIcon, ArrowDownTrayIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const QualityPage: React.FC = () => {
    return (
        <div className="bg-[#f4f1eb] text-[#6b6258]">
            <div className="bg-[#1a1814] py-16 text-center">
                <PageWrapper className="py-0">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl" style={{ fontFamily: "'Instrument Serif', serif" }}>Quality &amp; Compliance</h1>
                    <p className="mt-6 text-xl text-white/70 max-w-3xl mx-auto">
                        {qualityPageData.intro}
                    </p>
                </PageWrapper>
            </div>

            <PageWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <aside className="lg:col-span-1 lg:sticky top-36 h-min">
                        <h2 className="text-lg font-semibold text-[#1a1814] border-b border-[#ddd8cf] pb-2 mb-4">On this page</h2>
                        <ul className="space-y-2">
                            {qualityPageData.sections.map(section => (
                                <li key={section.id}>
                                    <a href={`#${section.id}`} className="text-[#6b6258] hover:text-[#2d5a3d] hover:underline transition-colors">
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    <div className="lg:col-span-3 space-y-16">
                        {qualityPageData.sections.map(section => (
                            <section key={section.id} id={section.id} className="scroll-mt-32">
                                <h2 className="text-3xl font-bold text-[#1a1814]">{section.title}</h2>
                                <p className="mt-4 text-lg text-[#6b6258]">{section.content}</p>
                                <ul className="mt-6 space-y-3">
                                    {section.points.map((point, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckIcon className="h-6 w-6 text-[#2d5a3d] mr-3 mt-1 shrink-0" />
                                            <span className="text-[#6b6258]">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}

                        <section id="downloads" className="scroll-mt-32 bg-white border border-[#ddd8cf] p-8 rounded-lg shadow-sm">
                            <h2 className="text-2xl font-bold text-[#1a1814] text-center">Quality Documents</h2>
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {qualityPageData.downloads.map((doc, index) => (
                                    <a
                                        key={index}
                                        href={doc.url}
                                        className="bg-[#f4f1eb] p-4 rounded-md border border-[#ddd8cf] flex items-center gap-3 hover:border-[#2d5a3d]/50 transition-all"
                                    >
                                        <ArrowDownTrayIcon className="h-6 w-6 text-[#2d5a3d] shrink-0" />
                                        <span className="font-medium text-[#1a1814]">{doc.title}</span>
                                    </a>
                                ))}
                            </div>
                        </section>

                        <section id="contact-qa" className="scroll-mt-32 text-center">
                            <h2 className="text-2xl font-bold text-[#1a1814]">Contact Our QA Team</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-[#6b6258]">
                                Have a question about our quality processes or need to schedule an audit? Our Quality Assurance team is ready to assist.
                            </p>
                            <div className="mt-8">
                                <Link to="/contact" className="inline-flex items-center gap-2 btn-primary">
                                    <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
                                    Request a Quality Audit
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
            </PageWrapper>
        </div>
    );
};

export default QualityPage;
