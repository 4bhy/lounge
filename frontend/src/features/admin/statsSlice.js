import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

const statsSlice = createSlice({
    name: "getstats",
    initialState,
    reducers: {
        getStats: (state, action) => {
            state.statsData = action.payload;
        }
    }
})

export default statsSlice.reducer;

export const { getStats } = statsSlice.actions