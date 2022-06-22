import queryApi from "../../app/queryApi";
import { Beer } from "./types";

const locationApi = queryApi.injectEndpoints({
  endpoints: (builder) => ({
    getBeers: builder.query<Beer[], void>({
      query: () => {
        return {
          url: "https://api.punkapi.com/v2/beers?page=2&per_page=80",
          method: "GET",
        };
      },
    }),
    getBeer: builder.query<Beer[], { id: string }>({
      query: ({ id }) => {
        return {
          url: `https://api.punkapi.com/v2/beers/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetBeersQuery, useGetBeerQuery } = locationApi;

export default locationApi;
