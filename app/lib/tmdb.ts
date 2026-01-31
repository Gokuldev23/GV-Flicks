import axios from 'axios';
import { TMDB_BASE_URL } from './constants';
import type { Movie, TMDBResponse, Person, Video, Review } from './types';

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

// Error handling helper
async function tmdbFetch<T>(url: string, params: Record<string, string | number> = {}): Promise<T | null> {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      params: {
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    console.error('TMDB API Error:', error);
    return null;
  }
}

// Trending Movies
export async function getTrendingMovies(timeWindow: 'day' | 'week' = 'week', page: number = 1): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBResponse<Movie>>(
    `${TMDB_BASE_URL}/trending/movie/${timeWindow}`,
    { page }
  );
  return data?.results || [];
}

// Popular Movies
export async function getPopularMovies(page: number = 1): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBResponse<Movie>>(
    `${TMDB_BASE_URL}/movie/popular`,
    { page }
  );
  return data?.results || [];
}

// Top Rated Movies
export async function getTopRatedMovies(page: number = 1): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBResponse<Movie>>(
    `${TMDB_BASE_URL}/movie/top_rated`,
    { page }
  );
  return data?.results || [];
}

// Upcoming Movies
export async function getUpcomingMovies(page: number = 1): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBResponse<Movie>>(
    `${TMDB_BASE_URL}/movie/upcoming`,
    { page }
  );
  return data?.results || [];
}

// Now Playing Movies
export async function getNowPlayingMovies(page: number = 1): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBResponse<Movie>>(
    `${TMDB_BASE_URL}/movie/now_playing`,
    { page }
  );
  return data?.results || [];
}

// Search Movies
export async function searchMovies(query: string, page: number = 1): Promise<Movie[]> {
  if (!query.trim()) return [];
  
  const data = await tmdbFetch<TMDBResponse<Movie>>(
    `${TMDB_BASE_URL}/search/movie`,
    { query, page }
  );
  return data?.results || [];
}

// Discover Movies with Filters
export async function discoverMovies(params: {
  page?: number;
  with_genres?: string;
  'primary_release_date.gte'?: string;
  'primary_release_date.lte'?: string;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  sort_by?: string;
} = {}): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBResponse<Movie>>(
    `${TMDB_BASE_URL}/discover/movie`,
    params
  );
  return data?.results || [];
}

// Movie Details
export async function getMovieDetails(id: string | number): Promise<Movie | null> {
  const data = await tmdbFetch<Movie>(
    `${TMDB_BASE_URL}/movie/${id}`,
    {
      append_to_response: 'videos,images,credits,similar,recommendations,reviews',
    }
  );
  return data;
}

// Similar Movies
export async function getSimilarMovies(movieId: string | number, page: number = 1): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBResponse<Movie>>(
    `${TMDB_BASE_URL}/movie/${movieId}/similar`,
    { page }
  );
  return data?.results || [];
}

// Movie Recommendations
export async function getMovieRecommendations(movieId: string | number, page: number = 1): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBResponse<Movie>>(
    `${TMDB_BASE_URL}/movie/${movieId}/recommendations`,
    { page }
  );
  return data?.results || [];
}

// Movies by Genre
export async function getMoviesByGenre(genreId: number, page: number = 1): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBResponse<Movie>>(
    `${TMDB_BASE_URL}/discover/movie`,
    {
      with_genres: genreId.toString(),
      page,
      sort_by: 'popularity.desc',
    }
  );
  return data?.results || [];
}

// Person Details
export async function getPersonDetails(personId: string | number): Promise<Person | null> {
  const data = await tmdbFetch<Person>(
    `${TMDB_BASE_URL}/person/${personId}`,
    {
      append_to_response: 'movie_credits,images',
    }
  );
  return data;
}

// Get Movie Videos
export async function getMovieVideos(movieId: string | number) {
  const data = await tmdbFetch<{ results: Video[] }>(
    `${TMDB_BASE_URL}/movie/${movieId}/videos`
  );
  return data?.results || [];
}

// Get Movie Reviews
export async function getMovieReviews(movieId: string | number, page: number = 1) {
  const data = await tmdbFetch<TMDBResponse<Review>>(
    `${TMDB_BASE_URL}/movie/${movieId}/reviews`,
    { page }
  );
  return data?.results || [];
}

// Get Movie by Category (helper function)
export async function getMoviesByCategory(
  category: 'trending' | 'popular' | 'top_rated' | 'upcoming' | 'now_playing',
  page: number = 1
): Promise<Movie[]> {
  switch (category) {
    case 'trending':
      return getTrendingMovies('week', page);
    case 'popular':
      return getPopularMovies(page);
    case 'top_rated':
      return getTopRatedMovies(page);
    case 'upcoming':
      return getUpcomingMovies(page);
    case 'now_playing':
      return getNowPlayingMovies(page);
    default:
      return [];
  }
}
