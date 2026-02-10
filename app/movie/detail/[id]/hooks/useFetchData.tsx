import { useGetMovieByIdQuery } from '@/store/api/endpoints/movieApi';
import { useParams } from 'next/navigation';
import React from 'react'

const useFetchData = () => {
    const {id}=useParams();
    const { data:getMovieById, isLoading, error } = useGetMovieByIdQuery(id as string);
  return {
    getMovieById,
  }
}

export default useFetchData