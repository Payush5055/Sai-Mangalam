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

    const rotateX = (y - 0.5) * -16;
    const rotateY = (x - 0.5) * 16;

    cardRef.current?.style.setProperty('--rotateX', `${rotateX}deg`);
    cardRef.current?.style.setProperty('--rotateY', `${rotateY}deg`);
    // Shine position follows mouse
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
        className="relative w-full overflow-hidden rounded-xl bg-black shadow-lg transition-all duration-300 ease-out will-change-transform motion-safe:group-hover:scale-[1.03] motion-safe:group-hover:shadow-2xl"
        style={{
          transform: 'translateZ(0) rotateX(var(--rotateX, 0)) rotateY(var(--rotateY, 0))',
          boxShadow: isHovered
            ? '0 0 30px 4px rgba(200,121,65,0.3), 0 20px 40px rgba(0,0,0,0.5)'
            : '0 4px 20px rgba(0,0,0,0.4)',
          border: isHovered ? '1px solid rgba(200,121,65,0.5)' : '1px solid rgba(200,121,65,0.12)',
          transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.3s',
        }}
      >
        {/* Light-reflection shine overlay */}
        <div className="card-shine" />

        <div className="aspect-w-4 aspect-h-3 bg-[#111318]">
          <img
            src={product.imageUrl}
            srcSet={`${product.imageUrl} 480w, ${product.imageUrl} 768w, ${product.imageUrl} 1200w`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt={product.name}
            className="h-full w-full object-cover transition-opacity duration-300"
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

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
              style={{ background: 'rgba(200,121,65,0.15)', border: '1px solid rgba(200,121,65,0.4)', color: '#c87941' }}
            >
              <BoltIcon className="h-3 w-3 mr-1" />{product.specifications['Capacity']}
            </span>
            <span
              className="inline-flex items-center rounded-full px-2 py-0.5"
              style={{ background: 'rgba(200,121,65,0.15)', border: '1px solid rgba(200,121,65,0.4)', color: '#c87941' }}
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
            background: 'linear-gradient(135deg, rgba(200,121,65,0.9), rgba(160,98,47,0.85))',
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
