import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const individualPropertySlice = createSlice({
    name: "individualproperty",
    initialState,

    reducers: {
        individualPropertyReq: (state, action) => {
            state.individualPropertyLoading = true;
        },
        individualPropertySuccess: (state, action) => {
            state.individualPropertyLoading = false;
            state.individualPropertyData = action.payload;
        },
        individualPropertyFail: (state, action) => {
            state.individualPropertyLoading = false;
            state.individualPropertyError = action.payload;
        },
    }



})

export default individualPropertySlice.reducer

export const { individualPropertyReq, individualPropertySuccess, individualPropertyFail } = individualPropertySlice.actions 