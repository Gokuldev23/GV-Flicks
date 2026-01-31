'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../lib/components/ui/Navbar';
import MovieCard from '../lib/components/ui/MovieCard';
import Button from '../lib/components/ui/Button';
import { useWatchlistStore } from '../lib/store/watchlistStore';

export default function WatchlistPage() {
  const { items, clearWatchlist } = useWatchlistStore();
  
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your entire watchlist?')) {
      clearWatchlist();
    }
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 md:py-32">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              My Watchlist
            </h1>
            <p className="text-gray-400 text-lg">
              {items.length} {items.length === 1 ? 'movie' : 'movies'} saved
            </p>
          </div>
          
          {items.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="mt-4 md:mt-0"
            >
              Clear All
            </Button>
          )}
        </div>
        
        {/* Watchlist Grid */}
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <svg
                className="w-24 h-24 mx-auto text-gray-700 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-white mb-4">
                Your watchlist is empty
              </h2>
              <p className="text-gray-400 mb-8">
                Start adding movies to your watchlist to keep track of what you want to watch!
              </p>
              <Link href="/">
                <Button variant="primary" size="lg">
                  Discover Movies
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {items.map((item, index) => (
              <MovieCard
                key={item.id}
                movie={{
                  id: item.id,
                  title: item.title,
                  poster_path: item.poster_path,
                  vote_average: item.vote_average,
                  release_date: item.release_date,
                  overview: '',
                  genre_ids: [],
                }}
                index={index}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
