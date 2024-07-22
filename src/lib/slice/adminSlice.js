import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: JSON.parse(localStorage.getItem('profile')) || [],
}

const adminSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        updateAdmin: (state, action) => {
            state.value = action.payload
            localStorage.setItem('profile', JSON.stringify(state.value))
        }
    }
})

export const { updateAdmin } = adminSlice.actions
export default adminSlice.reducer