import React, { useState, useRef, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { BoltIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';

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

    const rotateX = (y - 0.5) * -12;
    const rotateY = (x - 0.5) * 12;

    cardRef.current?.style.setProperty('--rotateX', `${rotateX}deg`);
    cardRef.current?.style.setProperty('--rotateY', `${rotateY}deg`);
    cardRef.current?.style.setProperty('--mouse-x', `${x * 100}%`);
    cardRef.current?.style.setProperty('--mouse-y', `${y * 100}%`);
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
        className="relative w-full overflow-hidden rounded-none bg-white transition-all duration-300 ease-out will-change-transform motion-safe:group-hover:shadow-xl"
        style={{
          transform: 'translateZ(0) rotateX(var(--rotateX, 0)) rotateY(var(--rotateY, 0))',
          boxShadow: isHovered
            ? '0 12px 40px rgba(45,90,61,0.18), 0 2px 8px rgba(0,0,0,0.08)'
            : '0 2px 12px rgba(0,0,0,0.08)',
          border: isHovered ? '1px solid rgba(45,90,61,0.4)' : '1px solid #ddd8cf',
          transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.3s',
        }}
      >
        {/* Light-reflection shine overlay */}
        <div className="card-shine" />

        <div className="aspect-w-4 aspect-h-3 bg-[#ede4d3]">
          <img
            src={product.imageUrl}
            srcSet={`${product.imageUrl} 480w, ${product.imageUrl} 768w, ${product.imageUrl} 1200w`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt={product.name}
            className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-100"
            style={{ opacity: 0.85 }}
            loading="lazy"
            decoding="async"
            width="800"
            height="600"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          {product.secondaryImageUrl && (
            <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              {isHovered && isVideo ? (
                <video
                  src={product.secondaryImageUrl}
                  autoPlay loop muted playsInline
                  className="h-full w-full object-cover"
                />
              ) : isVideo ? null : (
                <img
                  src={product.secondaryImageUrl}
                  alt={`${product.name} in context`}
                  className="h-full w-full object-cover"
                  loading="lazy" decoding="async" width="800" height="600"
                />
              )}
            </div>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1814]/60 via-black/20 to-transparent" />

        {/* Content */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 text-white transition-transform duration-300"
          style={{ transform: isHovered ? 'translateY(-44px)' : 'translateY(0)' }}
        >
          <h3 className="text-lg font-bold leading-tight">{product.name}</h3>
          <p className="text-sm text-white/80 mt-1 truncate">{product.shortDescription}</p>
          <div className="mt-3 flex items-center space-x-3 text-xs font-medium">
            <span
              className="inline-flex items-center rounded-full px-2 py-0.5"
              style={{ background: 'rgba(45,90,61,0.8)', border: '1px solid rgba(74,222,128,0.3)', color: '#bbf7d0' }}
            >
              <BoltIcon className="h-3 w-3 mr-1" />{product.specifications['Capacity']}
            </span>
            <span
              className="inline-flex items-center rounded-full px-2 py-0.5"
              style={{ background: 'rgba(45,90,61,0.8)', border: '1px solid rgba(74,222,128,0.3)', color: '#bbf7d0' }}
            >
              <ArrowsPointingOutIcon className="h-3 w-3 mr-1" />{product.specifications['Voltage Class']}
            </span>
          </div>
        </div>

        {/* "View Details" button slides up from bottom on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 px-4 py-3 transition-all duration-300"
          style={{
            transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
            opacity: isHovered ? 1 : 0,
            background: '#2d5a3d',
          }}
        >
          <span className="text-sm font-bold text-white text-center w-full block">
            View Details &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
