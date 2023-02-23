import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const pageOneSlice = createSlice({
    name: "pageOne",
    initialState,
    reducers: {
        pageOneReq: (state, action) => {
            state.loading = true;
        },
        pageOneSuccess: (state, action) => {
            state.loading = false;
            state.pageOneInfo = action.payload;
        },
        pageOneFail: (state, action) => {
            state.loading = false;
        }
    }
})

export default pageOneSlice.reducer;

export const { pageOneReq, pageOneSuccess, pageOneFail } = pageOneSlice.actions;