import { baseApi } from "../baseApi";

export const movieApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCommentByMovieId: builder.query({
            query: (movieId: string) => ({
                url: `/comments/movie/${movieId}`,
                method: 'GET',
            }),
            providesTags: ["Comment"]
        }),

        createComment: builder.mutation<void, any>({
            query: (body) => ({
                url: `/comments`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ["Comment"]
        }),
    }),
});
export const {
    useGetCommentByMovieIdQuery,
    useCreateCommentMutation,
} = movieApi;