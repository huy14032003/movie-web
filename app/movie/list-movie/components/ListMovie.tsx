"use client";
import React, { useState } from 'react';
import { movies } from '@/data/movies';
import Image from 'next/image';

const ITEMS_PER_PAGE = 6;

const ListMovie = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentMovies = movies.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Danh Sách Phim
        </h1>

        {/* Grid View */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {currentMovies.map((movie) => (
            <div key={movie.id} className="group cursor-pointer">
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-lg bg-gray-900 aspect-[2/3]">
                {/* Main Image */}
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width={200}
                  height={300}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Badges */}
                <div className="absolute top-2 right-2 flex gap-1 text-nowrap">
                  <span className="px-2 py-0.5 text-xs font-bold text-white bg-red-600 rounded">
                    FHD
                  </span>
                </div>

                {/* Content Overlay - Desktop */}
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
              </div>

              {/* Mobile Text Block */}
              <div className="md:hidden mt-2">
                <h3 className="text-white text-sm font-bold truncate">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-400 text-nowrap">
                  <span className="text-yellow-500">★ {movie.rating}</span>
                  <span>•</span>
                  <span>{movie.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span className="hidden sm:inline">Trước</span>
            <span className="sm:hidden">‹</span>
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg font-semibold transition-colors ${currentPage === page
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span className="hidden sm:inline">Sau</span>
            <span className="sm:hidden">›</span>
          </button>
        </div>

        {/* Page Info */}
        <div className="mt-4 text-center text-gray-400 text-sm">
          Trang {currentPage} / {totalPages} • Hiển thị {startIndex + 1}-{Math.min(endIndex, movies.length)} trong số {movies.length} phim
        </div>
      </div>
    </div>
  );
};

export default ListMovie;