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
      whileHover={{ y: -5, scale: 1.02, boxShadow: "0 0 25px rgba(31, 95, 191, 0.3)" }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group relative glass-surface rounded-xl flex flex-col"
    >
      <div className="h-48 w-full overflow-hidden rounded-t-xl">
        <img
          src={service.imageUrl}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-100">
          <Link to={service.learnMoreUrl} className="hover:underline focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true"></span>
            {service.title}
          </Link>
        </h3>
        <p className="mt-2 text-slate-300 flex-grow">{service.description}</p>
        <ul className="mt-4 space-y-2 text-sm text-slate-400">
          {service.details.map((detail, index) => (
            <li key={index} className="flex items-start">
              <ChevronRightIcon className="h-5 w-5 text-blue-400 mr-2 shrink-0 mt-px" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-4 border-t border-slate-700 flex flex-wrap gap-4 items-center justify-between">
          <p className="font-semibold text-blue-400 flex items-center gap-1">
            Learn more <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </p>
          {service.viewSpecsUrl && (
            <Link
              to={service.viewSpecsUrl}
              onClick={(e) => e.stopPropagation()} // Prevent parent link from firing
              className="relative z-10 text-sm font-medium text-slate-400 hover:text-blue-300 hover:underline"
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
