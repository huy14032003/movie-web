"use client";
import clsx from "clsx";
import { Search, Film, User, LogOut, Settings, BarChart3, Upload } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
  onLoginClick?: () => void;
  onAdminUploadClick?: () => void;
  onAdminRevenueClick?: () => void;
}

export function Header({ onSearch, searchQuery, onLoginClick, onAdminUploadClick, onAdminRevenueClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'fixed top-0 z-40 w-full transition-colors duration-300',
        scrolled
          ? 'bg-black/80 backdrop-blur-md'
          : 'bg-transparent backdrop-blur-sm'
      )}
    >
      <div className="px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Film className="w-8 h-8 text-red-600" />
              <h1 className="text-2xl font-medium text-white">CineMax</h1>
            </div>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm phim..."
                  value={searchQuery}
                  onChange={(e) => onSearch?.(e.target.value)}
                  className="w-full pl-10 pr-4 py-1  bg-white/30 rounded-lg  border border-transparent focus:border-white/50 focus:outline-none"
                />
              </div>
            </div>
            <nav className="flex items-center gap-4 ">
              <>
                {/* <button
                onClick={onAdminUploadClick}
                className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Upload className="w-4 h-4" />
                <span className="hidden md:inline">Upload</span>
              </button>
              <button
                onClick={onAdminRevenueClick}
                className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden md:inline">Doanh thu</span>
              </button> */}
                <div className="text-gray-400">Phim lẻ </div>
                <div className="text-gray-400">Phim lẻ </div>
                <div className="text-gray-400">Phim lẻ </div>
                <div className="text-gray-400">Phim lẻ </div>
                <div className="text-gray-400">Phim lẻ </div>
              </>

            </nav>
          </div>

          <button
            onClick={onLoginClick}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
            <User className="w-4 h-4" />
            <span>Đăng nhập</span>
          </button>
        </div>
      </div>
    </header>
  );
}
