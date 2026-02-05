"use client";
import React, { useState } from 'react';
import { CheckCircle, XCircle, MessageSquare, Eye } from 'lucide-react';
import { AdminMovie, MovieStatus } from '@/types/admin';
import Image from 'next/image';
import { movies } from '@/data/movies';

// Mock pending movies
const mockPendingMovies: AdminMovie[] = movies.slice(0, 8).map((movie, index) => ({
    ...movie,
    status: MovieStatus.PENDING,
    views: 0,
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: `User${index + 1}`,
    moderationNotes: index % 2 === 0 ? 'Cần kiểm tra chất lượng video' : undefined,
}));

const ModerationPage = () => {
    const [selectedMovie, setSelectedMovie] = useState<AdminMovie | null>(null);
    const [notes, setNotes] = useState('');

    const handleApprove = (movieId: string) => {
        if (confirm('Duyệt phim này?')) {
            console.log('Approve movie:', movieId);
            // TODO: API call
        }
    };

    const handleReject = (movieId: string) => {
        if (confirm('Từ chối phim này?')) {
            console.log('Reject movie:', movieId, 'Notes:', notes);
            // TODO: API call
            setNotes('');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                    Kiểm Duyệt Phim
                </h1>
                <p className="text-gray-400 mt-2">{mockPendingMovies.length} phim chờ kiểm duyệt</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Movie List */}
                <div className="lg:col-span-2 space-y-4">
                    {mockPendingMovies.map((movie) => (
                        <div
                            key={movie.id}
                            className={`bg-gray-900 rounded-xl p-6 border cursor-pointer transition-all ${selectedMovie?.id === movie.id
                                    ? 'border-red-500'
                                    : 'border-gray-800 hover:border-gray-700'
                                }`}
                            onClick={() => setSelectedMovie(movie)}
                        >
                            <div className="flex gap-4">
                                {/* Poster */}
                                <div className="w-20 h-28 rounded overflow-hidden bg-gray-800 flex-shrink-0">
                                    <Image
                                        src={movie.poster}
                                        alt={movie.title}
                                        width={80}
                                        height={112}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-bold text-lg mb-1">{movie.title}</h3>
                                    <p className="text-gray-400 text-sm line-clamp-2 mb-2">{movie.description}</p>

                                    <div className="flex flex-wrap gap-2 text-xs text-gray-400 mb-3">
                                        <span>⭐ {movie.rating}</span>
                                        <span>•</span>
                                        <span>{movie.year}</span>
                                        <span>•</span>
                                        <span>{movie.duration}</span>
                                        <span>•</span>
                                        <span>Bởi: {movie.createdBy}</span>
                                    </div>

                                    {movie.moderationNotes && (
                                        <div className="flex items-start gap-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-500">
                                            <MessageSquare size={14} className="mt-0.5 flex-shrink-0" />
                                            <span>{movie.moderationNotes}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleApprove(movie.id);
                                        }}
                                        className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors"
                                        title="Duyệt"
                                    >
                                        <CheckCircle size={20} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleReject(movie.id);
                                        }}
                                        className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                                        title="Từ chối"
                                    >
                                        <XCircle size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detail Panel */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 lg:sticky lg:top-6 h-fit">
                    {selectedMovie ? (
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white">Chi Tiết Đánh Giá</h3>

                            {/* Backdrop Preview */}
                            <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-800">
                                <Image
                                    src={selectedMovie.backdrop || selectedMovie.poster}
                                    alt={selectedMovie.title}
                                    width={400}
                                    height={225}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div>
                                <h4 className="text-white font-semibold mb-2">{selectedMovie.title}</h4>
                                <p className="text-gray-400 text-sm">{selectedMovie.description}</p>
                            </div>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Năm:</span>
                                    <span className="text-white">{selectedMovie.year}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Thời lượng:</span>
                                    <span className="text-white">{selectedMovie.duration}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Đánh giá:</span>
                                    <span className="text-white">⭐ {selectedMovie.rating}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Thể loại:</span>
                                    <span className="text-white">{selectedMovie.genre.join(', ')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Người tạo:</span>
                                    <span className="text-white">{selectedMovie.createdBy}</span>
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">
                                    Ghi Chú Kiểm Duyệt
                                </label>
                                <textarea
                                    rows={4}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none resize-none"
                                    placeholder="Nhập ghi chú (bắt buộc khi từ chối)..."
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleApprove(selectedMovie.id)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                                >
                                    <CheckCircle size={18} />
                                    Duyệt
                                </button>
                                <button
                                    onClick={() => handleReject(selectedMovie.id)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                                >
                                    <XCircle size={18} />
                                    Từ Chối
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Eye className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                            <p className="text-gray-400">Chọn phim để xem chi tiết</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModerationPage;
