"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import { AdminMovie, MovieStatus } from '@/types/admin';
import Image from 'next/image';
import { movies } from '@/data/movies';

// Convert movies to AdminMovie format with mock data
const mockAdminMovies: AdminMovie[] = movies.map((movie, index) => ({
    ...movie,
    status: index % 4 === 0 ? MovieStatus.PENDING : index % 4 === 1 ? MovieStatus.DRAFT : MovieStatus.PUBLISHED,
    views: Math.floor(Math.random() * 50000) + 1000,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'Admin',
}));

const statusColors = {
    [MovieStatus.PUBLISHED]: 'bg-green-500/10 text-green-500 border-green-500/20',
    [MovieStatus.DRAFT]: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    [MovieStatus.PENDING]: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    [MovieStatus.REJECTED]: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const statusLabels = {
    [MovieStatus.PUBLISHED]: 'Đã Xuất Bản',
    [MovieStatus.DRAFT]: 'Bản Nháp',
    [MovieStatus.PENDING]: 'Chờ Duyệt',
    [MovieStatus.REJECTED]: 'Từ Chối',
};

const MoviesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredMovies = mockAdminMovies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || movie.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
    const paginatedMovies = filteredMovies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDelete = (id: string) => {
        if (confirm('Bạn có chắc muốn xóa phim này?')) {
            // TODO: Implement delete API
            console.log('Delete movie:', id);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                        Quản Lý Phim
                    </h1>
                    <p className="text-gray-400 mt-2">{filteredMovies.length} phim</p>
                </div>
                <Link
                    href="/admin/movies/create"
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                    + Thêm Phim Mới
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm phim..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                    />
                </div>

                {/* Status Filter */}
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-gray-800 text-white pl-10 pr-8 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none appearance-none cursor-pointer"
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value={MovieStatus.PUBLISHED}>Đã xuất bản</option>
                        <option value={MovieStatus.DRAFT}>Bản nháp</option>
                        <option value={MovieStatus.PENDING}>Chờ duyệt</option>
                        <option value={MovieStatus.REJECTED}>Từ chối</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Phim</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Trạng thái</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Views</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Đánh giá</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Ngày tạo</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {paginatedMovies.map((movie) => (
                                <tr key={movie.id} className="hover:bg-gray-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-16 rounded overflow-hidden bg-gray-800 flex-shrink-0">
                                                <Image
                                                    src={movie.poster}
                                                    alt={movie.title}
                                                    width={48}
                                                    height={64}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-white font-semibold truncate">{movie.title}</h3>
                                                <p className="text-gray-400 text-sm truncate">{movie.year} • {movie.duration}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[movie.status]}`}>
                                            {statusLabels[movie.status]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <Eye size={16} className="text-gray-400" />
                                            {movie.views.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            ⭐ {movie.rating}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">
                                        {new Date(movie.createdAt).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/movies/${movie.id}/edit`}
                                                className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(movie.id)}
                                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="Xóa"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
                        <p className="text-gray-400 text-sm">
                            Hiển thị {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredMovies.length)} trong {filteredMovies.length} phim
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                            >
                                Trước
                            </button>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                            >
                                Sau
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoviesPage;
