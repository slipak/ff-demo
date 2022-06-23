import queryApi from "../../app/queryApi";
import { User } from "./types";

const usersApi = queryApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], { email: string } | void>({
      query: (params) => {
        const searchQuery = params?.email ? `?email_like=${params.email}` : "";
        return {
          url: `/users${searchQuery}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetUsersQuery, useLazyGetUsersQuery } = usersApi;

export default usersApi;
