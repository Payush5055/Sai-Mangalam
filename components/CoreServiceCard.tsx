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
      whileHover={{ y: -6, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="group relative card-light rounded-xl flex flex-col overflow-hidden hover:border-[#2d5a3d]/30 transition-all duration-300"
    >
      {/* Green gradient top-border on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to right, #2d5a3d, #4a8c60, #2d5a3d)' }}
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
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(135deg, rgba(45,90,61,0.25) 0%, rgba(74,140,96,0.15) 100%)' }}
        />
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
          style={{
            background: 'rgba(45,90,61,0.85)',
            border: '1px solid rgba(45,90,61,0.5)',
          }}
        >
          {service.category ?? 'Service'}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-[#1a1814]">
          <Link to={service.learnMoreUrl} className="hover:underline focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {service.title}
          </Link>
        </h3>
        <p className="mt-2 text-[#6b6258] flex-grow">{service.description}</p>
        <ul className="mt-4 space-y-2 text-sm text-[#6b6258]">
          {service.details.map((detail, index) => (
            <li key={index} className="flex items-start">
              <ChevronRightIcon className="h-5 w-5 text-[#2d5a3d] mr-2 shrink-0 mt-px" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-4 border-t border-[#ddd8cf] flex flex-wrap gap-4 items-center justify-between">
          <p className="font-semibold text-[#2d5a3d] flex items-center gap-1">
            Learn more <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </p>
          {service.viewSpecsUrl && (
            <Link
              to={service.viewSpecsUrl}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 text-sm font-medium text-[#6b6258] hover:text-[#2d5a3d] hover:underline"
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
