"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { movies } from '@/data/movies';
import { MovieStatus } from '@/types/admin';
import MovieForm from '@/app/admin/components/MovieForm';

const EditMoviePage = () => {
    const params = useParams();
    const movieId = params.id as string;

    // Find movie from mock data
    const movie = movies.find(m => m.id === movieId);

    if (!movie) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Không tìm thấy phim</p>
            </div>
        );
    }

    const initialData = {
        ...movie,
        status: MovieStatus.PUBLISHED, // Mock status
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                    Chỉnh Sửa Phim
                </h1>
                <p className="text-gray-400 mt-2">Cập nhật thông tin phim: <span className="text-white font-semibold">{movie.title}</span></p>
            </div>

            <MovieForm initialData={initialData} isEdit />
        </div>
    );
};

export default EditMoviePage;
