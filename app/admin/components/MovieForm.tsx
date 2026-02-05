"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X } from 'lucide-react';
import { MovieStatus } from '@/types/admin';
import { Movie } from '@/types/movie';

interface MovieFormProps {
    initialData?: Partial<Movie> & { status?: MovieStatus };
    isEdit?: boolean;
}

const genres = [
    'Hành Động', 'Tình Cảm', 'Hài Hước', 'Kinh Dị', 'Khoa Học Viễn Tưởng',
    'Phiêu Lưu', 'Drama', 'Anime', 'Hoạt Hình', 'Tài Liệu'
];

const MovieForm = ({ initialData, isEdit = false }: MovieFormProps) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        year: initialData?.year || new Date().getFullYear(),
        duration: initialData?.duration || '',
        rating: initialData?.rating || 0,
        poster: initialData?.poster || '',
        backdrop: initialData?.backdrop || '',
        genre: initialData?.genre || [],
        status: initialData?.status || MovieStatus.DRAFT,
        trailer: '',
        videoUrl: '',
    });

    const [posterPreview, setPosterPreview] = useState(initialData?.poster || '');
    const [backdropPreview, setBackdropPreview] = useState(initialData?.backdrop || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // TODO: Implement API call
        console.log('Form data:', formData);

        // Mock success
        alert(isEdit ? 'Cập nhật phim thành công!' : 'Thêm phim thành công!');
        router.push('/admin/movies');
    };

    const handleImageUpload = (type: 'poster' | 'backdrop') => {
        // TODO: Implement actual file upload
        const mockUrl = `https://picsum.photos/${type === 'poster' ? '300/400' : '800/450'}?random=${Date.now()}`;

        if (type === 'poster') {
            setPosterPreview(mockUrl);
            setFormData({ ...formData, poster: mockUrl });
        } else {
            setBackdropPreview(mockUrl);
            setFormData({ ...formData, backdrop: mockUrl });
        }
    };

    const toggleGenre = (genre: string) => {
        const currentGenres = formData.genre as string[];
        const newGenres = currentGenres.includes(genre)
            ? currentGenres.filter(g => g !== genre)
            : [...currentGenres, genre];
        setFormData({ ...formData, genre: newGenres });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h2 className="text-xl font-bold text-white mb-6">Thông Tin Cơ Bản</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="md:col-span-2">
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                            Tên Phim <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                            placeholder="Nhập tên phim..."
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                            Mô Tả
                        </label>
                        <textarea
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none resize-none"
                            placeholder="Nhập mô tả phim..."
                        />
                    </div>

                    {/* Year */}
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                            Năm Phát Hành
                        </label>
                        <input
                            type="number"
                            min="1900"
                            max="2100"
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                        />
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                            Thời Lượng
                        </label>
                        <input
                            type="text"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                            placeholder="VD: 120 phút"
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                            Đánh Giá
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={formData.rating}
                            onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                            Trạng Thái
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as MovieStatus })}
                            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                        >
                            <option value={MovieStatus.DRAFT}>Bản Nháp</option>
                            <option value={MovieStatus.PUBLISHED}>Xuất Bản</option>
                            <option value={MovieStatus.PENDING}>Chờ Duyệt</option>
                            <option value={MovieStatus.REJECTED}>Từ Chối</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Media Upload */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h2 className="text-xl font-bold text-white mb-6">Hình Ảnh & Video</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Poster */}
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                            Poster
                        </label>
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-red-500 transition-colors cursor-pointer"
                            onClick={() => handleImageUpload('poster')}
                        >
                            {posterPreview ? (
                                <div className="relative">
                                    <img src={posterPreview} alt="Poster preview" className="w-full h-64 object-cover rounded-lg" />
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPosterPreview('');
                                            setFormData({ ...formData, poster: '' });
                                        }}
                                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <div className="py-8">
                                    <Upload className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                                    <p className="text-gray-400">Click để tải poster</p>
                                    <p className="text-gray-600 text-xs mt-1">PNG, JPG up to 10MB</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Backdrop */}
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                            Backdrop
                        </label>
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-red-500 transition-colors cursor-pointer"
                            onClick={() => handleImageUpload('backdrop')}
                        >
                            {backdropPreview ? (
                                <div className="relative">
                                    <img src={backdropPreview} alt="Backdrop preview" className="w-full h-64 object-cover rounded-lg" />
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setBackdropPreview('');
                                            setFormData({ ...formData, backdrop: '' });
                                        }}
                                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <div className="py-8">
                                    <Upload className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                                    <p className="text-gray-400">Click để tải backdrop</p>
                                    <p className="text-gray-600 text-xs mt-1">PNG, JPG up to 10MB</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Video URL */}
                    <div className="md:col-span-2">
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                            URL Video
                        </label>
                        <input
                            type="url"
                            value={formData.videoUrl}
                            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                            placeholder="https://example.com/video.mp4"
                        />
                    </div>
                </div>
            </div>

            {/* Genres */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h2 className="text-xl font-bold text-white mb-6">Thể Loại</h2>
                <div className="flex flex-wrap gap-3">
                    {genres.map((genre) => (
                        <button
                            key={genre}
                            type="button"
                            onClick={() => toggleGenre(genre)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${(formData.genre as string[]).includes(genre)
                                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                                }`}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-end">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                    {isEdit ? 'Cập Nhật' : 'Tạo Phim'}
                </button>
            </div>
        </form>
    );
};

export default MovieForm;
