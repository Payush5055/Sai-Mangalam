import React, { useState, useRef, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { BoltIcon, BeakerIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;

    const rotateX = (y - 0.5) * -16; // Max rotation 8deg
    const rotateY = (x - 0.5) * 16;  // Max rotation 8deg

    cardRef.current?.style.setProperty('--rotateX', `${rotateX}deg`);
    cardRef.current?.style.setProperty('--rotateY', `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.setProperty('--rotateX', '0deg');
      cardRef.current.style.setProperty('--rotateY', '0deg');
    }
  };

  const isVideo = product.secondaryImageUrl?.endsWith('.mp4') || product.secondaryImageUrl?.endsWith('.webp');

  return (
    <Link 
      to={`/products/${product.id}`}
      className="group block [perspective:1000px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full overflow-hidden rounded-xl bg-slate-100 shadow-lg ring-1 ring-slate-900/5 transition-transform duration-300 ease-out will-change-transform motion-safe:group-hover:scale-[1.03] motion-safe:group-hover:shadow-2xl"
        style={{
          transform: 'translateZ(0) rotateX(var(--rotateX, 0)) rotateY(var(--rotateY, 0))',
        }}
      >
        <div className="aspect-w-4 aspect-h-3 bg-slate-200">
          <img
            src={product.imageUrl}
            // Using the same URL for different widths demonstrates the pattern. In a real app, these files would be generated.
            srcSet={`${product.imageUrl} 480w, ${product.imageUrl} 768w, ${product.imageUrl} 1200w`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt={product.name}
            className="h-full w-full object-cover transition-opacity duration-300"
            loading="lazy"
            decoding="async"
            width="800"
            height="600"
          />
          {product.secondaryImageUrl && (
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            >
              {isHovered && isVideo ? ( // Only render video when hovered for performance
                <video
                  src={product.secondaryImageUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : isVideo ? null : (
                <img
                  src={product.secondaryImageUrl}
                  alt={`${product.name} in context`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="600"
                />
              )}
            </div>
          )}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-bold leading-tight">{product.name}</h3>
          <p className="text-sm text-slate-200 mt-1 truncate">{product.shortDescription}</p>
          <div className="mt-3 flex items-center space-x-3 text-xs font-medium">
             <span className="inline-flex items-center rounded-full bg-slate-700/80 px-2 py-0.5">
                <BoltIcon className="h-3 w-3 mr-1 text-teal-300"/>{product.specifications['Capacity']}
             </span>
             <span className="inline-flex items-center rounded-full bg-slate-700/80 px-2 py-0.5">
                <ArrowsPointingOutIcon className="h-3 w-3 mr-1 text-teal-300"/>{product.specifications['Voltage Class']}
             </span>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;