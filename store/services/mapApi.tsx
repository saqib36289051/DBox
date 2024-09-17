import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from './config';
import customBaseQuery from './CustomFetchQuery';

export const mapApi = createApi({
    reducerPath: 'mapApi',
    tagTypes: ['Map'],
    baseQuery: customBaseQuery(baseURL),
    endpoints: (builder) => ({
        mapBoxList: builder.query({
            query: () => ({
                url: '/boxes/maps/',
                method: 'GET',
            }),
            providesTags: ['Map'],
        }),
    }),
});

export const { useMapBoxListQuery } = mapApi;