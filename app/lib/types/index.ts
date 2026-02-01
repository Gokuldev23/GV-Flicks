// Core Movie Types
export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path?: string;
  origin_country?: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface ImageBackdrop {
  file_path: string;
  width: number;
  height: number;
  aspect_ratio: number;
  vote_average: number;
}

export interface CastMember {
  id: number;
  name: string;
  character?: string;
  profile_path?: string;
  order?: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department?: string;
  profile_path?: string;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface Review {
  id: string;
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path?: string;
    rating?: number;
  };
  content: string;
  created_at: string;
  updated_at: string;
}

// Main Movie Interface
export interface Movie {
  id: number;
  title: string;
  original_title?: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string;
  release_date?: string;
  genres?: Genre[];
  genre_ids?: number[];
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  runtime?: number;
  tagline?: string;
  status?: string;
  original_language?: string;
  budget?: number;
  revenue?: number;
  homepage?: string;
  imdb_id?: string;
  adult?: boolean;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  spoken_languages?: SpokenLanguage[];
  videos?: { results: Video[] };
  images?: { backdrops: ImageBackdrop[]; posters: ImageBackdrop[] };
  credits?: Credits;
  similar?: { results: Movie[] };
  recommendations?: { results: Movie[] };
  reviews?: { results: Review[] };
}

// Person Types
export interface Person {
  id: number;
  name: string;
  biography?: string;
  birthday?: string;
  deathday?: string;
  place_of_birth?: string;
  profile_path?: string;
  known_for_department?: string;
  popularity?: number;
  gender?: number;
  also_known_as?: string[];
  homepage?: string;
}

export interface PersonMovieCredit {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
  character?: string;
  job?: string;
  vote_average?: number;
}

// API Response Types
export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBError {
  status_code: number;
  status_message: string;
  success: boolean;
}

// Component Props Types
export interface MovieCardProps {
  movie: Movie;
  variant?: 'default' | 'compact' | 'featured';
  showQuickActions?: boolean;
}

export interface MovieListProps {
  movies: Movie[];
  title?: string;
  loading?: boolean;
  emptyMessage?: string;
}

export interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export interface FilterOptions {
  genres?: number[];
  yearRange?: [number, number];
  ratingRange?: [number, number];
  sortBy?: 'popularity.desc' | 'popularity.asc' | 'vote_average.desc' | 'vote_average.asc' | 'release_date.desc' | 'release_date.asc';
}

// Watchlist Types
export interface WatchlistItem {
  id: number;
  title: string;
  poster_path?: string;
  vote_average?: number;
  release_date?: string;
  addedAt: number;
}
