import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem("admin-token"),
    admin: localStorage.getItem("admin"),
    user: localStorage.getItem("user-data")
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("admin-token", action.payload)
        },
        setAdmin: (state, action) => {
            state.admin = action.payload
            localStorage.setItem("admin", JSON.stringify(action.payload))
        },
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user-data", JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("admin")
            localStorage.removeItem("admin-token")
            localStorage.removeItem("user-data")
        },
    },
});

export const { logout, setToken, setAdmin, setUser } = authSlice.actions;
export default authSlice.reducer;