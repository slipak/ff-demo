import queryApi from "../../app/queryApi";
import { Favorite } from "./types";

const favoritesApi = queryApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserFavorites: builder.query<Favorite[], { userId: string }>({
      query: ({ userId }) => {
        return {
          url: `/favorites?userId=${userId}`,
          method: "GET",
        };
      },
      providesTags: ["FavoriteBeers"],
    }),
    postFavorites: builder.mutation<Favorite, Partial<Favorite>>({
      query(data) {
        return {
          url: `/favorites`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["FavoriteBeers"],
    }),
  }),
});

export const { useGetUserFavoritesQuery, usePostFavoritesMutation } =
  favoritesApi;

export default favoritesApi;
