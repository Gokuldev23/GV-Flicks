import React from 'react'


type MovieInfoProps = {
    title:string
    release_date:string
    genres:string[]
}



export default function MovieInfo({title,release_date,genres}:MovieInfoProps) {
    return (
        <div className="p-3 bg-gradient-to-b from-gray-900 to-gray-800">
            <h2 className="text-white font-medium text-sm line-clamp-1 group-hover:text-yellow-300 transition-colors">
                {title}
            </h2>
            <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                {release_date && new Date(release_date).getFullYear()}
                {genres && genres.length > 0 && (
                    <span className="ml-2">• {genres[0]}</span>
                )}
            </p>
        </div>
    )
}
