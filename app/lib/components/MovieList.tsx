/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { use } from 'react'

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    genres: string[];
    // Add other properties if needed
}

type MoviesListProps = {
    moviesPromise: Promise<any>;
};

export default function MovieList({ moviesPromise }: MoviesListProps) {

    const movies = use(moviesPromise)

    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 sm:px-6'>
            {movies.map((movie: Movie) => (
                <Link key={movie.id} href={`/movies/${movie.id}`}>
                    <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        {/* Movie Poster with gradient overlay */}
                        <div className="relative aspect-[2/3] overflow-hidden">
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                width={300}
                                height={450}
                                className="object-cover w-full h-full transition-opacity duration-500 group-hover:opacity-80"
                            />

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Rating badge */}
                            {movie.vote_average && (
                                <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center">
                                    ⭐ {movie.vote_average.toFixed(1)}
                                </div>
                            )}
                        </div>

                        {/* Movie Info */}
                        <div className="p-3 bg-gradient-to-b from-gray-900 to-gray-800">
                            <h2 className="text-white font-medium text-sm line-clamp-1 group-hover:text-yellow-300 transition-colors">
                                {movie.title}
                            </h2>
                            <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                                {movie.release_date && new Date(movie.release_date).getFullYear()}
                                {movie.genres && movie.genres.length > 0 && (
                                    <span className="ml-2">• {movie.genres[0]}</span>
                                )}
                            </p>
                        </div>

                        {/* Hover effect indicator */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400 rounded-xl transition-all duration-300 pointer-events-none" />
                    </div>
                </Link>
            ))}
        </div>
    )
}
