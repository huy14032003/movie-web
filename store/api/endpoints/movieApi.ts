import { baseApi } from '@/store/api/baseApi';
import type { Movie } from '@/types/movie';
import type { ApiResponse, PaginatedResponse, QueryParams } from '@/store/api/types';

export const movieApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMovies: builder.query<PaginatedResponse<Movie>, QueryParams>({
            query: (params) => ({
                url: '/movies',
                params,
            }),
            transformResponse: (response: ApiResponse<PaginatedResponse<Movie>>) => response.data,
            providesTags: (result) =>
                result
                    ? [
                        ...result.content.map(({ id }) => ({ type: 'Movie' as const, id })),
                        { type: 'Movie', id: 'LIST' },
                    ]
                    : [{ type: 'Movie', id: 'LIST' }],
        }),
        getMoviesFeatured: builder.query<PaginatedResponse<Movie>, QueryParams>({
            query: (params) => ({
                url: '/movies/featured',
                params,
            }),
            transformResponse: (response: ApiResponse<PaginatedResponse<Movie>>) => response.data,
            providesTags: (result) =>
                result
                    ? [
                        ...result.content.map(({ id }) => ({ type: 'Movie' as const, id })),
                        { type: 'Movie', id: 'LIST' },
                    ]
                    : [{ type: 'Movie', id: 'LIST' }],
        }),

        getMovieById: builder.query<ApiResponse<Movie>, string>({
            query: (id) => `/movies/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Movie', id }],
        }),
        getMovieByCountry: builder.query<ApiResponse<Movie>, string>({
            query: (id) => `/movies/country/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Movie', id }],
        }),
        getMovieByGenre: builder.query<ApiResponse<Movie>, string>({
            query: (id) => `/movies/genre/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Movie', id }],
        }),

        createMovie: builder.mutation<ApiResponse<Movie>, Partial<Movie>>({
            query: (body) => ({
                url: '/movies',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Movie', id: 'LIST' }],
        }),

        updateMovie: builder.mutation<ApiResponse<Movie>, { id: string; body: Partial<Movie> }>({
            query: ({ id, body }) => ({
                url: `/movies/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Movie', id },
                { type: 'Movie', id: 'LIST' },
            ],
        }),

        deleteMovie: builder.mutation<ApiResponse<void>, string>({
            query: (id) => ({
                url: `/movies/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, id) => [
                { type: 'Movie', id },
                { type: 'Movie', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useGetMoviesQuery,
    useGetMoviesFeaturedQuery,
    useGetMovieByIdQuery,
    useGetMovieByCountryQuery,
    useGetMovieByGenreQuery,

} = movieApi;
