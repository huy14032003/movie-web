"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Movie } from '@/types/movie';

interface MovieDetailProps {
    movie: Movie;
}

const MovieDetail = ({ movie }: MovieDetailProps) => {
    const [selectedTab, setSelectedTab] = useState('movie');
    const episodes = Array.from({ length: 8 }, (_, i) => i + 1);

    // Mock comments data
    const comments = [
        {
            id: 1,
            user: 'Nguyễn Văn A',
            time: '2 giờ trước',
            content: 'Phim hay quá, diễn xuất rất tốt! Đáng xem',
            likes: 12,
            dislikes: 1
        },
        {
            id: 2,
            user: 'Trần Thị B',
            time: '5 giờ trước',
            content: 'Cốt truyện hấp dẫn, mình rất thích phần hành động',
            likes: 8,
            dislikes: 0
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section with Backdrop */}
            <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px]">
                {/* Backdrop Image */}
                <Image
                    src={movie.backdrop || movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    priority
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12">
                    <div className="max-w-7xl mx-auto flex gap-4 md:gap-6">
                        {/* Poster - Hidden on mobile */}
                        <div className="hidden md:block shrink-0">
                            <div className="w-[200px] lg:w-[250px] h-[280px] lg:h-[350px] relative rounded-lg overflow-hidden border-2 border-white/20 shadow-2xl">
                                <Image
                                    src={movie.poster}
                                    alt={movie.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Movie Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-end">
                            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
                                {movie.title}
                            </h1>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-2 md:gap-3 text-sm md:text-base mb-3 md:mb-4">
                                <span className="text-yellow-500 font-semibold">★ {movie.rating}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-300">{movie.year}</span>
                                <span className="text-gray-400">•</span>
                                <div className="flex gap-1">
                                    {movie.genre.slice(0, 2).map((g, i) => (
                                        <span key={i} className="px-2 py-0.5 bg-gray-700/80 rounded text-xs md:text-sm">
                                            {g}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-300">{movie.duration}</span>
                            </div>

                            {/* Director */}
                            {movie.director && (
                                <p className="text-gray-400 text-sm md:text-base mb-4">
                                    Đạo diễn: <span className="text-white">{movie.director}</span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 mb-6 md:mb-8">
                    <button className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                        Xem Ngay
                    </button>

                    <button className="px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </button>

                    <button className="px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                    </button>

                    <button className="px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>

                    {/* Quality Badges */}
                    <div className="flex gap-2 ml-auto">
                        <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded">FHD</span>
                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded">4K</span>
                    </div>
                </div>

                {/* Episodes Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4 border-b border-gray-800">
                        <button
                            className={`px-4 py-2 font-semibold transition-colors ${selectedTab === 'movie'
                                ? 'text-white border-b-2 border-yellow-500'
                                : 'text-gray-400 hover:text-white'
                                }`}
                            onClick={() => setSelectedTab('movie')}
                        >
                            Phim Lẻ
                        </button>
                    </div>

                    {/* Episodes Grid */}
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3">
                        {episodes.map((ep) => (
                            <button
                                key={ep}
                                className="px-3 py-2 bg-gray-800 hover:bg-yellow-500 hover:text-black rounded text-sm font-medium transition-colors"
                            >
                                Tập {ep}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Description and Metadata */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
                    {/* Description */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl md:text-2xl font-bold mb-4">Nội dung</h2>
                        <p className="text-gray-300 leading-relaxed">
                            {movie.description}
                        </p>
                    </div>

                    {/* Metadata */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-4">Thông tin</h2>
                        <div className="space-y-3">
                            <div>
                                <span className="text-gray-400">Năm sản xuất:</span>
                                <span className="ml-2 text-white">{movie.year}</span>
                            </div>
                            <div>
                                <span className="text-gray-400">Quốc gia:</span>
                                <span className="ml-2 text-white">Việt Nam</span>
                            </div>
                            {movie.director && (
                                <div>
                                    <span className="text-gray-400">Đạo diễn:</span>
                                    <span className="ml-2 text-white">{movie.director}</span>
                                </div>
                            )}
                            <div>
                                <span className="text-gray-400">Thể loại:</span>
                                <span className="ml-2 text-white">{movie.genre.join(', ')}</span>
                            </div>
                            <div>
                                <span className="text-gray-400">Thời lượng:</span>
                                <span className="ml-2 text-white">{movie.duration}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cast Section */}
                {movie.cast && movie.cast.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl md:text-2xl font-bold mb-4">Diễn viên</h2>
                        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
                            {movie.cast.map((actor, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-full aspect-square rounded-full bg-gray-800 mb-2 flex items-center justify-center overflow-hidden">
                                        <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-white ">{actor}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Comments Section */}
                <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-4">Bình luận ({comments.length})</h2>

                    {/* Comment Form */}
                    <div className="mb-6 p-4 bg-gray-900 rounded-lg">
                        <textarea
                            className="w-full p-3 bg-gray-800 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            rows={3}
                            placeholder="Viết bình luận của bạn..."
                        />
                        <div className="flex justify-end mt-2">
                            <button className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors">
                                Gửi
                            </button>
                        </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div key={comment.id} className="p-4 bg-gray-900 rounded-lg">
                                <div className="flex items-start gap-3">
                                    {/* Avatar */}
                                    <div className="w-10 h-10 rounded-full bg-gray-700 shrink-0 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>

                                    {/* Comment Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-white">{comment.user}</span>
                                            <span className="text-xs text-gray-500">{comment.time}</span>
                                        </div>
                                        <p className="text-gray-300 text-sm mb-2">{comment.content}</p>

                                        {/* Like/Dislike */}
                                        <div className="flex items-center gap-4 text-sm">
                                            <button className="flex items-center gap-1 text-gray-400 hover:text-yellow-500 transition-colors">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                </svg>
                                                <span>{comment.likes}</span>
                                            </button>
                                            <button className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                                                </svg>
                                                <span>{comment.dislikes}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
