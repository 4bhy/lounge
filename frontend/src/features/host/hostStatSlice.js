import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

const hostStatSlice = createSlice({
    name: "gethoststats",
    initialState,
    reducers: {
        hostStatReq: (state, action) => {
            state.loading = true;
        },
        hostStatSucsess: (state, action) => {
            state.loading = false;
            state.stats = action.payload;
        },
        hostStatFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export default hostStatSlice .reducer;

export const { hostStatReq, hostStatSucsess, hostStatFail } = hostStatSlice .actions