'use client';

import { useState, useEffect } from 'react';
import Navbar from './lib/components/ui/Navbar';
import Hero from './lib/components/ui/Hero';
import SearchBar from './lib/components/ui/SearchBar';
import CategoryTabs from './lib/components/ui/CategoryTabs';
import MovieSection from './lib/components/ui/MovieSection';
import { MOVIE_CATEGORIES } from './lib/constants';
import type { Movie } from './lib/types';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>(MOVIE_CATEGORIES.TRENDING);
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [heroMovies, setHeroMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // Load hero movies (trending for hero carousel)
  useEffect(() => {
    async function loadHeroMovies() {
      try {
        const response = await fetch('/api/movies?category=trending&timeWindow=week');
        const data = await response.json();
        setHeroMovies(data.results || []);
      } catch (error) {
        console.error('Error loading hero movies:', error);
      }
    }
    loadHeroMovies();
  }, []);

  // Load movies based on search or category
  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      try {
        let url = '/api/movies?';
        
        if (searchQuery) {
          url += `query=${encodeURIComponent(searchQuery)}`;
        } else {
          url += `category=${activeCategory}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error('Error loading movies:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }
    
    loadMovies();
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section - Only show when not searching */}
      {!searchQuery && heroMovies.length > 0 && (
        <Hero movies={heroMovies} />
      )}
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Search Bar */}
        <div className="mb-8 md:mb-12">
          <SearchBar onSearch={setSearchQuery} />
        </div>
        
        {/* Category Tabs - Only show when not searching */}
        {!searchQuery && (
          <div className="mb-8 md:mb-12">
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        )}
        
        {/* Movies Section */}
        <MovieSection
          title={
            searchQuery
              ? `Search Results for "${searchQuery}"`
              : activeCategory === MOVIE_CATEGORIES.TRENDING
              ? 'Trending This Week'
              : activeCategory === MOVIE_CATEGORIES.POPULAR
              ? 'Popular Movies'
              : activeCategory === MOVIE_CATEGORIES.TOP_RATED
              ? 'Top Rated'
              : activeCategory === MOVIE_CATEGORIES.UPCOMING
              ? 'Coming Soon'
              : 'Now Playing'
          }
          movies={movies}
          loading={loading}
        />
      </main>
      
      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p className="mb-2">
            Powered by{' '}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              TMDB
            </a>
          </p>
          <p className="text-sm">
            {/* © {new Date().getFullYear()} GV-Flicks. All rights reserved. */}
          </p>
        </div>
      </footer>
    </div>
  );
}
