import { createSlice } from "@reduxjs/toolkit";

const initialState={}

const bookingSlice = createSlice({
    name: "bookingslice",
    initialState,
    reducers: {
        userBookingReq:(state,action)=>{
            state.loading=true
        },
        userBooking: (state, action) => {
            state.userBookingData = action.payload
            state.loading=false
        },
        hostBooking: (state, action) => {
            state.hostBookingData = action.payload
        },
        userBookingFail:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },

    }
})

export default bookingSlice.reducer

export const { userBooking, hostBooking,  userBookingReq, userBookingFail } = bookingSlice.actions;