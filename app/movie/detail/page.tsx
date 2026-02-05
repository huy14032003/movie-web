import React from 'react'
import MovieDetail from './components/MovieDetail'
import { movies } from '@/data/movies'

const page = () => {
  // Use first featured movie as example
  const movie = movies.find(m => m.featured) || movies[0];

  return (
    <div className='flex-1'>
      <MovieDetail movie={movie} />
    </div>
  )
}

export default page
