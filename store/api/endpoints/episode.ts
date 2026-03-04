import { baseApi } from "../baseApi";

interface RateEpisodeRequest {
    type: string;
    score: number;
    episode_id: number;
}

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

        rateEpisode: builder.mutation<void, RateEpisodeRequest>({
            query: (body) => ({
                url: `/episodes/rate`,
                method: 'POST',
                body,
            }),
        }),
    }),
});
export const {
    useGetEpisodeByMovieIdQuery,
    useGetEpisodeByIdQuery,
    useRateEpisodeMutation,
} = movieApi;