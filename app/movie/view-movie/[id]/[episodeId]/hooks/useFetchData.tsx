"use client";

import { useGetCommentByMovieIdQuery } from "@/store/api/endpoints/commentApi";
import { useGetEpisodeByIdQuery } from "@/store/api/endpoints/episode";
import { useGetMovieByIdQuery, useGetMoviesQuery } from "@/store/api/endpoints/movieApi";


const useFetchData = (id: string, episodeId: string) => {
    const { data: episodeList, isLoading, error } = useGetEpisodeByIdQuery(episodeId);
    const { data: movieData } = useGetMovieByIdQuery(id);
    const {data:getAllMovie}=useGetMoviesQuery({})
    const { data:getCommentByMovieId, isLoading:isLoadingComment, error:errorComment } = useGetCommentByMovieIdQuery(id as string);
    return {
        episodeList,
        isLoading,
        error,
        movieData,
        getAllMovie,
        getCommentByMovieId
    };
};

export default useFetchData;
