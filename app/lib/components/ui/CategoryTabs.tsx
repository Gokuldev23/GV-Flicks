'use client';

import { motion } from 'framer-motion';
import { MOVIE_CATEGORIES, CATEGORY_LABELS } from '../../constants';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const categories = Object.values(MOVIE_CATEGORIES);
  
  return (
    <div className="relative">
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`relative px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all duration-300 ${
              activeCategory === category
                ? 'text-black'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            {activeCategory === category && (
              <motion.div
                layoutId="category-tab"
                className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-lg shadow-lg"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
