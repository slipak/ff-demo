import queryApi from "../../app/queryApi";
import { Beer } from "./types";

const locationApi = queryApi.injectEndpoints({
  endpoints: (builder) => ({
    getBeers: builder.query<Beer[], void>({
      query: () => {
        return {
          url: "/beers",
          method: "GET",
        };
      },
    }),
    getBeer: builder.query<Beer, { id: string }>({
      query: ({ id }) => {
        return {
          url: `/beers/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetBeersQuery, useGetBeerQuery } = locationApi;

export default locationApi;
