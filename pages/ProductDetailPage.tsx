
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { products } from '../constants/data';
import { ArrowDownTrayIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const product = products.find(p => p.id === productId);

    if (!product) {
        return (
            <PageWrapper>
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-50">Product not found</h1>
                    <Link to="/products" className="text-blue-400 hover:underline mt-4 inline-block">
                        &larr; Back to Products
                    </Link>
                </div>
            </PageWrapper>
        );
    }

    return (
        <div className="bg-transparent text-slate-300">
             <div className="bg-slate-900/50 py-8">
                <PageWrapper className="py-0">
                    <nav className="flex" aria-label="Breadcrumb">
                      <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                          <Link to="/products" className="inline-flex items-center text-sm font-medium text-slate-300 hover:text-blue-300">
                            Products
                          </Link>
                        </li>
                        <li>
                          <div className="flex items-center">
                            <ChevronRightIcon className="h-5 w-5 text-slate-500"/>
                            <span className="ml-1 text-sm font-medium text-slate-400 md:ml-2">{product.name}</span>
                          </div>
                        </li>
                      </ol>
                    </nav>
                </PageWrapper>
            </div>
            <PageWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg shadow-lg object-cover aspect-square border border-slate-700"/>
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-slate-50">{product.name}</h1>
                        <p className="mt-4 text-lg text-slate-300">{product.shortDescription}</p>
                        
                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold text-slate-100">Key Features</h2>
                            <ul className="mt-4 space-y-2 list-disc list-inside text-slate-300">
                                {product.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>

                         <div className="mt-8">
                            <h2 className="text-2xl font-semibold text-slate-100">Applications</h2>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {product.applications.map((app, index) => (
                                    <span key={index} className="bg-blue-900/50 text-blue-300 text-sm font-medium px-3 py-1 rounded-full border border-blue-800">{app}</span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10 flex space-x-4">
                             <Link to="/contact" className="btn-primary">
                                Request a Quote
                            </Link>
                             <a href="#" className="flex items-center btn-secondary">
                                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                                Download Datasheet
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                     <h2 className="text-3xl font-bold text-slate-50 text-center mb-8">Technical Specifications</h2>
                     <div className="max-w-4xl mx-auto overflow-x-auto">
                        <div className="glass-surface rounded-lg">
                            <table className="min-w-full">
                                <tbody>
                                    {Object.entries(product.specifications).map(([key, value], index) => (
                                        <tr key={key} className="border-b border-slate-700 last:border-b-0">
                                            <td className="px-6 py-4 font-semibold text-slate-200">{key}</td>
                                            <td className="px-6 py-4 text-slate-300">{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </div>
    );
};

export default ProductDetailPage;