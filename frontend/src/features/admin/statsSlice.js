import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

const statsSlice = createSlice({
    name: "getstats",
    initialState,
    reducers: {
        getStatsReq: (state, action) => {
            state.loading = true;
        },
        getStats: (state, action) => {
            state.statsData = action.payload;
            state.loading = false
        },
        getStatsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export default statsSlice.reducer;

export const { getStats, getStatsFail, getStatsReq } = statsSlice.actions