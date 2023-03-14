import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

const addCouponSlice = createSlice({
    name: "addcoupons",
    initialState,
    reducers: {
        addCouponsReq: (state, action) => {
            state.loading = true
        },
        addCouponsSuccess: (state, action) => {
            state.loading = false;
            state.addedCoupon = action.payload;
        },
        addCouponsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    }
})

export default addCouponSlice.reducer;

export const { addCouponsSuccess, addCouponsReq, addCouponsFail } = addCouponSlice.actions