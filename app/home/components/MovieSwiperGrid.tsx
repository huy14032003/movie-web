"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper/modules';
import { Movie } from '@/types/movie';
import { movies as defaultMovies } from '@/data/movies';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';

interface MovieSwiperGridProps {
    title?: string;
    movies?: Movie[];
    rows?: number;
}

const MovieSwiperGrid = ({
    title,
    movies = defaultMovies,
    rows = 2
}: MovieSwiperGridProps) => {
    return (
        <div className="w-full py-6">
            {title && (
                <h2 className="text-2xl font-bold mb-6 px-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                    {title}
                </h2>
            )}

            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                } as React.CSSProperties}
                modules={[Grid, Navigation]}
                spaceBetween={16}
                slidesPerView={2}
                grid={{
                    rows: rows,
                    fill: 'row'
                }}
                navigation
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 6,
                    },
                    1900: {
                        slidesPerView: 10,
                    },
                }}
                className="w-full !px-4 !pb-12"
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <div className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-900 cursor-pointer">
                            <Image
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                width={300}
                                height={400}
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                            <div className="absolute top-2 right-2 flex flex-col gap-1">
                                <span className="px-2 py-0.5 text-xs font-bold text-white bg-red-600 rounded">
                                    FHD
                                </span>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-0 group-hover:translate-y-0 transition-transform">
                                <h3 className="text-white text-sm font-bold truncate">
                                    {movie.title}
                                </h3>
                                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                    <span>⭐ {movie.rating}</span>
                                    <span>•</span>
                                    <span>{movie.year}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MovieSwiperGrid;
