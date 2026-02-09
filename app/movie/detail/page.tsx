import React from 'react'
import Script from 'next/script'
import { Metadata } from 'next'
import MovieDetail from './components/MovieDetail'
import { movies } from '@/data/movies'
import { createMovieMetadata, createMovieStructuredData, createBreadcrumbStructuredData } from '@/lib/seo'

// Dynamic metadata based on movie
export async function generateMetadata(): Promise<Metadata> {
  // Use first featured movie as example (in real app, get from URL params)
  const movie = movies.find(m => m.featured) || movies[0];
  return createMovieMetadata(movie);
}

const page = () => {
  // Use first featured movie as example
  const movie = movies.find(m => m.featured) || movies[0];

  // Tạo structured data cho phim
  const movieStructuredData = createMovieStructuredData(movie);

  // Tạo breadcrumb structured data
  const breadcrumbData = createBreadcrumbStructuredData([
    { name: 'Trang Chủ', url: '/movie/home' },
    { name: 'Phim', url: '/movie/list-movie' },
    { name: movie.title, url: `/movie/detail?id=${movie.id}` },
  ]);

  return (
    <div className='flex-1'>
      {/* Movie Structured Data */}
      <Script
        id="movie-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(movieStructuredData),
        }}
      />
      {/* Breadcrumb Structured Data */}
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      <MovieDetail movie={movie} />
    </div>
  )
}

export default page
