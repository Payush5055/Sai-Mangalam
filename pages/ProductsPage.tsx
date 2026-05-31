import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { products } from '../constants/data';
import ProductCard from '../components/ProductCard';

const ALL = 'All';

const ProductsPage: React.FC = () => {
  const categories = [ALL, ...Array.from(new Set(products.map((p) => p.category)))];
  const [active, setActive] = useState(ALL);

  const filtered = active === ALL ? products : products.filter((p) => p.category === active);

  return (
    <div className="bg-[#f4f1eb] text-[#6b6258]">
      {/* ── Dark hero with filter pills ── */}
      <div className="bg-[#1a1814] pt-16 pb-10">
        <PageWrapper className="py-0">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl text-center" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Our Products
          </h1>
          <p className="mt-4 text-lg text-[#6b6258] max-w-2xl mx-auto text-center">
            Engineered for superior performance and reliability across all applications.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 12,
                  letterSpacing: '0.12em',
                  padding: '6px 18px',
                  border: active === cat ? '1px solid #2d5a3d' : '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 2,
                  background: active === cat ? '#2d5a3d' : 'transparent',
                  color: active === cat ? '#fff' : 'rgba(255,255,255,0.55)',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </PageWrapper>
      </div>

      {/* ── Products grid ── */}
      <div className="max-w-screen-xl mx-auto px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-7 h-0.5 bg-[#2d5a3d]" />
          <div className="text-[9px] text-[#a09585] tracking-[0.25em] uppercase">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
            {active !== ALL ? ` — ${active}` : ''}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#ddd8cf]">
          {filtered.map((product) => (
            <div key={product.id} className="bg-[#f4f1eb]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
