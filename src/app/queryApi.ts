import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const queryApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ["FavoriteBeers"],
  endpoints: () => ({}),
});

export default queryApi;
