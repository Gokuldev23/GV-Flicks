'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useWatchlistStore } from '../../store/watchlistStore';
import { getImageUrl, formatDate, getRatingColor } from '../../utils';
import { getGenreNames } from '../../utils';
import Badge from './Badge';
import type { Movie } from '../../types';
import toast from 'react-hot-toast';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export default function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore();
  const inWatchlist = isInWatchlist(movie.id);
  
  const posterUrl = getImageUrl(movie.poster_path, 'poster', 'medium');
  const genreNames = getGenreNames(movie.genre_ids);
  const ratingColor = getRatingColor(movie.vote_average);
  
  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
      toast.success('Removed from watchlist');
    } else {
      addToWatchlist(movie);
      toast.success('Added to watchlist');
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className='movie-card p-4'
    >
      <Link href={`/movies/${movie.id}`} className=''>
      <div className='hovered-effect'></div>
        <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform  bg-gray-900">
          {/* Poster Image */}
          <div className="relative aspect-[2/3] overflow-hidden bg-gray-800">
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className={`object-cover transition-all duration-500 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              } group-hover:scale-110`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Loading Skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 skeleton" />
            )}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Rating Badge */}
            {movie.vote_average && movie.vote_average > 0 && (
              <div className={`absolute top-3 right-3 bg-gradient-to-r ${ratingColor} text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center shadow-lg`}>
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {movie.vote_average.toFixed(1)}
              </div>
            )}
            
            {/* Watchlist Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWatchlistToggle}
              className={`absolute top-3 left-3 p-2 rounded-full shadow-lg transition-all duration-300 ${
                inWatchlist
                  ? 'bg-yellow-500 text-black'
                  : 'bg-black/50 text-white hover:bg-black/70'
              }`}
              aria-label={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
            >
              <svg
                className="w-5 h-5"
                fill={inWatchlist ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </motion.button>
            
            {/* Quick Info on Hover */}
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex flex-wrap gap-1">
                {genreNames.slice(0, 2).map((genre) => (
                  <Badge key={genre} variant="warning" size="sm">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Movie Info */}
          <div className="p-3 bg-gradient-to-b from-gray-900 to-gray-800">
            <h3 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-yellow-400 transition-colors mb-1">
              {movie.title}
            </h3>
            <p className="text-gray-400 text-xs">
              {movie.release_date ? formatDate(movie.release_date, 'year') : 'TBA'}
            </p>
          </div>
          
          {/* Border Glow on Hover */}
          {/* <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500/50 rounded-xl transition-all duration-300 pointer-events-none" /> */}
        </div>
      </Link>
    </motion.div>
  );
}
