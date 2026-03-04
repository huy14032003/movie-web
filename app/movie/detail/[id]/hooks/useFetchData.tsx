import { useGetCommentByMovieIdQuery } from '@/store/api/endpoints/commentApi';
import { useGetMovieByIdQuery } from '@/store/api/endpoints/movieApi';
import { useParams } from 'next/navigation';
import React from 'react'

const useFetchData = () => {
    const {id}=useParams();
    const { data:getMovieById, isLoading:isLoadingMovie, error:errorMovie } = useGetMovieByIdQuery(id as string);
    const { data:getCommentByMovieId, isLoading:isLoadingComment, error:errorComment } = useGetCommentByMovieIdQuery(id as string);
  return {
    getMovieById,
    id,
    getCommentByMovieId,
  }
}

export default useFetchData