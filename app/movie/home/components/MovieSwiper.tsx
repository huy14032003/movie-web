"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Movie } from '@/types/movie';
import { movies as defaultMovies } from '@/data/movies';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import CardZoom from '@/app/components/CardZoom';
import MovieTooltip from '@/app/components/MovieTooltip';

interface MovieSwiperProps {
    title?: string;
    movies?: Movie[];
    cardOrientation?: 'landscape' | 'portrait';
    showNavigation?: boolean;
}

const MovieSwiper = ({
    title,
    movies = defaultMovies,
    cardOrientation = 'portrait',
    showNavigation = true,
}: MovieSwiperProps) => {
    const isLandscape = cardOrientation === 'landscape';
    return (
        <div className="w-full py-6">
   
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                } as React.CSSProperties}
                modules={[Navigation]}
                spaceBetween={12}
                slidesPerView={isLandscape ? 1.5 : 2.5}
                navigation={showNavigation}
                breakpoints={isLandscape ? {
                    640: { slidesPerView: 2,
                        navigation: false,
                     },
                    768: { slidesPerView: 3.5,
                        navigation: false,
                     },
                    1024: { slidesPerView: 3,
                        navigation: true,
                     },
                    1900: {
                        slidesPerView: 5,
                        navigation: true,
                    },
                } : {
                    640: { slidesPerView: 3.5,
                        navigation: false,
                     },
                    768: { slidesPerView: 5,
                        navigation: false,
                     },
                    1024: { slidesPerView: 6,
                        navigation: true,
                     },
                    1900: { slidesPerView: 7,
                        navigation: true,
                     },
                }}
                className="w-full  md:px-4!"
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <MovieTooltip movie={movie}>
                            <div className="group cursor-pointer">
                                {/* Card Container */}
                                <div className={`relative overflow-hidden rounded-lg bg-gray-900 ${isLandscape ? 'aspect-[16/9]' : 'aspect-[2/3]'
                                    }`}>
                                    {/* Main Image */}
                                    <Image
                                        src={isLandscape ? (movie.backdrop || movie.poster) : movie.poster}
                                        alt={movie.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        width={isLandscape ? 400 : 200}
                                        height={isLandscape ? 225 : 300}
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                    {/* Badges */}
                                    <div className="absolute top-2 right-2 flex gap-1 text-nowrap">
                                        <span className="px-2 py-0.5 text-xs font-bold text-white bg-red-600 rounded">
                                            FHD
                                        </span>
                                        {movie.genre[0] && cardOrientation === 'landscape' && (
                                            <span className="px-2 py-0.5 text-xs font-semibold text-white bg-green-600 rounded">
                                                {movie.genre[0]}
                                            </span>
                                        )}
                                    </div>

                                    {/* Content Overlay - Landscape */}
                                    {isLandscape && (
                                        <div className="absolute bottom-0 left-0 right-0 p-4 hidden md:block">
                                            {/* Small Poster Thumbnail */}
                                            <div className="flex gap-3 items-end">
                                                <div className="w-16 h-[90px] rounded overflow-hidden flex-shrink-0 border-2 border-white/20 hidden md:flex">
                                                    <Image
                                                        src={movie.poster}
                                                        alt={movie.title}
                                                        className="w-full h-full object-cover"
                                                        width={64}
                                                        height={90}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-white text-sm md:text-base font-bold truncate">
                                                        {movie.title}
                                                    </h3>
                                                    <p className="text-gray-400 text-xs truncate">
                                                        {movie.description}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400 text-nowrap">
                                                        <span className="text-yellow-500">★ {movie.rating}</span>
                                                        <span>•</span>
                                                        <span>{movie.year}</span>
                                                        <span>•</span>
                                                        <span>{movie.duration}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Content Overlay - Portrait */}
                                    {!isLandscape && (
                                        <div className="absolute bottom-0 left-0 right-0 p-3 hidden md:block">
                                            <h3 className="text-white text-sm font-bold truncate">
                                                {movie.title}
                                            </h3>
                                            <p className="text-gray-400 text-xs truncate">
                                                {movie.description}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                                <span className="text-yellow-500">★ {movie.rating}</span>
                                                <span>•</span>
                                                <span>{movie.year}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* Mobile Text Block - Both Landscape and Portrait */}
                                <div className="md:hidden mt-2">
                                    <h3 className="text-white text-sm font-bold truncate">
                                        {movie.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400 text-nowrap">
                                        <span className="text-yellow-500">★ {movie.rating}</span>
                                        <span>•</span>
                                        <span>{movie.year}</span>
                                        {isLandscape && (
                                            <>
                                                <span>•</span>
                                                <span>{movie.duration}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </MovieTooltip>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MovieSwiper;
