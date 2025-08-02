// app/movie/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";


const TMDB_API_KEY = process.env.TMDB_API_KEY;

interface Genre {
    id: number;
    name: string;
}

interface ProductionCompany {
    id: number;
    name: string;
}

interface CrewMember {
    id: number;
    name: string;
    job: string;
}

interface CastMember {
    id: number;
    name: string;
}

interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
}

interface ImageBackdrop {
    file_path: string;
}

interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date?: string;
    genres?: Genre[];
    vote_average?: number;
    runtime?: number;
    poster_path?: string;
    backdrop_path?: string;
    tagline?: string;
    status?: string;
    original_language?: string;
    budget?: number;
    revenue?: number;
    production_companies?: ProductionCompany[];
    videos: { results: Video[] };
    images: { backdrops: ImageBackdrop[] };
    credits: { crew: CrewMember[]; cast: CastMember[] };
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<{ title?: string; description?: string }> {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${TMDB_API_KEY}`);
    if (!res.ok) return {};
    const data: Movie = await res.json();
    return {
        title: data.title,
        description: data.overview,
    };
}


export default async function MoviePage({ params }: { params: { id: string } }) {
    const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=${TMDB_API_KEY}&append_to_response=videos,images,credits`
    );

    if (!movieRes.ok) return notFound();

    const movie: Movie = await movieRes.json();
    const trailer: Video | undefined = movie.videos.results.find((vid) => vid.type === "Trailer" && vid.site === "YouTube");
    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder-movie.jpg';
    const backdrops: ImageBackdrop[] = movie.images.backdrops.slice(0, 4);
    const director: CrewMember | undefined = movie.credits.crew.find((person) => person.job === "Director");
    const mainCast: CastMember[] = movie.credits.cast.slice(0, 5);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            {/* Hero Section */}
            <div className="relative">
                {movie.backdrop_path && (
                    <div className="absolute inset-0 bg-black/50 z-10" />
                )}
                <div className="container mx-auto px-4 py-16 relative z-20">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Poster */}
                        <div className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4">
                            <Image
                                src={posterUrl}
                                alt={movie.title}
                                width={300}
                                height={450}
                                className="rounded-xl shadow-2xl w-full h-auto"
                                priority
                            />
                        </div>

                        {/* Movie Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <h1 className="text-4xl lg:text-5xl font-bold">{movie.title}</h1>
                                {movie.release_date && (
                                    <span className="text-2xl text-gray-300">
                                        ({new Date(movie.release_date).getFullYear()})
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {movie.genres?.map((genre: Genre) => (
                                    <span key={genre.id} className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                    <StarIcon className="h-5 w-5 text-yellow-400" />
                                    <span className="ml-1 font-bold">{movie.vote_average?.toFixed(1)}</span>
                                    <span className="text-gray-400 text-sm ml-1">/10</span>
                                </div>
                                <span className="text-gray-300">{movie.runtime} min</span>
                            </div>

                            <p className="text-lg text-gray-300 max-w-3xl">{movie.overview}</p>

                            {director && (
                                <div>
                                    <h3 className="text-gray-400">Director</h3>
                                    <p className="font-medium">{director.name}</p>
                                </div>
                            )}

                            {mainCast.length > 0 && (
                                <div>
                                    <h3 className="text-gray-400">Cast</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {mainCast.map((person: CastMember) => (
                                            <span key={person.id} className="text-gray-300">
                                                {person.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {trailer && (
                                <a
                                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                                >
                                    <PlayIcon className="h-5 w-5 mr-2" />
                                    Watch Trailer
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrops Gallery */}
            {backdrops.length > 0 && (
                <div className="container mx-auto px-4 py-12">
                    <h2 className="text-2xl font-bold mb-6">Gallery</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {backdrops.map((img: ImageBackdrop) => (
                            <div key={img.file_path} className="relative group overflow-hidden rounded-lg">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                                    alt="Movie backdrop"
                                    width={500}
                                    height={300}
                                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Additional Info */}
            <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Details</h2>
                    <div className="space-y-2 text-gray-300">
                        {movie.release_date && (
                            <p><span className="font-medium text-white">Release Date:</span> {new Date(movie.release_date).toLocaleDateString()}</p>
                        )}
                        {movie.budget! > 0 && (
                            <p><span className="font-medium text-white">Budget:</span> ${movie.budget!.toLocaleString()}</p>
                        )}
                        {movie.revenue! > 0 && (
                            <p><span className="font-medium text-white">Revenue:</span> ${movie.revenue!.toLocaleString()}</p>
                        )}
                        {movie.production_companies && movie.production_companies.length > 0 && (
                            <div>
                                <span className="font-medium text-white">Production:</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {movie.production_companies.map((company: ProductionCompany) => (
                                        <span key={company.id} className="bg-gray-700/50 px-2 py-1 rounded text-sm">
                                            {company.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Facts</h2>
                    <div className="space-y-2 text-gray-300">
                        {movie.status && (
                            <p><span className="font-medium text-white">Status:</span> {movie.status}</p>
                        )}
                        {movie.original_language && (
                            <p><span className="font-medium text-white">Original Language:</span> {movie.original_language.toUpperCase()}</p>
                        )}
                        {movie.tagline && (
                            <p className="italic">&quot;{movie.tagline}&quot;</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// You'll need these icon components (or replace with your own)

import { SVGProps } from "react";
function StarIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
        </svg>
    );
}

function PlayIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
        </svg>
    );
}