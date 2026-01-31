'use client';

import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useWatchlistStore } from '../../store/watchlistStore';
import Button from './Button';
import type { Movie } from '../../types';

interface WatchlistButtonProps {
  movie: Movie;
}

export default function WatchlistButton({ movie }: WatchlistButtonProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore();
  const inWatchlist = isInWatchlist(movie.id);
  
  const handleToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
      toast.success('Removed from watchlist');
    } else {
      addToWatchlist(movie);
      toast.success('Added to watchlist');
    }
  };
  
  return (
    <Button
      variant={inWatchlist ? 'primary' : 'outline'}
      size="lg"
      onClick={handleToggle}
    >
      <motion.svg
        className="w-5 h-5"
        fill={inWatchlist ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </motion.svg>
      {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
    </Button>
  );
}
