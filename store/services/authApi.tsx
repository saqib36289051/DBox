import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from './config';
import customBaseQuery from './CustomFetchQuery';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: customBaseQuery(baseURL),
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
        }),
        logout: builder.mutation({
            query: (credentials) => ({
                url: '/logout/',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } = authApi;