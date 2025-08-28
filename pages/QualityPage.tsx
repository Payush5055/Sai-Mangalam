
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { qualityPageData } from '../constants/data';
import { CheckIcon, ArrowDownTrayIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const QualityPage: React.FC = () => {
    return (
        <div className="bg-transparent text-slate-300">
            <div className="bg-slate-900/50 py-16 text-center">
                <PageWrapper className="py-0">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">Quality & Compliance</h1>
                    <p className="mt-6 text-xl text-slate-300 max-w-3xl mx-auto">
                        {qualityPageData.intro}
                    </p>
                </PageWrapper>
            </div>

            <PageWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <aside className="lg:col-span-1 lg:sticky top-36 h-min">
                        <h2 className="text-lg font-semibold text-slate-100 border-b border-slate-700 pb-2 mb-4">On this page</h2>
                        <ul className="space-y-2">
                            {qualityPageData.sections.map(section => (
                                <li key={section.id}>
                                    <a href={`#${section.id}`} className="text-slate-300 hover:text-blue-300 hover:underline">
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    <div className="lg:col-span-3 space-y-16">
                        {qualityPageData.sections.map(section => (
                            <section key={section.id} id={section.id} className="scroll-mt-32">
                                <h2 className="text-3xl font-bold text-slate-100">{section.title}</h2>
                                <p className="mt-4 text-lg text-slate-300">{section.content}</p>
                                <ul className="mt-6 space-y-3">
                                    {section.points.map((point, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckIcon className="h-6 w-6 text-green-400 mr-3 mt-1 shrink-0" />
                                            <span className="text-slate-200">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}

                        <section id="downloads" className="scroll-mt-32 glass-surface p-8 rounded-lg">
                             <h2 className="text-2xl font-bold text-slate-100 text-center">Quality Documents</h2>
                             <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {qualityPageData.downloads.map((doc, index) => (
                                    <a 
                                        key={index}
                                        href={doc.url}
                                        className="bg-slate-800/50 p-4 rounded-md border border-slate-700 flex items-center gap-3 hover:border-blue-500 hover:bg-slate-700/50 transition-all"
                                    >
                                        <ArrowDownTrayIcon className="h-6 w-6 text-blue-400 shrink-0"/>
                                        <span className="font-medium text-slate-200">{doc.title}</span>
                                    </a>
                                ))}
                             </div>
                        </section>

                        <section id="contact-qa" className="scroll-mt-32 text-center">
                            <h2 className="text-2xl font-bold text-slate-100">Contact Our QA Team</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
                                Have a question about our quality processes or need to schedule an audit? Our Quality Assurance team is ready to assist.
                            </p>
                            <div className="mt-8">
                                <Link to="/contact" className="inline-flex items-center gap-2 btn-primary">
                                    <ChatBubbleBottomCenterTextIcon className="h-5 w-5"/>
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