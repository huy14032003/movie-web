"use client";
import React from 'react';
import { Film, Users, Eye, Clock } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import ViewsChart from '../components/ViewsChart';
import { DashboardStats, ViewsData, TopMovie, ActivityLog } from '@/types/admin';
import Image from 'next/image';

// Mock data - sẽ thay bằng API calls sau
const mockStats: DashboardStats = {
    totalMovies: 1248,
    pendingMovies: 23,
    todayViews: 45678,
    totalUsers: 12543,
};

const mockViewsData: ViewsData[] = [
    { date: '29/01', views: 3200 },
    { date: '30/01', views: 4100 },
    { date: '31/01', views: 3800 },
    { date: '01/02', views: 5200 },
    { date: '02/02', views: 4900 },
    { date: '03/02', views: 6100 },
    { date: '04/02', views: 5800 },
];

const mockTopMovies: TopMovie[] = [
    { id: '1', title: 'Dục Vọng Tình Yêu', poster: '/placeholder.jpg', views: 12543, rating: 8.5 },
    { id: '2', title: 'Người Yêu Cũ Của Anh', poster: '/placeholder.jpg', views: 11234, rating: 8.2 },
    { id: '3', title: 'Kẻ Săn Đêm', poster: '/placeholder.jpg', views: 10987, rating: 8.7 },
    { id: '4', title: 'Mùa Hè Rực Rỡ', poster: '/placeholder.jpg', views: 9876, rating: 8.0 },
    { id: '5', title: 'Chiến Binh Cuối Cùng', poster: '/placeholder.jpg', views: 9234, rating: 8.3 },
];

const mockActivities: ActivityLog[] = [
    { id: '1', action: 'Thêm phim mới', user: 'Admin', target: 'Dục Vọng Tình Yêu', timestamp: '5 phút trước' },
    { id: '2', action: 'Duyệt phim', user: 'Moderator', target: 'Người Yêu Cũ Của Anh', timestamp: '15 phút trước' },
    { id: '3', action: 'Chỉnh sửa thông tin', user: 'Admin', target: 'Kẻ Săn Đêm', timestamp: '1 giờ trước' },
    { id: '4', action: 'Xóa phim', user: 'Admin', target: 'Phim Test', timestamp: '2 giờ trước' },
    { id: '5', action: 'Thêm user mới', user: 'Admin', target: 'user@example.com', timestamp: '3 giờ trước' },
];

const DashboardPage = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                    Dashboard
                </h1>
                <p className="text-gray-400 mt-2">Tổng quan hệ thống quản lý phim</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Tổng Số Phim"
                    value={mockStats.totalMovies}
                    icon={Film}
                    color="red"
                    trend={{ value: 12, isPositive: true }}
                />
                <StatsCard
                    title="Phim Chờ Duyệt"
                    value={mockStats.pendingMovies}
                    icon={Clock}
                    color="yellow"
                    trend={{ value: 5, isPositive: false }}
                />
                <StatsCard
                    title="Lượt Xem Hôm Nay"
                    value={mockStats.todayViews}
                    icon={Eye}
                    color="blue"
                    trend={{ value: 8, isPositive: true }}
                />
                <StatsCard
                    title="Tổng Người Dùng"
                    value={mockStats.totalUsers}
                    icon={Users}
                    color="green"
                    trend={{ value: 15, isPositive: true }}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Views Chart */}
                <div className="lg:col-span-2">
                    <ViewsChart data={mockViewsData} />
                </div>

                {/* Top Movies */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-white mb-6">Top 5 Phim Xem Nhiều</h3>
                    <div className="space-y-4">
                        {mockTopMovies.map((movie, index) => (
                            <div key={movie.id} className="flex items-center gap-3">
                                <span className="text-2xl font-bold text-gray-600 w-6">#{index + 1}</span>
                                <div className="w-12 h-16 rounded overflow-hidden bg-gray-800 flex-shrink-0">
                                    {/* Placeholder for poster */}
                                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-white font-semibold truncate text-sm">{movie.title}</h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                        <span>⭐ {movie.rating}</span>
                                        <span>•</span>
                                        <span>{movie.views.toLocaleString()} views</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6">Hoạt Động Gần Đây</h3>
                <div className="space-y-4">
                    {mockActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-800 last:border-0 last:pb-0">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 mt-2 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-white">
                                    <span className="font-semibold">{activity.user}</span>
                                    {' '}
                                    <span className="text-gray-400">{activity.action}</span>
                                    {' '}
                                    <span className="font-semibold">{activity.target}</span>
                                </p>
                                <p className="text-gray-500 text-sm mt-1">{activity.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
