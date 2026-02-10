"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Play, Info } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import useGetData from "../hooks/useGetData";


const Banner = ({featuredMovies}: any) => {

  if (!featuredMovies || featuredMovies.length === 0) {
    return (
      <div className="mb-8 h-[500px] md:h-[600px] bg-black/50 flex items-center justify-center">
        <p className="text-white text-xl">Đang tải phim nổi bật...</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <Swiper
        loop={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        spaceBetween={30}
        modules={[Pagination, Autoplay, EffectFade]}
        className="mySwiper h-[500px] md:h-[600px]"
      >
        {featuredMovies.map((movie: any) => (
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
  );
};

export default Banner;
