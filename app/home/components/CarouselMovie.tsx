"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Movie } from '@/types/movie';
import { movies as defaultMovies } from '@/data/movies';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselMovieProps {
    title?: string;
    movies?: Movie[];
    direction?: 'horizontal' | 'vertical';
    autoplay?: boolean;
    showPagination?: boolean;
    showNavigation?: boolean;
}

const CarouselMovie = ({
    title,
    movies = defaultMovies,
    direction = 'horizontal',
    autoplay = true,
    showPagination = true,
    showNavigation = true
}: CarouselMovieProps) => {
    const isVertical = direction === 'vertical';

    return (
        <div className={`w-full ${isVertical ? 'h-screen' : 'h-auto'}`}>
            {title && (
                <h2 className="text-2xl font-bold mb-4 px-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                    {title}
                </h2>
            )}

            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#ef4444',
                } as React.CSSProperties}
                modules={[Navigation, Pagination, Autoplay]}
                direction={direction}
                spaceBetween={isVertical ? 20 : 16}
                slidesPerView={isVertical ? 1 : 1.5}
                navigation={showNavigation}
                pagination={showPagination ? { clickable: true } : false}
                autoplay={autoplay ? {
                    delay: 3000,
                    disableOnInteraction: false,
                } : false}
                breakpoints={!isVertical ? {
                    640: { slidesPerView: 2.5 },
                    768: { slidesPerView: 3.5 },
                    1024: { slidesPerView: 4.5 },
                    1280: { slidesPerView: 5.5 },
                } : {}}
                className={`w-full ${isVertical ? 'h-full' : '!px-4'}`}
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <div className={`group relative ${isVertical ? 'h-screen' : 'aspect-[3/4]'
                            } rounded-lg overflow-hidden bg-gray-900 cursor-pointer`}>
                            <Image
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                width={isVertical ? 1920 : 300}
                                height={isVertical ? 1080 : 400}
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                            <div className="absolute top-4 right-4 flex flex-col gap-2">
                                <span className="px-2 py-1 text-xs font-bold text-white bg-red-600 rounded">
                                    FHD
                                </span>
                                <span className="px-2 py-1 text-xs font-bold text-white bg-yellow-600 rounded">
                                    ⭐ {movie.rating}
                                </span>
                            </div>

                            <div className={`absolute ${isVertical ? 'bottom-20 left-0 right-0 p-8' : 'bottom-0 left-0 right-0 p-3'
                                }`}>
                                <h3 className={`text-white font-bold ${isVertical ? 'text-4xl mb-4' : 'text-sm truncate'
                                    }`}>
                                    {movie.title}
                                </h3>

                                {isVertical && (
                                    <>
                                        <p className="text-gray-300 text-lg mb-4 line-clamp-3">
                                            {movie.description}
                                        </p>
                                        <div className="flex gap-4 text-sm text-gray-400">
                                            <span>{movie.year}</span>
                                            <span>•</span>
                                            <span>{movie.duration}</span>
                                            <span>•</span>
                                            <span>{movie.genre.join(', ')}</span>
                                        </div>
                                    </>
                                )}

                                {!isVertical && (
                                    <p className="text-gray-400 text-xs">
                                        {movie.year} • {movie.duration}
                                    </p>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CarouselMovie;