import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color?: 'red' | 'blue' | 'green' | 'yellow';
}

const colorClasses = {
    red: 'from-red-500 to-orange-500',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    yellow: 'from-yellow-500 to-amber-500',
};

const StatsCard = ({ title, value, icon: Icon, trend, color = 'red' }: StatsCardProps) => {
    return (
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-gray-400 text-sm font-medium">{title}</p>
                    <h3 className="text-3xl font-bold text-white mt-2">{value.toLocaleString()}</h3>

                    {trend && (
                        <div className={`flex items-center gap-1 mt-2 text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'
                            }`}>
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {trend.isPositive ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                )}
                            </svg>
                            <span>{Math.abs(trend.value)}%</span>
                        </div>
                    )}
                </div>

                <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
