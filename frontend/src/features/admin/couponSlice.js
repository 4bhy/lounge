import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

const couponSlice = createSlice({
    name: "listcoupons",
    initialState,
    reducers: {
        listCoupons: (state, action) => {
            state.loading = false;
            state.couponsList = action.payload;
        },
        listCouponsReq:(state, action)=>{
            state.loading=true;
        },
        
    }
})

export default couponSlice.reducer;

export const { listCoupons } = couponSlice.actions