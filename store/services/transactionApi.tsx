import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from './config';
import customBaseQuery from './CustomFetchQuery';

export const transactionApi = createApi({
    reducerPath: 'transactionApi',
    tagTypes: ['Transaction'],
    baseQuery: customBaseQuery(baseURL),
    endpoints: (builder) => ({
        transaction: builder.mutation({
            query: (credentials) => ({
                url: '/transaction/',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ["Transaction"]
        }),
        getTransactions: builder.query({
            query: (filters) => ({
                url: '/transaction/',
                method: 'GET',
                params: filters
            }),
            providesTags: ["Transaction"]
        }),
    }),
});

export const { useTransactionMutation, useGetTransactionsQuery } = transactionApi;