import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Define a service using a base URL and expected endpoints
export const getAchievementDataApi = createApi({
  reducerPath: "getAchievementDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.data.gov.sg/v1" }),
  endpoints: (builder) => ({
    getTemperatureData: builder.query({
      query: (date) => `/environment/air-temperature?date_time=${date}`,
    }),
    getHumidityData: builder.query({
      query: (date) => `/environment/relative-humidity?date_time=${date}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTemperatureDataQuery, useGetHumidityDataQuery } = getAchievementDataApi;
