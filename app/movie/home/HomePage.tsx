"use client"
import React from 'react'
import MovieSwiperGrid from './components/MovieSwiperGrid'
import LazySection from '@/app/components/LazySection'
import MovieSwiper from './components/MovieSwiper'
import useGetData from './hooks/useGetData'
import Banner from './components/Banner'
import { Movie } from '@/types/movie'
import { Country, Genre } from './types/HomeType'

const HomePage = () => {
    const {
        getAllMovie,
        getFeaturedMovie,
        getGenre,
    } = useGetData();
    const featuredMovies = getFeaturedMovie?.content || [];
    const ListMovieAll = getAllMovie?.content.slice(0, 10) || [];
    const ListMovie = getAllMovie?.content.filter((item: Movie) => item.genres?.some((genre: Genre) => genre.id == 1)).slice(0, 10) || [];
    const MovieAmerica = getAllMovie?.content.filter((item: Movie) => item.countries?.some((country: Country) => country.id == 1)).slice(0, 10) || [];
    const MovieKorea = getAllMovie?.content.filter((item: Movie) => item.countries?.some((country: Country) => country.id == 2)).slice(0, 10) || [];
    const MovieChina = getAllMovie?.content.filter((item: Movie) => item.countries?.some((country: Country) => country.id == 5)).slice(0, 10) || [];
    const MovieJapan = getAllMovie?.content.filter((item: Movie) => item.countries?.some((country: Country) => country.id == 4)).slice(0, 10) || [];
    const MovieThai = getAllMovie?.content.filter((item: Movie) => item.countries?.some((country: Country) => country.id == 6)).slice(0, 10) || [];
    console.log(ListMovie)
    return (
        <>
            <Banner featuredMovies={featuredMovies} />
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
                            movies={ListMovieAll}
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
                            movies={MovieKorea}
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
                            movies={MovieChina}
                        />
                        <div className="flex items-center justify-start mb-4 px-4 gap-2">
                            <h2 className="text-xl md:text-2xl font-bold text-white">
                                Phim Nhật Bản Mới
                            </h2>
                            <button className="text-gray-400 hover:text-white transition-colors rounded-full border border-white">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                        <MovieSwiper
                            cardOrientation="portrait"
                            movies={MovieJapan}
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
                            movies={MovieThai}
                        />
                    </div>
                </LazySection>
            </div>
        </>
    )
}

export default HomePage