"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronRight } from 'lucide-react';
import { Movie } from '@/types/movie';
import { movies as defaultMovies } from '@/data/movies';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import CardZoom from '@/app/components/CardZoom';

interface ListMovieProps {
    title: string;
    movies?: Movie[];
}

const ListMovie = ({ title, movies = defaultMovies }: ListMovieProps) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 py-4 border-b border-gray-800 last:border-0">
            {/* Left Content: Title & Actions */}
            <div className="md:w-1/4 flex flex-col justify-center items-start space-y-4 px-4">
                <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                    {title}
                </h2>
                <button className="group flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors">
                    Xem toàn bộ
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </button>
            </div>

            {/* Right Content: Slider */}
            <div className="md:w-3/4 min-w-0">
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    } as React.CSSProperties}
                    modules={[Navigation]}
                    spaceBetween={16}
                    slidesPerView={1.5}
                    navigation
                    breakpoints={{
                        640: {
                            slidesPerView: 2.5,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                        1024: {
                            slidesPerView: 5,
                        },
                    }}
                    className="w-full !px-4"
                >
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-900 cursor-pointer">
                                <Image
                                    src={movie.poster}
                                    alt={movie.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    width={150}
                                    height={200}
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                                {/* Badge Example (Hardcoded based on image style for now) */}
                                <div className="absolute top-2 right-2">
                                    <span className="px-2 py-0.5 text-xs font-bold text-white bg-red-600 rounded">
                                        FHD
                                    </span>
                                </div>

                                {/* Content Info */}
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                    <h3 className="text-white text-sm font-bold truncate">{movie.title}</h3>
                                    <p className="text-gray-400 text-xs truncate">Original Title</p>
                                    {/* Note: 'Original Title' logic would go here if data existed */}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ListMovie;