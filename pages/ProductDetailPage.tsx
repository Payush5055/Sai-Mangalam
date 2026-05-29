
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
                    <h1 className="text-2xl font-bold text-white">Product not found</h1>
                    <Link to="/products" className="text-[#c87941] hover:underline mt-4 inline-block">
                        &larr; Back to Products
                    </Link>
                </div>
            </PageWrapper>
        );
    }

    return (
        <div className="bg-[#0a0a0a] text-white/80">
            <div className="bg-[#0d0d0d] py-8" style={{ borderBottom: '1px solid rgba(200,121,65,0.12)' }}>
                <PageWrapper className="py-0">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link to="/products" className="inline-flex items-center text-sm font-medium text-white/70 hover:text-[#c87941]">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <ChevronRightIcon className="h-5 w-5 text-white/30" />
                                    <span className="ml-1 text-sm font-medium text-white/50 md:ml-2">{product.name}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </PageWrapper>
            </div>
            <PageWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full rounded-lg shadow-lg object-cover aspect-square border border-white/10"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white">{product.name}</h1>
                        <p className="mt-4 text-lg text-white/70">{product.shortDescription}</p>

                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold text-white">Key Features</h2>
                            <ul className="mt-4 space-y-2 list-disc list-inside text-white/70">
                                {product.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold text-white">Applications</h2>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {product.applications.map((app, index) => (
                                    <span key={index} className="text-sm font-medium px-3 py-1 rounded-full border" style={{ background: 'rgba(200,121,65,0.1)', borderColor: 'rgba(200,121,65,0.3)', color: '#c87941' }}>{app}</span>
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
                    <h2 className="text-3xl font-bold text-white text-center mb-8">Technical Specifications</h2>
                    <div className="max-w-4xl mx-auto overflow-x-auto">
                        <div className="bg-[#1a1a1f] border border-white/10 rounded-lg">
                            <table className="min-w-full">
                                <tbody>
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <tr key={key} className="border-b border-white/10 last:border-b-0">
                                            <td className="px-6 py-4 font-semibold text-white">{key}</td>
                                            <td className="px-6 py-4 text-white/70">{value}</td>
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
