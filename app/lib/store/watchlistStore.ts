import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '../constants';
import type { WatchlistItem, Movie } from '../types';

interface WatchlistState {
  items: WatchlistItem[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
  clearWatchlist: () => void;
  getWatchlistCount: () => number;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToWatchlist: (movie: Movie) => {
        const { items } = get();
        
        // Check if already in watchlist
        if (items.some(item => item.id === movie.id)) {
          return;
        }
        
        const newItem: WatchlistItem = {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
          addedAt: Date.now(),
        };
        
        set({ items: [newItem, ...items] });
      },
      
      removeFromWatchlist: (movieId: number) => {
        set(state => ({
          items: state.items.filter(item => item.id !== movieId),
        }));
      },
      
      isInWatchlist: (movieId: number) => {
        return get().items.some(item => item.id === movieId);
      },
      
      clearWatchlist: () => {
        set({ items: [] });
      },
      
      getWatchlistCount: () => {
        return get().items.length;
      },
    }),
    {
      name: STORAGE_KEYS.WATCHLIST,
    }
  )
);
