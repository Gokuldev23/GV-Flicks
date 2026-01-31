import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category') || 'trending';
  const page = searchParams.get('page') || '1';
  const query = searchParams.get('query');
  const timeWindow = searchParams.get('timeWindow') || 'week';

  console.log('category', category);
  console.log('page', page);
  console.log('query', query);
  console.log('timeWindow', timeWindow);

  try {
    let url = '';
    const params: Record<string, string> = {
      page,
    };

    if (query) {
      // Search movies
      url = `${TMDB_BASE_URL}/search/movie`;
      params.query = query;
    } else {
      // Category-based fetching
      switch (category) {
        case 'trending':
          url = `${TMDB_BASE_URL}/trending/movie/${timeWindow}`;
          break;
        case 'popular':
          url = `${TMDB_BASE_URL}/movie/popular`;
          break;
        case 'top_rated':
          url = `${TMDB_BASE_URL}/movie/top_rated`;
          break;
        case 'upcoming':
          url = `${TMDB_BASE_URL}/movie/upcoming`;
          break;
        case 'now_playing':
          url = `${TMDB_BASE_URL}/movie/now_playing`;
          break;
        default:
          url = `${TMDB_BASE_URL}/trending/movie/week`;
      }
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      params,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('TMDB API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}
