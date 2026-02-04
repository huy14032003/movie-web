"use client";
import React from 'react';
import { movies } from '@/data/movies';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Play, Info } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Banner = () => {
    const featuredMovies = movies.filter((movie) => movie.featured);
    return (
        <div className="mb-8">

            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                loop={true}
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                }}
                effect={'fade'}
                fadeEffect={{ crossFade: true }}
                spaceBetween={30}
                modules={[Pagination, Autoplay, EffectFade]}
                className="mySwiper h-[500px] md:h-[600px]"
            >
                {featuredMovies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0">
                                <img
                                    src={movie.backdrop || movie.poster}
                                    alt={movie.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            </div>

                            <div className="relative h-full flex items-end px-8 md:px-16">
                                <div className="max-w-2xl">
                                    <h1 className="text-4xl md:text-6xl mb-4 text-white font-bold">
                                        {movie.title}
                                    </h1>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-3 py-1 bg-yellow-500 text-black rounded font-medium">
                                            ⭐ {movie.rating}
                                        </span>
                                        <span className="text-white">{movie.year}</span>
                                        <span className="text-white">{movie.duration}</span>
                                    </div>
                                    <p className="text-lg text-gray-200 mb-6 line-clamp-3">
                                        {movie.description}
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <button
                                            onClick={() => { }}
                                            className="flex items-center gap-2 px-8 py-3 bg-white hover:bg-gray-200 text-black rounded-lg transition-colors font-medium"
                                        >
                                            <Play className="w-5 h-5 fill-black" />
                                            <span>Xem ngay</span>
                                        </button>
                                        <button
                                            onClick={() => { }}
                                            className="flex items-center gap-2 px-8 py-3 bg-gray-700/80 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
                                        >
                                            <Info className="w-5 h-5" />
                                            <span>Thông tin</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Banner