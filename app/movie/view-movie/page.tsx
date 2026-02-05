import React from 'react'
import VideoPlayerPage from './components/VideoPlayerPage'
import { movies } from '@/data/movies'

const page = () => {
    const currentMovie = movies[0];
    const relatedMovies = movies.slice(1, 6);

    return (
        <div className='flex-1'>
            <div className="mb-24"></div>
                <VideoPlayerPage movie={currentMovie} relatedMovies={relatedMovies} />

        </div>
    )
}

export default page