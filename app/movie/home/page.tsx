import { Metadata } from 'next';
import Script from 'next/script';
import Banner from './components/Banner';
import MovieSwiper from './components/MovieSwiper';
import MovieSwiperGrid from './components/MovieSwiperGrid';
import LazySection from '@/app/components/LazySection';
import { createMetadata, createMovieListStructuredData } from '@/lib/seo';
import { movies } from '@/data/movies';

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

const HomePage = () => {
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
      <Banner />

      <div className="px-2 md:px-6 ">
      {/* Card ngang - Landscape */}
      <LazySection animationType="slideUp">
        <div className="bg-[#0f0f0f] px-6 py-4 rounded-xl">
          <div className="flex items-center justify-start mb-4 px-4 gap-2">
            <h2 className="text-lg md:text-2xl font-bold text-white">
              Mãn Nhãn với Phim Chiếu Rạp
            </h2>
            <button className="text-gray-400 hover:text-white transition-colors rounded-full border border-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <MovieSwiper
            cardOrientation="landscape"
          />
        </div>
      </LazySection>

        {/* Card dọc - Portrait */}
        <LazySection animationType="fade">
          <div className="bg-[#0f0f0f] md:px-6 md:py-4 rounded-xl space-y-6">
            <div className="flex items-center justify-start mb-4 px-4 gap-2">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Phim Hàn Quốc mới
              </h2>
              <button className="text-gray-400 hover:text-white transition-colors rounded-full border border-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <MovieSwiper
              cardOrientation="portrait"
            />
            <div className="flex items-center justify-start mb-4 px-4 gap-2">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Phim Trung Quốc mới
              </h2>
              <button className="text-gray-400 hover:text-white transition-colors rounded-full border border-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <MovieSwiper
              cardOrientation="portrait"
            />
            <div className="flex items-center justify-start mb-4 px-4 gap-2">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Phim Trung Quốc mới
              </h2>
              <button className="text-gray-400 hover:text-white transition-colors rounded-full border border-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <MovieSwiper
              cardOrientation="portrait"
            />
          </div>
        </LazySection>

        {/* Grid Layout */}
        <LazySection animationType="scale">
          <h2 className="text-2xl font-bold mb-6 px-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
            Top 10 Phim Lẻ Hôm Nay
          </h2>
          <MovieSwiperGrid
            rows={2}
          />
        </LazySection>

        {/* Thêm section landscape */}
        <LazySection animationType="slideLeft">
          <div className="bg-[#0f0f0f] px-6 py-4 rounded-xl space-y-6">
            <div className="flex items-center justify-start mb-4 px-4 gap-2">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Phim Thái New: Không Drama Đời Không Nể
              </h2>
              <button className="text-gray-400 hover:text-white transition-colors rounded-full border border-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <MovieSwiper
              cardOrientation="landscape"
            />
          </div>
        </LazySection>
      </div>

    </div>
  );
};

export default HomePage;
