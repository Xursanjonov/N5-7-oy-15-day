import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import authSlice from './slice/authSlice'
import profileSlice from "./slice/profileSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});