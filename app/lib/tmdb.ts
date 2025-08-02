// lib/tmdb.ts
import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function getTrendingMovies() {
  const res = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
    params: {
      api_key: TMDB_API_KEY,
    },
  });
  return res.data.results; // Array of movies
}

export async function searchMovies(query: string) {
  try {
    const res = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query,
      },
    });
    if (res.status !== 200) {
      console.error("TMDB fetch failed:", res.status);
      return []
    }
    return res.data.results;
  } catch (error) {
    console.log("ERROR IN FETCH AND HITT CATCH",error)
    return []
  }
}

export async function getMovieDetails(id: string) {
  const res = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
    params: {
      api_key: TMDB_API_KEY,
      append_to_response: "videos,images",
    },
  });
  return res.data;
}
