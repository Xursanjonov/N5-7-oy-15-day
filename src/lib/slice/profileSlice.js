import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
}

const profileSlice = createSlice({
    name: 'profile-data',
    initialState,
    reducers: {
        getProfile: (state, action) => {
            state.value = action.payload;
        },

        editProfile: (state, action) => {
            state.value = action.payload
        }
    },
});

export const { getProfile, editProfile } = profileSlice.actions
export default profileSlice.reducer