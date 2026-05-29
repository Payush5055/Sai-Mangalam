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
      whileHover={{ y: -6, boxShadow: '0 0 30px rgba(14,165,233,0.25)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="group relative glass-surface rounded-xl flex flex-col overflow-hidden"
    >
      {/* Amber gradient top-border appears on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to right, #f59e0b, #fbbf24, #f59e0b)' }}
      />

      {/* Image container */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
        <img
          src={service.imageUrl}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Blue-to-amber diagonal gradient overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.45) 0%, rgba(245,158,11,0.35) 100%)' }}
        />
        {/* Category badge top-right */}
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
          style={{
            background: 'rgba(14,165,233,0.75)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(14,165,233,0.5)',
            boxShadow: '0 0 10px rgba(14,165,233,0.4)',
          }}
        >
          {service.category ?? 'Service'}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-100">
          <Link to={service.learnMoreUrl} className="hover:underline focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {service.title}
          </Link>
        </h3>
        <p className="mt-2 text-slate-300 flex-grow">{service.description}</p>
        <ul className="mt-4 space-y-2 text-sm text-slate-400">
          {service.details.map((detail, index) => (
            <li key={index} className="flex items-start">
              <ChevronRightIcon className="h-5 w-5 text-amber-400 mr-2 shrink-0 mt-px" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-4 border-t border-slate-700/60 flex flex-wrap gap-4 items-center justify-between">
          <p className="font-semibold text-sky-400 flex items-center gap-1">
            Learn more <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </p>
          {service.viewSpecsUrl && (
            <Link
              to={service.viewSpecsUrl}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 text-sm font-medium text-slate-400 hover:text-amber-400 hover:underline"
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
