// app/movies/page.tsx
import Form from "next/form"
import MovieList from "./lib/components/MovieList";
import MovieLoading from "./lib/components/MovieLoading"
import { getTrendingMovies, searchMovies } from "./lib/tmdb";
import { Suspense } from "react";

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const params = await searchParams
  const query = params?.query|| ""
  console.log({ params })
  const movies = query
    ? searchMovies(query)
    : getTrendingMovies();

  return (
    <main className="p-4 text-white">
      <Form action={"/"} className="mb-6">
        <input
          type="text"
          name="query"
          placeholder="Search movies..."
          defaultValue={query}
          className="border p-2 rounded w-full max-w-md"
        />
      </Form>
      <Suspense fallback={<MovieLoading/>}>
        <MovieList moviesPromise={movies} />
      </Suspense>
    </main>
  );
}
