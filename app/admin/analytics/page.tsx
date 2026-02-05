"use client";
import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp } from 'lucide-react';

const genreData = [
    { name: 'Hành Động', value: 342, color: '#EF4444' },
    { name: 'Tình Cảm', value: 267, color: '#F97316' },
    { name: 'Hài Hước', value: 189, color: '#FBBF24' },
    { name: 'Kinh Dị', value: 156, color: '#8B5CF6' },
    { name: 'Drama', value: 294, color: '#3B82F6' },
];

const monthlyViews = [
    { month: 'T1', views: 145000 },
    { month: 'T2', views: 167000 },
    { month: 'T3', views: 189000 },
    { month: 'T4', views: 178000 },
    { month: 'T5', views: 198000 },
    { month: 'T6', views: 105000 },
    { month: 'T7', views: 315000 },
    { month: 'T8', views: 25000 },
    { month: 'T9', views: 15000 },
    { month: 'T10', views: 15000 },
    { month: 'T11', views: 55000 },
    { month: 'T12', views: 115000 },
];

const topCountries = [
    { country: 'Việt Nam', views: 567890, percentage: 45 },
    { country: 'Thái Lan', views: 234567, percentage: 18 },
    { country: 'Philippines', views: 189234, percentage: 15 },
    { country: 'Indonesia', views: 156789, percentage: 12 },
    { country: 'Khác', views: 125670, percentage: 10 },
];

const AnalyticsPage = () => {
    const [timeRange, setTimeRange] = useState('30');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                        Thống Kê & Phân Tích
                    </h1>
                    <p className="text-gray-400 mt-2">Insight về performance và engagement</p>
                </div>

                <div className="flex gap-3">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                    >
                        <option value="7">7 ngày qua</option>
                        <option value="30">30 ngày qua</option>
                        <option value="90">90 ngày qua</option>
                    </select>

                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                        <Download size={18} />
                        Export
                    </button>
                </div>
            </div>

            {/* Monthly Views Chart */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6">Lượt Xem Theo Tháng</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyViews}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1F2937',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                            }}
                        />
                        <Bar dataKey="views" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#EF4444" />
                                <stop offset="100%" stopColor="#F97316" />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Genre Distribution & Countries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Genre Pie Chart */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-white mb-6">Phân Bố Thể Loại</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={genreData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent ?? 0 * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {genreData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1F2937',
                                    border: '1px solid #374151',
                                    borderRadius: '8px',
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Countries */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-white mb-6">Quốc Gia Xem Nhiều Nhất</h3>
                    <div className="space-y-4">
                        {topCountries.map((item) => (
                            <div key={item.country} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-white font-medium">{item.country}</span>
                                    <span className="text-gray-400">{item.views.toLocaleString()} ({item.percentage}%)</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                                        style={{ width: `${item.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Avg. Watch Time</span>
                        <TrendingUp className="text-green-500" size={20} />
                    </div>
                    <h3 className="text-3xl font-bold text-white">42 phút</h3>
                    <p className="text-green-500 text-sm mt-2">+12% vs tháng trước</p>
                </div>

                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Completion Rate</span>
                        <TrendingUp className="text-green-500" size={20} />
                    </div>
                    <h3 className="text-3xl font-bold text-white">68%</h3>
                    <p className="text-green-500 text-sm mt-2">+5% vs tháng trước</p>
                </div>

                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">New Users</span>
                        <TrendingUp className="text-green-500" size={20} />
                    </div>
                    <h3 className="text-3xl font-bold text-white">1,234</h3>
                    <p className="text-green-500 text-sm mt-2">+23% vs tháng trước</p>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
