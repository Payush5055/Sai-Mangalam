
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { qualityPageData } from '../constants/data';
import { CheckIcon, ArrowDownTrayIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const QualityPage: React.FC = () => {
    return (
        <div className="bg-[#0a0a0a] text-white/80">
            <div className="bg-[#0d0d0d] py-16 text-center" style={{ borderBottom: '1px solid rgba(200,121,65,0.12)' }}>
                <PageWrapper className="py-0">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Quality &amp; Compliance</h1>
                    <p className="mt-6 text-xl text-white/70 max-w-3xl mx-auto">
                        {qualityPageData.intro}
                    </p>
                </PageWrapper>
            </div>

            <PageWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <aside className="lg:col-span-1 lg:sticky top-36 h-min">
                        <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2 mb-4">On this page</h2>
                        <ul className="space-y-2">
                            {qualityPageData.sections.map(section => (
                                <li key={section.id}>
                                    <a href={`#${section.id}`} className="text-white/60 hover:text-[#c87941] hover:underline transition-colors">
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    <div className="lg:col-span-3 space-y-16">
                        {qualityPageData.sections.map(section => (
                            <section key={section.id} id={section.id} className="scroll-mt-32">
                                <h2 className="text-3xl font-bold text-white">{section.title}</h2>
                                <p className="mt-4 text-lg text-white/70">{section.content}</p>
                                <ul className="mt-6 space-y-3">
                                    {section.points.map((point, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckIcon className="h-6 w-6 text-[#c87941] mr-3 mt-1 shrink-0" />
                                            <span className="text-white/80">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}

                        <section id="downloads" className="scroll-mt-32 glass-surface p-8 rounded-lg">
                            <h2 className="text-2xl font-bold text-white text-center">Quality Documents</h2>
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {qualityPageData.downloads.map((doc, index) => (
                                    <a
                                        key={index}
                                        href={doc.url}
                                        className="bg-[#1a1a1f] p-4 rounded-md border border-white/10 flex items-center gap-3 hover:border-[#c87941]/50 hover:bg-[#1a1a1f] transition-all"
                                    >
                                        <ArrowDownTrayIcon className="h-6 w-6 text-[#c87941] shrink-0" />
                                        <span className="font-medium text-white/80">{doc.title}</span>
                                    </a>
                                ))}
                            </div>
                        </section>

                        <section id="contact-qa" className="scroll-mt-32 text-center">
                            <h2 className="text-2xl font-bold text-white">Contact Our QA Team</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-white/70">
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
