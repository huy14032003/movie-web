import React from 'react'
import { Metadata } from 'next'
import Script from 'next/script'
import ListMovie from './components/ListMovie'
import { createMetadata, createMovieListStructuredData, createBreadcrumbStructuredData } from '@/lib/seo'
import { movies } from '@/data/movies'

// Metadata cho trang danh sách phim
export const metadata: Metadata = createMetadata({
  title: 'Danh Sách Phim',
  description: 'Khám phá bộ sưu tập phim đa dạng với đầy đủ thể loại: Hành động, Kinh dị, Tình cảm, Khoa học viễn tưởng. Cập nhật liên tục phim mới nhất 2024-2025.',
  keywords: [
    'danh sách phim',
    'tất cả phim',
    'phim đầy đủ',
    'kho phim',
    'phim theo thể loại',
    'phim hành động',
    'phim kinh dị',
    'phim tình cảm',
  ],
  url: '/movie/list-movie',
});

const page = () => {
  // Tạo structured data cho danh sách phim
  const movieListData = createMovieListStructuredData(movies, 'Danh Sách Phim');

  // Tạo breadcrumb structured data
  const breadcrumbData = createBreadcrumbStructuredData([
    { name: 'Trang Chủ', url: '/movie/home' },
    { name: 'Danh Sách Phim', url: '/movie/list-movie' },
  ]);

  return (
    <div>
      {/* Movie List Structured Data */}
      <Script
        id="movie-list-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(movieListData),
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
      <div className="mb-10"></div>
      <ListMovie />
    </div>
  )
}

export default page