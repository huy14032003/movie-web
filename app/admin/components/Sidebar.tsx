"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Film,
    BarChart3,
    CheckCircle,
    Users,
    Menu,
    X
} from 'lucide-react';

const navItems = [
    {
        href: '/admin/dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard
    },
    {
        href: '/admin/movies',
        label: 'Quản Lý Phim',
        icon: Film
    },
    {
        href: '/admin/analytics',
        label: 'Thống Kê',
        icon: BarChart3
    },
    {
        href: '/admin/moderation',
        label: 'Kiểm Duyệt',
        icon: CheckCircle
    },
    {
        href: '/admin/accounts',
        label: 'Tài Khoản',
        icon: Users
    },
];

const Sidebar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed lg:sticky top-0 left-0 h-screen bg-gray-900 text-white w-64 transform transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                        Admin Panel
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Về Trang Chủ</span>
                    </Link>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                />
            )}
        </>
    );
};

export default Sidebar;
