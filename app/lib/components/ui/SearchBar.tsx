'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from '../../hooks';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = 'Search movies...' }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get('query') || '');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  
  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedQuery);
    } else if (debouncedQuery) {
      router.push(`/?query=${encodeURIComponent(debouncedQuery)}`);
    } else if (debouncedQuery === '' && searchParams?.get('query')) {
      router.push('/');
    }
  }, [debouncedQuery, onSearch, router, searchParams]);
  
  const handleClear = () => {
    setQuery('');
    if (!onSearch) {
      router.push('/');
    }
  };
  
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <motion.div
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        className={`relative flex items-center transition-all duration-300 ${
          isFocused ? 'shadow-lg shadow-yellow-500/20' : 'shadow-md'
        }`}
      >
        {/* Search Icon */}
        <div className="absolute left-4 pointer-events-none">
          <svg
            className={`w-5 h-5 transition-colors duration-300 ${
              isFocused ? 'text-yellow-500' : 'text-gray-400'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 md:py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-all duration-300"
        />
        
        {/* Clear Button */}
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="absolute right-4 p-1 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Clear search"
            >
              <svg
                className="w-5 h-5 text-gray-400 hover:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Search Hint */}
      {isFocused && !query && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-2 left-0 right-0 p-3 bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-700 text-sm text-gray-400"
        >
          💡 Try searching for &quot;Inception&quot;, &quot;Avatar&quot;, or any movie title
        </motion.div>
      )}
    </div>
  );
}
