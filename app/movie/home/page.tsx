import { Metadata } from 'next';
import Script from 'next/script';
import Banner from './components/Banner';
import MovieSwiper from './components/MovieSwiper';
import MovieSwiperGrid from './components/MovieSwiperGrid';
import LazySection from '@/app/components/LazySection';
import { createMetadata, createMovieListStructuredData } from '@/lib/seo';
import { movies } from '@/data/movies';
import useGetData from './hooks/useGetData';
import HomePage from './HomePage';

// Metadata cho trang chủ
export const metadata: Metadata = createMetadata({
  title: 'Trang Chủ',
  description: 'Xem phim online miễn phí chất lượng cao. Phim chiếu rạp mới nhất, phim Hàn Quốc, Trung Quốc, Thái Lan cập nhật hàng ngày. Top 10 phim lẻ hay nhất 2024-2025.',
  keywords: [
    'trang chủ phim',
    'phim mới nhất',
    'phim chiếu rạp 2024',
    'phim Hàn Quốc',
    'phim Trung Quốc',
    'phim Thái Lan',
    'top phim hay',
  ],
  url: '/movie/home',
});

const page = () => {
  // Structured data cho danh sách phim nổi bật
  const featuredMoviesData = createMovieListStructuredData(
    movies.filter(m => m.featured),
    'Phim Chiếu Rạp Nổi Bật'
  );

  return (
    <div className=' space-y-8'>
      {/* Structured Data cho danh sách phim */}
      <Script
        id="featured-movies-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(featuredMoviesData),
        }}
      />
     
      <HomePage/>
    </div>
  );
};

export default page;
