"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Movie } from '@/types/movie';

interface VideoPlayerPageProps {
    movie: Movie;
    relatedMovies?: Movie[];
}

const VideoPlayerPage = ({ movie, relatedMovies = [] }: VideoPlayerPageProps) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [currentEpisode, setCurrentEpisode] = useState(1);
    const [selectedServer, setSelectedServer] = useState('VIP');
    const videoRef = useRef<HTMLVideoElement>(null);

    const totalEpisodes = 8;
    const episodes = Array.from({ length: totalEpisodes }, (_, i) => i + 1);
    const servers = ['VIP', 'Server 1', 'Server 2', 'Server 3'];

    // Sample video URL (Big Buck Bunny)
    const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    // Mock comments
    const comments = [
        {
            id: 1,
            user: 'Nguyễn Văn A',
            avatar: null,
            time: '2 giờ trước',
            content: 'Phim hay quá! Diễn xuất tuyệt vời 😍',
            likes: 24,
            dislikes: 2,
        },
        {
            id: 2,
            user: 'Trần Thị B',
            avatar: null,
            time: '5 giờ trước',
            content: 'Cảnh hành động mãn nhãn, đáng xem!',
            likes: 15,
            dislikes: 1,
        },
        {
            id: 3,
            user: 'Lê Văn C',
            avatar: null,
            time: '1 ngày trước',
            content: 'Cốt truyện hấp dẫn, mong có phần 2',
            likes: 8,
            dislikes: 0,
        },
    ];

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Đã copy link!');
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Video Player Section */}
            <div className="w-full bg-black">
                <div className="max-w-[1400px] mx-auto rounded-lg overflow-hidden">
                    <div className="relative aspect-video bg-gray-900">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-contain"
                            controls
                            poster={movie.backdrop || movie.poster}
                        >
                            <source src={videoUrl} type="video/mp4" />
                            Trình duyệt không hỗ trợ video.
                        </video>
                    </div>

                    {/* Control Bar */}
                    <div className="bg-gray-900/95 border-t border-gray-800">
                        <div className="px-4 py-3 flex items-center gap-3 overflow-x-auto">
                            {/* Favorite */}
                            <button
                                onClick={() => setIsFavorite(!isFavorite)}
                                className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors whitespace-nowrap"
                            >
                                <svg className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span className="text-sm">Yêu thích</span>
                            </button>

                            {/* Add to playlist */}
                            <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors whitespace-nowrap">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="text-sm">Thêm vào</span>
                            </button>

                            {/* Episode selector */}
                            <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded whitespace-nowrap">
                                <span className="text-sm">Chuyển tập</span>
                                <span className="px-2 py-0.5 bg-yellow-500 text-black text-xs font-bold rounded">
                                    {currentEpisode}/{totalEpisodes}
                                </span>
                            </div>

                            {/* Skip intro */}
                            <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors whitespace-nowrap">
                                <span className="text-sm">Bỏ qua giới thiệu</span>
                            </button>

                            {/* Quality */}
                            <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors whitespace-nowrap">
                                <span className="text-sm">Nạp phim</span>
                                <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded">FHD</span>
                            </button>

                            {/* Watch party */}
                            <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors whitespace-nowrap">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="text-sm">Xem chung</span>
                            </button>

                            {/* Share */}
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors whitespace-nowrap"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                <span className="text-sm">Chia sẻ</span>
                            </button>

                            {/* Report */}
                            <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-red-600 rounded transition-colors whitespace-nowrap ml-auto">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span className="text-sm">Báo lỗi</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1400px] mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Episode Selector */}
                        <div className="bg-gray-900 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                                <span className="text-sm text-gray-400 whitespace-nowrap">Phim lẻ</span>
                                <span className="text-gray-600">•</span>
                                {servers.map((server) => (
                                    <button
                                        key={server}
                                        onClick={() => setSelectedServer(server)}
                                        className={`px-3 py-1 text-sm rounded transition-colors whitespace-nowrap ${selectedServer === server
                                                ? 'bg-yellow-500 text-black font-semibold'
                                                : 'bg-gray-800 hover:bg-gray-700'
                                            }`}
                                    >
                                        {server}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                                {episodes.map((ep) => (
                                    <button
                                        key={ep}
                                        onClick={() => setCurrentEpisode(ep)}
                                        className={`px-3 py-2 rounded text-sm font-medium transition-colors ${currentEpisode === ep
                                                ? 'bg-yellow-500 text-black'
                                                : 'bg-gray-800 hover:bg-gray-700'
                                            }`}
                                    >
                                        Tập {ep}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Movie Info */}
                        <div className="bg-gray-900 rounded-lg p-4">
                            <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
                            <div className="flex flex-wrap items-center gap-2 mb-3 text-sm">
                                <span className="text-yellow-500 font-semibold">★ {movie.rating}</span>
                                <span className="text-gray-500">•</span>
                                <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded">FHD</span>
                                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded">4K</span>
                                <span className="px-2 py-0.5 bg-green-600 text-white text-xs font-bold rounded">Vietsub</span>
                                <span className="text-gray-400">{movie.year}</span>
                                <span className="text-gray-500">•</span>
                                <span className="text-gray-400">{movie.duration}</span>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">{movie.description}</p>
                        </div>

                        {/* Comments */}
                        <div className="bg-gray-900 rounded-lg p-4">
                            <h2 className="text-xl font-bold mb-4">Bình luận ({comments.length})</h2>

                            {/* Comment Form */}
                            <div className="mb-6">
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
                                    <div key={comment.id} className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-700 shrink-0 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold text-white">{comment.user}</span>
                                                <span className="text-xs text-gray-500">{comment.time}</span>
                                            </div>
                                            <p className="text-gray-300 text-sm mb-2">{comment.content}</p>
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
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Cast */}
                        {movie.cast && movie.cast.length > 0 && (
                            <div className="bg-gray-900 rounded-lg p-4">
                                <h2 className="text-xl font-bold mb-4">Diễn viên</h2>
                                <div className="grid grid-cols-4  gap-3">
                                    {movie.cast.map((actor, index) => (
                                        <div key={index} className="text-center">
                                            <div className="w-full aspect-square rounded-full bg-gray-800 mb-2 flex items-center justify-center overflow-hidden">
                                                <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <p className="text-xs text-white ">{actor}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Recommendations */}
                        <div className="bg-gray-900 rounded-lg p-4">
                            <h2 className="text-xl font-bold mb-4">Đề xuất cho bạn</h2>
                            <div className="space-y-3">
                                {relatedMovies.slice(0, 5).map((relatedMovie) => (
                                    <div key={relatedMovie.id} className="flex gap-3 hover:bg-gray-800 p-2 rounded-lg transition-colors cursor-pointer">
                                        <div className="w-20 h-28 relative rounded overflow-hidden shrink-0">
                                            <Image
                                                src={relatedMovie.poster}
                                                alt={relatedMovie.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-semibold text-white truncate mb-1">
                                                {relatedMovie.title}
                                            </h3>
                                            <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                                                <span className="text-yellow-500">★ {relatedMovie.rating}</span>
                                                <span>•</span>
                                                <span>{relatedMovie.year}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {relatedMovie.genre.slice(0, 2).map((g, i) => (
                                                    <span key={i} className="px-1.5 py-0.5 bg-gray-700 text-[10px] rounded">
                                                        {g}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayerPage;
