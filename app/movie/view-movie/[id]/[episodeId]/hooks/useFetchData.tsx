"use client";

import { useGetEpisodeByIdQuery } from "@/store/api/endpoints/episode";
import { useGetMovieByIdQuery, useGetMoviesQuery } from "@/store/api/endpoints/movieApi";


const useFetchData = (id: string, episodeId: string) => {
    const { data: episodeList, isLoading, error } = useGetEpisodeByIdQuery(episodeId);
    const { data: movieData } = useGetMovieByIdQuery(id);
    const {data:getAllMovie}=useGetMoviesQuery({})
    return {
        episodeList,
        isLoading,
        error,
        movieData,
        getAllMovie
    };
};

export default useFetchData;
