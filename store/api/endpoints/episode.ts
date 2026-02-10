import { baseApi } from "../baseApi";

export const movieApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEpisodeByMovieId: builder.query({
            query: (movieId: string) => ({
                url: `/${movieId}/episodes`,
                method: 'GET',
            }),
            providesTags: ["Episode"]
        }),

        getEpisodeById: builder.query({
            query: (id: string) => ({
                url: `/episodes/${id}`,
                method: 'GET',
            }),
            providesTags: ["Episode"]
        }),
    }),
});
export const {
    useGetEpisodeByMovieIdQuery,
    useGetEpisodeByIdQuery,
} = movieApi;