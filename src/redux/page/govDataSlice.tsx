import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Define a service using a base URL and expected endpoints
export const govDataApi = createApi({
  reducerPath: "govDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.data.gov.sg/v1" }),
  endpoints: (builder) => ({
    getGovData: builder.query({
      query: ({ date, time }) => `relative-humidity?date_time=${date}T${time}/`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetGovDataQuery } = govDataApi;
