import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from './slices/userSlice';
import { authApi } from './services/authApi';
import { transactionApi } from './services/transactionApi';
import { boxApi } from './services/boxApi';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer,
        [transactionApi.reducerPath]: transactionApi.reducer,
        [boxApi.reducerPath]: boxApi.reducer,
    },


    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            authApi.middleware,
            transactionApi.middleware,
            boxApi.middleware,
        ]),
});

export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch);