
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
                    <h1 className="text-2xl font-bold text-[#1a1814]">Product not found</h1>
                    <Link to="/products" className="text-[#2d5a3d] hover:underline mt-4 inline-block">
                        &larr; Back to Products
                    </Link>
                </div>
            </PageWrapper>
        );
    }

    return (
        <div className="bg-[#f4f1eb] text-[#6b6258]">
            <div className="bg-[#eeeae2] py-8" style={{ borderBottom: '1px solid #ddd8cf' }}>
                <PageWrapper className="py-0">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link to="/products" className="inline-flex items-center text-sm font-medium text-[#6b6258] hover:text-[#2d5a3d]">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <ChevronRightIcon className="h-5 w-5 text-[#6b6258]/50" />
                                    <span className="ml-1 text-sm font-medium text-[#6b6258] md:ml-2">{product.name}</span>
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
                            className="w-full rounded-lg shadow-lg object-cover aspect-square border border-[#ddd8cf]"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-[#1a1814]">{product.name}</h1>
                        <p className="mt-4 text-lg text-[#6b6258]">{product.shortDescription}</p>

                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold text-[#1a1814]">Key Features</h2>
                            <ul className="mt-4 space-y-2 list-disc list-inside text-[#6b6258]">
                                {product.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold text-[#1a1814]">Applications</h2>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {product.applications.map((app, index) => (
                                    <span key={index} className="text-sm font-medium px-3 py-1 rounded-full border" style={{ background: 'rgba(45,90,61,0.08)', borderColor: 'rgba(45,90,61,0.25)', color: '#2d5a3d' }}>{app}</span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10 flex space-x-4">
                            <Link to="/contact" className="btn-primary">
                                Request a Quote
                            </Link>
                            <a href="#" className="flex items-center border border-[#2d5a3d] text-[#2d5a3d] font-semibold px-6 py-3 rounded-lg hover:bg-[#2d5a3d]/8 transition-colors">
                                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                                Download Datasheet
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-[#1a1814] text-center mb-8" style={{ fontFamily: "'Instrument Serif', serif" }}>Technical Specifications</h2>
                    <div className="max-w-4xl mx-auto overflow-x-auto">
                        <div className="bg-white border border-[#ddd8cf] rounded-lg shadow-sm">
                            <table className="min-w-full">
                                <tbody>
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <tr key={key} className="border-b border-[#ddd8cf] last:border-b-0">
                                            <td className="px-6 py-4 font-semibold text-[#1a1814]">{key}</td>
                                            <td className="px-6 py-4 text-[#6b6258]">{value}</td>
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
