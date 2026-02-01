// API Configuration
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Image Sizes
export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    xlarge: 'w780',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original',
  },
} as const;

// Movie Categories
export const MOVIE_CATEGORIES = {
  TRENDING: 'trending',
  POPULAR: 'popular',
  TOP_RATED: 'top_rated',
  UPCOMING: 'upcoming',
  NOW_PLAYING: 'now_playing',
} as const;

export const CATEGORY_LABELS = {
  [MOVIE_CATEGORIES.TRENDING]: 'Trending This Week',
  [MOVIE_CATEGORIES.POPULAR]: 'Popular Movies',
  [MOVIE_CATEGORIES.TOP_RATED]: 'Top Rated',
  [MOVIE_CATEGORIES.UPCOMING]: 'Coming Soon',
  [MOVIE_CATEGORIES.NOW_PLAYING]: 'Now Playing',
} as const;

// Genres
export const GENRES = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
} as const;

export const GENRE_LIST = Object.entries(GENRES).map(([id, name]) => ({
  id: parseInt(id),
  name,
}));

// Sort Options
export const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Popularity (High to Low)' },
  { value: 'popularity.asc', label: 'Popularity (Low to High)' },
  { value: 'vote_average.desc', label: 'Rating (High to Low)' },
  { value: 'vote_average.asc', label: 'Rating (Low to High)' },
  { value: 'release_date.desc', label: 'Release Date (Newest)' },
  { value: 'release_date.asc', label: 'Release Date (Oldest)' },
] as const;

// Time Windows
export const TIME_WINDOWS = {
  DAY: 'day',
  WEEK: 'week',
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGES = 500; // TMDB API limit

// Local Storage Keys
export const STORAGE_KEYS = {
  WATCHLIST: 'gv-flicks-watchlist',
  THEME: 'gv-flicks-theme',
  RECENT_SEARCHES: 'gv-flicks-recent-searches',
} as const;

// Animation Durations (in seconds)
export const ANIMATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  HERO_AUTOPLAY: 5,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Rating Colors
export const RATING_COLORS = {
  excellent: { min: 8, color: 'from-green-500 to-emerald-600' },
  good: { min: 7, color: 'from-yellow-500 to-amber-600' },
  average: { min: 5, color: 'from-orange-500 to-orange-600' },
  poor: { min: 0, color: 'from-red-500 to-red-600' },
} as const;

// Placeholder Images
export const PLACEHOLDERS = {
  POSTER: '/placeholder-movie.jpg',
  BACKDROP: '/placeholder-backdrop.jpg',
  PROFILE: '/placeholder-profile.jpg',
} as const;
