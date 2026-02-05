import React from 'react';
import MovieForm from '../../components/MovieForm';

const CreateMoviePage = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                    Thêm Phim Mới
                </h1>
                <p className="text-gray-400 mt-2">Tạo phim mới trong hệ thống</p>
            </div>

            <MovieForm />
        </div>
    );
};

export default CreateMoviePage;
