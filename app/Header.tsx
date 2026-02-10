"use client";
import clsx from "clsx";
import { Search, Film, User, Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetGenreQuery } from "@/store/api/endpoints/genreApi";

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
  onLoginClick?: () => void;
}

interface Genre {
  id: number;
  name: string;
}

export function Header({ onSearch, searchQuery, onLoginClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

  // Call API để lấy danh sách thể loại
  const { data: genresResponse, isLoading, error } = useGetGenreQuery({});
  const genres = genresResponse?.data || [];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menuItems = [
    { label: 'Trang Chủ', href: '/movie/home' },
    { label: 'Phim Lẻ', href: '/movie/detail' },
    { label: 'Phim Bộ', href: '/movie/view-movie' },
    { label: 'Phim Chiếu Rạp', href: '/movie/list-movie' },
  ];

  return (
    <header
      className={clsx(
        'fixed top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-black/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent backdrop-blur-[2px]'
      )}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Film className="w-7 h-7 lg:w-8 lg:h-8 text-red-600" />
              <h1 className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                CineMax
              </h1>
            </div>


            <div className="hidden md:flex items-center flex-1  max-w-md mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm phim..."
                  value={searchQuery}
                  onChange={(e) => onSearch?.(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 text-white placeholder-gray-400 rounded-lg border border-white/10 focus:border-red-500 focus:bg-white/15 focus:outline-none transition-all"
                />
              </div>
            </div>


            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}

              {/* Dropdown Thể Loại */}
              <div
                className="relative group"
                onClick={() => setShowGenreDropdown(!showGenreDropdown)}
              >
                <button
                  className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors relative"
                >
                  Thể Loại
                  <ChevronDown className="w-4 h-4" />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full transition-all duration-300" />
                </button>

                {/* Dropdown content */}
                {showGenreDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-lg rounded-lg shadow-xl border border-white/10 overflow-hidden z-50">
                    <div className="max-h-96 overflow-y-auto p-2">
                      {isLoading ? (
                        <div className="p-4 text-center text-gray-400">
                          Đang tải...
                        </div>
                      ) : error ? (
                        <div className="p-4 text-center text-red-400">
                          Lỗi khi tải thể loại
                        </div>
                      ) : genres.length > 0 ? (
                        <div className="grid grid-cols-2 gap-1">
                          {genres.map((genre: Genre) => (
                            <a
                              key={genre.id}
                              href={`/the-loai/${genre.id}`}
                              className="px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors"
                            >
                              {genre.name}
                            </a>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-gray-400">
                          Không có thể loại nào
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </nav>

          </div>


          <button
            onClick={onLoginClick}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-full transition-all shadow-lg hover:shadow-red-500/50"
          >
            <User className="w-4 h-4" />
            <span className="font-medium">Đăng nhập</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-lg border-t border-white/10">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm phim..."
                value={searchQuery}
                onChange={(e) => onSearch?.(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 text-white placeholder-gray-400 rounded-full border border-white/20 focus:border-red-500 focus:outline-none"
              />
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Genre Dropdown */}
              <div className="space-y-2">
                <button
                  onClick={() => setShowGenreDropdown(!showGenreDropdown)}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <span>Thể Loại</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showGenreDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showGenreDropdown && (
                  <div className="pl-4 space-y-1">
                    {isLoading ? (
                      <div className="p-2 text-center text-gray-400 text-sm">
                        Đang tải...
                      </div>
                    ) : error ? (
                      <div className="p-2 text-center text-red-400 text-sm">
                        Lỗi khi tải thể loại
                      </div>
                    ) : genres.length > 0 ? (
                      genres.map((genre: Genre) => (
                        <a
                          key={genre.id}
                          href={`/the-loai/${genre.id}`}
                          className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {genre.name}
                        </a>
                      ))
                    ) : (
                      <div className="p-2 text-center text-gray-400 text-sm">
                        Không có thể loại nào
                      </div>
                    )}
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile Login Button */}
            <button
              onClick={onLoginClick}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full font-medium"
            >
              <User className="w-4 h-4" />
              <span>Đăng nhập</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
