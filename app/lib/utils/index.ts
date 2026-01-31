import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES, PLACEHOLDERS, GENRES, RATING_COLORS } from '../constants';
import type { Movie } from '../types';

/**
 * Build TMDB image URL
 */
export function getImageUrl(
  path: string | null | undefined,
  size: 'poster' | 'backdrop' | 'profile' = 'poster',
  sizeVariant: 'small' | 'medium' | 'large' | 'original' = 'medium'
): string {
  if (!path) {
    return size === 'poster' 
      ? PLACEHOLDERS.POSTER 
      : size === 'backdrop' 
      ? PLACEHOLDERS.BACKDROP 
      : PLACEHOLDERS.PROFILE;
  }
  
  const sizeMap = IMAGE_SIZES[size];
  const selectedSize = sizeMap[sizeVariant as keyof typeof sizeMap] || sizeMap.medium;
  
  return `${TMDB_IMAGE_BASE_URL}/${selectedSize}${path}`;
}

/**
 * Format date to readable string
 */
export function formatDate(dateString: string | undefined, format: 'full' | 'year' | 'short' = 'full'): string {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  
  if (format === 'year') {
    return date.getFullYear().toString();
  }
  
  if (format === 'short') {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }
  
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

/**
 * Format runtime to hours and minutes
 */
export function formatRuntime(minutes: number | undefined): string {
  if (!minutes) return 'N/A';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  
  return `${hours}h ${mins}m`;
}

/**
 * Format currency
 */
export function formatCurrency(amount: number | undefined): string {
  if (!amount || amount === 0) return 'N/A';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format large numbers (e.g., 1.2M, 3.4K)
 */
export function formatNumber(num: number | undefined): string {
  if (!num) return '0';
  
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  
  return num.toString();
}

/**
 * Get genre names from IDs
 */
export function getGenreNames(genreIds: number[] | undefined): string[] {
  if (!genreIds || genreIds.length === 0) return [];
  
  return genreIds
    .map(id => GENRES[id as keyof typeof GENRES])
    .filter(Boolean);
}

/**
 * Get rating color class based on score
 */
export function getRatingColor(rating: number | undefined): string {
  if (!rating) return RATING_COLORS.poor.color;
  
  if (rating >= RATING_COLORS.excellent.min) return RATING_COLORS.excellent.color;
  if (rating >= RATING_COLORS.good.min) return RATING_COLORS.good.color;
  if (rating >= RATING_COLORS.average.min) return RATING_COLORS.average.color;
  
  return RATING_COLORS.poor.color;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string | undefined, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Get YouTube embed URL
 */
export function getYouTubeEmbedUrl(videoKey: string): string {
  return `https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`;
}

/**
 * Get YouTube thumbnail URL
 */
export function getYouTubeThumbnail(videoKey: string, quality: 'default' | 'hq' | 'maxres' = 'hq'): string {
  const qualityMap = {
    default: 'default',
    hq: 'hqdefault',
    maxres: 'maxresdefault',
  };
  
  return `https://img.youtube.com/vi/${videoKey}/${qualityMap[quality]}.jpg`;
}

/**
 * Debounce function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Check if movie is in watchlist
 */
export function isInWatchlist(movieId: number, watchlist: number[]): boolean {
  return watchlist.includes(movieId);
}

/**
 * Get relative time (e.g., "2 days ago")
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };
  
  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }
  
  return 'just now';
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number | undefined, max: number = 10): number {
  if (!value) return 0;
  return Math.round((value / max) * 100);
}

/**
 * Sort movies by criteria
 */
export function sortMovies(movies: Movie[], sortBy: string): Movie[] {
  const sorted = [...movies];
  
  switch (sortBy) {
    case 'popularity.desc':
      return sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    case 'popularity.asc':
      return sorted.sort((a, b) => (a.popularity || 0) - (b.popularity || 0));
    case 'vote_average.desc':
      return sorted.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
    case 'vote_average.asc':
      return sorted.sort((a, b) => (a.vote_average || 0) - (b.vote_average || 0));
    case 'release_date.desc':
      return sorted.sort((a, b) => {
        const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
        const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
        return dateB - dateA;
      });
    case 'release_date.asc':
      return sorted.sort((a, b) => {
        const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
        const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
        return dateA - dateB;
      });
    default:
      return sorted;
  }
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
