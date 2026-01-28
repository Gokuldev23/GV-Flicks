import React from 'react'

type Rating  = {
    rating:string
}

export default function StarRating({rating}:Rating) {
  return (
      <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center">
          ⭐ {rating}
      </div>
  )
}
