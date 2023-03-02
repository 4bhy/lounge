import { createSlice } from "@reduxjs/toolkit";

const initialState={}

const bookingSlice = createSlice({
    name: "bookingslice",
    initialState,
    reducers: {
        userBooking: (state, action) => {
            state.userBookingData = action.payload
        },
        hostBooking: (state, action) => {
            state.hostBookingData = action.payload
        }
    }
})

export default bookingSlice.reducer

export const { userBooking, hostBooking } = bookingSlice.actions;