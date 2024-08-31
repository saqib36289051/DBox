import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from './config';
import customBaseQuery from './CustomFetchQuery';

export const boxApi = createApi({
    reducerPath: 'boxApi',
    tagTypes: ['Box'],
    baseQuery: customBaseQuery(baseURL),
    endpoints: (builder) => ({
        box: builder.mutation({
            query: (credentials) => ({
                url: '/box/',
                method: 'POST',
                headers: { "Content-Type": "multipart/form-data" },
                body: credentials,
            }),
            invalidatesTags: ['Box'],
        }),
        updateBox: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/box/${id}/`,
                method: 'PUT',
                headers: { "Content-Type": "multipart/form-data" },
                body: formData,
            }),
            invalidatesTags: ['Box'],
        }),
        getBox: builder.query({
            query: (filters) => ({
                url: '/box/',
                method: 'GET',
                params: filters,
            }),
            providesTags: ['Box'],
        }),
    }),
});

export const { useBoxMutation, useGetBoxQuery, useUpdateBoxMutation } = boxApi;