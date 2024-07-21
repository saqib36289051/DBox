import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from './config';
import customBaseQuery from './CustomFetchQuery';

export const boxApi = createApi({
    reducerPath: 'boxApi',
    baseQuery: customBaseQuery(baseURL),
    endpoints: (builder) => ({
        box: builder.mutation({
            query: (credentials) => ({
                url: '/box/',
                method: 'POST',
                headers: { "Content-Type": "multipart/form-data" },
                body: credentials,
            }),
        }),
        getBox: builder.query({
            query: (filters) => ({
                url: '/box/',
                method: 'GET',
                params: filters,
            }),
        }),
    }),
});

export const { useBoxMutation, useGetBoxQuery } = boxApi;