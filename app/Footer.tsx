import React from 'react';
import { Film, Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-gray-800 mt-16">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Film className="w-8 h-8 text-red-500" />
                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                                CineMax
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Xem phim online chất lượng cao, cập nhật nhanh nhất. Trải nghiệm giải trí đỉnh cao cùng CineMax.
                        </p>
                        {/* Social Media */}
                        <div className="flex gap-3">
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition-colors">
                                <Youtube className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Phim */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Phim</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Phim Mới</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Phim Bộ</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Phim Lẻ</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Phim Chiếu Rạp</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Top IMDB</a></li>
                        </ul>
                    </div>

                    {/* Thể Loại */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Thể Loại</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hành Động</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kinh Dị</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tình Cảm</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hài Hước</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Khoa Học Viễn Tưởng</a></li>
                        </ul>
                    </div>

                    {/* Liên Hệ */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Liên Hệ</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Về Chúng Tôi</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Điều Khoản</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Chính Sách</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Liên Hệ Quảng Cáo</a></li>
                            <li className="flex items-center gap-2 text-gray-400">
                                <Mail className="w-4 h-4" />
                                <span>contact@cinemax.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-8 pt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        © 2026 CineMax. All rights reserved. | Thiết kế bởi <span className="text-red-500">CineMax Team</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;