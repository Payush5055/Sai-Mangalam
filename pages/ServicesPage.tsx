
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { servicePageData, services } from '../constants/data';
import { ChevronRightIcon, CheckIcon } from '@heroicons/react/24/solid';

const ServiceDetailPage: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const service = servicePageData.find(s => s.id === serviceId);

    if (!service) {
        return (
            <PageWrapper>
                <div className="text-center py-20">
                    <h1 className="text-4xl font-bold text-slate-800">Service Not Found</h1>
                    <p className="mt-4 text-lg text-slate-600">The service you are looking for does not exist.</p>
                    <Link to="/" className="mt-8 inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                        &larr; Back to Home
                    </Link>
                </div>
            </PageWrapper>
        );
    }

    const relatedServices = services
        .filter(s => s.id !== service.id)
        .slice(0, 2);

    return (
        <div className="bg-white">
            <div className="relative bg-slate-800 text-white py-24">
                <img src={service.heroImage} alt={service.title} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                <PageWrapper className="py-0 relative z-10 text-center">
                    <nav className="flex justify-center mb-4" aria-label="Breadcrumb">
                      <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        <li className="inline-flex items-center">
                          <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-200 hover:text-white">
                            Home
                          </Link>
                        </li>
                        <li>
                          <div className="flex items-center">
                            <ChevronRightIcon className="h-5 w-5 text-slate-400"/>
                            <Link to="/#services" className="ml-1 text-sm font-medium text-slate-200 hover:text-white md:ml-2">Services</Link>
                          </div>
                        </li>
                         <li aria-current="page">
                          <div className="flex items-center">
                            <ChevronRightIcon className="h-5 w-5 text-slate-400"/>
                            <span className="ml-1 text-sm font-medium text-slate-400 md:ml-2">{service.title}</span>
                          </div>
                        </li>
                      </ol>
                    </nav>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{service.title}</h1>
                </PageWrapper>
            </div>

            <PageWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-slate-800">Service Overview</h2>
                        <p className="mt-4 text-lg text-slate-600">
                           {service.overview}
                        </p>
                        
                        <h3 className="text-2xl font-bold text-slate-800 mt-12">Scope of Work</h3>
                        <ul className="mt-4 space-y-4 text-slate-600">
                           {service.scopeOfWork.map((point, index) => (
                             <li key={index} className="flex items-start">
                               <CheckIcon className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" />
                               <span>{point}</span>
                             </li>
                           ))}
                        </ul>

                        <h3 className="text-2xl font-bold text-slate-800 mt-12">Frequently Asked Questions</h3>
                        <div className="mt-4 space-y-6">
                            {service.faqs.map((faq, index) => (
                                <div key={index} className="border-l-4 border-blue-500 pl-4">
                                    <h4 className="font-semibold text-slate-800">{faq.question}</h4>
                                    <p className="mt-1 text-slate-600">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="lg:col-span-1 space-y-8 lg:sticky top-36 h-min">
                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-800">Request a Quote</h3>
                            <p className="mt-2 text-slate-600">Get a custom quote for {service.title}.</p>
                            <Link to="/contact" className="mt-4 block w-full text-center bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                                Contact Sales
                            </Link>
                        </div>
                        {relatedServices.length > 0 && (
                          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                              <h3 className="text-xl font-bold text-slate-800">Related Services</h3>
                              <ul className="mt-4 space-y-3">
                                  {relatedServices.map(related => (
                                      <li key={related.id}>
                                          <Link to={related.path} className="font-medium text-blue-600 hover:underline flex justify-between items-center group">
                                            {related.title}
                                            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
                                          </Link>
                                      </li>
                                  ))}
                               </ul>
                          </div>
                        )}
                    </aside>
                </div>
            </PageWrapper>
        </div>
    );
};

export default ServiceDetailPage;
