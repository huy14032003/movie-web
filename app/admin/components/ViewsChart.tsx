"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ViewsData } from '@/types/admin';

interface ViewsChartProps {
    data: ViewsData[];
    title?: string;
}

const ViewsChart = ({ data, title = "Lượt Xem 7 Ngày Qua" }: ViewsChartProps) => {
    return (
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-6">{title}</h3>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                        dataKey="date"
                        stroke="#9CA3AF"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        stroke="#9CA3AF"
                        style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#fff'
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="views"
                        stroke="url(#colorGradient)"
                        strokeWidth={3}
                        dot={{ fill: '#EF4444', r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                    <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#EF4444" />
                            <stop offset="100%" stopColor="#F97316" />
                        </linearGradient>
                    </defs>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ViewsChart;
