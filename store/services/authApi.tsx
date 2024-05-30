import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from './config';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/token/',
                method: 'POST',
                body: credentials,
            }),
        }),
        signup: builder.mutation({
            query: (credentials) => ({
                url: '/register/',
                method: 'POST',
                body: credentials,
            }),
        })
    }),
});

export const { useLoginMutation, useSignupMutation } = authApi;