import React from 'react'
import VideoPlayerPage from './components/VideoPlayerPage';

interface PageProps {
    params: Promise<{ id: string; episodeId: string }>;
}

const page = async ({ params }: PageProps) => {
    const { id, episodeId } = await params;

    return (
        <div className='flex-1'>
            <div className="mb-20"></div>
            <VideoPlayerPage movieId={id} episodeId={episodeId} />
        </div>
    )
}

export default page
