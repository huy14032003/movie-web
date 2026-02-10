import { useGetGenreByIdQuery, useGetGenreQuery } from '@/store/api/endpoints/genreApi'
import { useGetMoviesFeaturedQuery, useGetMoviesQuery } from '@/store/api/endpoints/movieApi'
import React from 'react'

const useGetData = () => {
    const {data:getAllMovie}=useGetMoviesQuery({})
    const {data:getGenre}=useGetGenreQuery({})
    const {data:getFeaturedMovie}=useGetMoviesFeaturedQuery({})
  return{
    getAllMovie,
    getFeaturedMovie,
    getGenre,
  }
}

export default useGetData