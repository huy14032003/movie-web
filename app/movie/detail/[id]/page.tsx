import React from 'react'
import Script from 'next/script'
import { Metadata } from 'next'
import MovieDetail from './components/MovieDetail'
import { movies } from '@/data/movies'
import { createMovieMetadata, createMovieStructuredData, createBreadcrumbStructuredData } from '@/lib/seo'

interface PageProps {
  params: {
    id: string;
  };
}

// Dynamic metadata based on movie
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const movie = movies.find(m => m.id.toString() === params.id) || movies[0];
  return createMovieMetadata(movie);
}

const page = ({ params }: PageProps) => {
  const movie = movies.find(m => m.id.toString() === params.id) || movies[0];

  // Tạo structured data cho phim
  const movieStructuredData = createMovieStructuredData(movie);

  // Tạo breadcrumb structured data
  const breadcrumbData = createBreadcrumbStructuredData([
    { name: 'Trang Chủ', url: '/movie/home' },
    { name: 'Phim', url: '/movie/list-movie' },
    { name: movie.title, url: `/movie/detail/${movie.id}` },
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
      <MovieDetail />
    </div>
  )
}

export default page
