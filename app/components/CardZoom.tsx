"use client";
import React from 'react';
import Image from 'next/image';
import { Movie } from '@/types/movie';
import { useRouter } from 'next/navigation';

const CardZoom = ({ movie }: { movie: Movie }) => {
    const router = useRouter()
    return (
        <div className="w-full h-full">
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl shadow-black/50 border">
                {/* Backdrop Image */}
                <Image
                    src={movie.backdrop || movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                    {/* Title */}
                    <h2 className="text-white text-2xl font-bold mb-4 line-clamp-2">
                        {movie.title}
                    </h2>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mb-4">

                        {movie?.episodes?.map((item: any, index: number) => {
                            return (
                                <div key={index}>
                                    <button
                                        onClick={() => router.push(`/movie/view-movie/${movie.id}/${item.id}`)}
                                        className="flex items-center gap-2 px-2 text-xs  py-1 bg-yellow-500 text-black rounded font-bold hover:bg-yellow-400 transition-colors cursor-pointer">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                        <span>Xem ngay</span>
                                    </button>
                                </div>

                            )
                        })}

                        <button className="flex items-center gap-2 px-2 text-xs  py-1 bg-gray-800/90 text-white rounded font-semibold hover:bg-gray-700 transition-colors border border-gray-600 cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            Thích
                        </button>
                        <button
                            onClick={() => router.push(`/movie/detail/${movie.id}`)}
                            className="flex items-center gap-2 px-2 text-xs  py-1 bg-gray-800/90 text-white rounded font-semibold hover:bg-gray-700 transition-colors border border-gray-600 cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Chi tiết
                        </button>
                    </div>

                    {/* Movie Metadata */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2.5 py-1 bg-gray-800/90 text-white text-xs font-semibold rounded border border-yellow-500">
                            IMDb {movie.rating}
                        </span>
                        <span className="px-2.5 py-1 bg-gray-800/90 text-white text-xs font-semibold rounded border border-gray-600">
                            {movie.year}
                        </span>
                        <span className="px-2.5 py-1 bg-gray-800/90 text-white text-xs font-semibold rounded border border-gray-600">
                            {movie.duration}
                        </span>
                        <span className="px-2.5 py-1 bg-gray-800/90 text-white text-xs font-semibold rounded border border-gray-600">
                            {movie?.episodes?.length ? movie?.episodes?.length < 2 ? `Phim lẻ` : 'Phim bộ' : 'Sắp ra mắt'}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {movie?.genres?.map((genre, i) => (
                            <span key={i} className="px-2.5 py-1 bg-green-800/90 text-white text-xs font-semibold rounded">
                                {genre.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardZoom;