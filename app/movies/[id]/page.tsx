import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/lib/components/ui/Navbar";
import Badge from "@/app/lib/components/ui/Badge";
import Button from "@/app/lib/components/ui/Button";
import MovieCard from "@/app/lib/components/ui/MovieCard";
import WatchlistButton from "@/app/lib/components/ui/WatchlistButton";
import { getImageUrl, formatDate, formatRuntime, formatCurrency, getRatingColor } from "@/app/lib/utils";
import type { Movie, Video, CastMember, CrewMember } from "@/app/lib/types";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<{ title?: string; description?: string }> {
  const { id } = await params;
  
  try {
    const res = await fetch(`http://localhost:3000/api/movies/${id}`, {
      cache: 'no-store'
    });
    if (!res.ok) return {};
    const data: Movie = await res.json();
    return {
      title: `${data.title} - GV-Flicks`,
      description: data.overview,
    };
  } catch {
    return {};
  }
}

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const movieRes = await fetch(`http://localhost:3000/api/movies/${id}`, {
    cache: 'no-store'
  });

  if (!movieRes.ok) return notFound();

  const movie: Movie = await movieRes.json();
  const trailer: Video | undefined = movie.videos?.results.find((vid) => vid.type === "Trailer" && vid.site === "YouTube");
  const posterUrl = getImageUrl(movie.poster_path, 'poster', 'large');
  const backdropUrl = getImageUrl(movie.backdrop_path, 'backdrop', 'original');
  const director: CrewMember | undefined = movie.credits?.crew.find((person) => person.job === "Director");
  const mainCast: CastMember[] = movie.credits?.cast.slice(0, 10) || [];
  const similarMovies = movie.similar?.results.slice(0, 12) || [];
  const ratingColor = getRatingColor(movie.vote_average);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      
      {/* Hero Section with Backdrop */}
      <div className="relative min-h-[60vh] md:min-h-[70vh]">
        {/* Backdrop Image */}
        {movie.backdrop_path && (
          <div className="absolute inset-0">
            <Image
              src={backdropUrl}
              alt={movie.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
          </div>
        )}

        {/* Content */}
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Poster */}
            <div className="flex-shrink-0 w-full md:w-80 lg:w-96">
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>

            {/* Movie Info */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="text-xl text-gray-300 italic">&quot;{movie.tagline}&quot;</p>
                )}
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-lg">
                {movie.release_date && (
                  <span className="text-gray-300">{formatDate(movie.release_date, 'year')}</span>
                )}
                {movie.runtime && (
                  <span className="text-gray-300">{formatRuntime(movie.runtime)}</span>
                )}
                {movie.vote_average && movie.vote_average > 0 && (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${ratingColor}`}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold text-white">{movie.vote_average.toFixed(1)}</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <Badge key={genre.id} variant="warning">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Overview */}
              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
                {movie.overview}
              </p>

              {/* Crew */}
              {director && (
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Director</h3>
                  <p className="text-lg font-semibold text-white">{director.name}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-4 pt-4">
                <WatchlistButton movie={movie} />
                {trailer && (
                  <Link href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank">
                    <Button variant="secondary" size="lg">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      Watch Trailer
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {mainCast.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-white mb-6 gradient-text">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mainCast.map((person) => (
              <div key={person.id} className="group">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 mb-2">
                  {person.profile_path ? (
                    <Image
                      src={getImageUrl(person.profile_path, 'profile', 'medium')}
                      alt={person.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="text-white font-medium text-sm line-clamp-1">{person.name}</h3>
                {person.character && (
                  <p className="text-gray-400 text-xs line-clamp-1">{person.character}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Details Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Details</h2>
            <div className="space-y-3 text-gray-300">
              {movie.release_date && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Release Date:</span>
                  <span className="font-medium">{formatDate(movie.release_date, 'full')}</span>
                </div>
              )}
              {movie.budget && movie.budget > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Budget:</span>
                  <span className="font-medium">{formatCurrency(movie.budget)}</span>
                </div>
              )}
              {movie.revenue && movie.revenue > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Revenue:</span>
                  <span className="font-medium">{formatCurrency(movie.revenue)}</span>
                </div>
              )}
              {movie.status && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="font-medium">{movie.status}</span>
                </div>
              )}
              {movie.original_language && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Language:</span>
                  <span className="font-medium">{movie.original_language.toUpperCase()}</span>
                </div>
              )}
            </div>
          </div>

          {movie.production_companies && movie.production_companies.length > 0 && (
            <div className="glass p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">Production</h2>
              <div className="flex flex-wrap gap-3">
                {movie.production_companies.map((company) => (
                  <Badge key={company.id} variant="default">
                    {company.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-white mb-6 gradient-text">Similar Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {similarMovies.map((similarMovie, index) => (
              <MovieCard key={similarMovie.id} movie={similarMovie} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}