import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const addPropertySlice = createSlice({
  name: "addproperty",
  initialState,
  reducers: {
    addPropertyReq: (state, action) => {
      state.addPropertyLoading = true;
    },
    addPropertySuccess: (state, action) => {
      state.addPropertyLoading = false;
      state.addPropertyData = action.payload;
    },
    addPropertyFail: (state, action) => {
      state.addPropertyLoading = false;
      state.addPropertyError = action.payload;
    },
  },
});

export default addPropertySlice.reducer;

export const { addPropertyReq, addPropertySuccess, addPropertyFail } =
addPropertySlice.actions; 
