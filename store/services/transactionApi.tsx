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
            providesTags: ["Transaction"],
        }),
        getTransactionTotals: builder.query({
            query: () => ({
                url: '/transaction-totals/',
                method: 'GET',
            }),
            providesTags: ["Transaction"]
        }),
        getTransactionGraphData: builder.query({
            query: () => ({
                url: '/transaction-graph-data/',
                method: 'GET',
            }),
            providesTags: ["Transaction"]
        }),
        getDownloadReport: builder.mutation({
            query: () => ({
                url: '/download-report/',
                method: 'GET',
                responseHandler: (response) => response.blob(),
            }),
        }),
        getReportData: builder.query({
            query: () => ({
                url: '/report-transaction-data/',
                method: 'GET'
            }),
            providesTags: ["Transaction"]
        }),
        updateBoxStatus: builder.query({
            query: () => ({
                url: '/update-box-status/',
                method: 'GET'
            }),
            providesTags: ["Transaction"]
        })
    }),
});

export const {
    useTransactionMutation,
    useGetTransactionsQuery,
    useGetTransactionTotalsQuery,
    useGetTransactionGraphDataQuery,
    useGetDownloadReportMutation,
    useGetReportDataQuery,
    useUpdateBoxStatusQuery
} = transactionApi;