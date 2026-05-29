import React from 'react';
import { Link } from 'react-router-dom';
import { CoreService } from '../types';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface CoreServiceCardProps {
  service: CoreService;
}

const CoreServiceCard: React.FC<CoreServiceCardProps> = ({ service }) => {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 0 30px rgba(200,121,65,0.2)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="group relative liquid-glass rounded-xl flex flex-col overflow-hidden border border-[#c87941]/15 hover:border-[#c87941]/40 transition-all duration-300"
    >
      {/* Copper gradient top-border on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to right, #c87941, #e8c49a, #c87941)' }}
      />

      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
        <img
          src={service.imageUrl}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {/* Copper diagonal overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(135deg, rgba(200,121,65,0.3) 0%, rgba(232,196,154,0.2) 100%)' }}
        />
        {/* Category badge */}
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-white liquid-glass"
          style={{
            background: 'rgba(200,121,65,0.7)',
            border: '1px solid rgba(200,121,65,0.5)',
            boxShadow: '0 0 10px rgba(200,121,65,0.4)',
          }}
        >
          {service.category ?? 'Service'}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white">
          <Link to={service.learnMoreUrl} className="hover:underline focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {service.title}
          </Link>
        </h3>
        <p className="mt-2 text-white/80 flex-grow">{service.description}</p>
        <ul className="mt-4 space-y-2 text-sm text-white/50">
          {service.details.map((detail, index) => (
            <li key={index} className="flex items-start">
              <ChevronRightIcon className="h-5 w-5 text-[#c87941] mr-2 shrink-0 mt-px" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
          <p className="font-semibold text-[#c87941] flex items-center gap-1">
            Learn more <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </p>
          {service.viewSpecsUrl && (
            <Link
              to={service.viewSpecsUrl}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 text-sm font-medium text-white/50 hover:text-[#c87941] hover:underline"
            >
              View specs &rarr;
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CoreServiceCard;
