import { baseApi } from "../baseApi";

export const movieApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getGenre: builder.query({
            query: () => ({
                url: '/genres',
                method: 'GET',
            }),
            providesTags: ["Genre"]
        }),

        getGenreById: builder.query({
            query: (id: string) => ({
                url: `/genres/${id}`,
                method: 'GET',
            }),
            providesTags: ["Genre"]
        }),
    }),
});
export const {
    useGetGenreQuery,
    useGetGenreByIdQuery,
} = movieApi;