import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from './config';
import customBaseQuery from './CustomFetchQuery';

export const transactionApi = createApi({
    reducerPath: 'transactionApi',
    baseQuery: customBaseQuery(baseURL),
    endpoints: (builder) => ({
        transaction: builder.mutation({
            query: (credentials) => ({
                url: '/transaction/',
                method: 'POST',
                body: credentials,
            }),
        }),
        getTransactions: builder.query({
            query: () => ({
                url: '/transaction/',
                method: 'GET',
            }),
        }),
    }),
});

export const { useTransactionMutation, useGetTransactionsQuery } = transactionApi;