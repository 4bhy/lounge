import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

const listHotelsSlice = createSlice({
    name: "listhotels",
    initialState,
    reducers: {
        listHotelsReq: (state, action) => {
            state.loading = true;
        },
        listHotelsSuccess: (state, action) => {
            state.loading = false;
            state.hotelsList = action.payload;
        },
        listHotelsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export default listHotelsSlice.reducer;

export const { listHotelsReq, listHotelsSuccess, listHotelsFail } = listHotelsSlice.actions