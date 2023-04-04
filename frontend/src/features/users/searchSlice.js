import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

const searchSlice = createSlice({
    name: "searchslice",
    initialState,
    reducers: {
        searchReq: (state, action) => {
            state.searchLoading = true;
        },
        searchSuccess: (state, action) => {
            state.searchLoading = false;
            state.searchList = action.payload;
        },
        searchFail: (state, action) => {
            state.searchLoading= false;
            state.searchError = action.payload;
        }
    }
})

export default searchSlice.reducer;

export const { searchReq,  searchSuccess,searchFail} = searchSlice.actions