import { useGetEpisodeByIdQuery,  } from '@/store/api/endpoints/episode';
import React from 'react'
import { useParams, usePathname } from 'next/navigation';

const useFetchData = () => {
    const { id } = useParams();
    const { data: episodeList } = useGetEpisodeByIdQuery(id as string);
    return {
        episodeList
    }
}

export default useFetchData