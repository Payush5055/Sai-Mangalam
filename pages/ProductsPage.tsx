
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { products } from '../constants/data';
import ProductCard from '../components/ProductCard';

const ProductsPage: React.FC = () => {
    return (
        <div className="bg-[#f4f1eb]">
            <div className="bg-[#1a1814] py-16">
                <PageWrapper className="py-0 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl" style={{ fontFamily: "'Instrument Serif', serif" }}>Our Products</h1>
                    <p className="mt-6 text-xl text-white/70 max-w-3xl mx-auto">
                        Explore our wide range of transformers, engineered for superior performance and reliability across all applications.
                    </p>
                </PageWrapper>
            </div>

            <PageWrapper>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </PageWrapper>
        </div>
    );
};

export default ProductsPage;
