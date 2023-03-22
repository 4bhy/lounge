import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const availabilitySlice = createSlice({
    name: "availabilityslice",
    initialState,

    reducers: {
        availabilitySuccess: (state, action) => {
            state.availabilityLoading=false;
            state.availabilityData = action.payload
        },
        availabilityFail: (state, action) => {
            state.availabilityLoading=false;
            state.error = action.payload
        },
        availabilityReq:(state, action)=>{
            state.availabilityLoading=true;
        },
        resetAvailability:(state, action)=>{
            state.error=null;
            state.availabilityData=null;
        }
    }
})

export default availabilitySlice.reducer

export const { availabilitySuccess, availabilityFail, availabilityReq, resetAvailability } = availabilitySlice.actions;