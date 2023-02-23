import { createSlice } from "@reduxjs/toolkit";

const initialState={}

const pageThreeSlice= createSlice({
    name:"pageTHree",
    initialState,
    reducers:{
        pageThreeReq:(state, action)=>{
            state.loading= true;
        },
        pageThreeSuccess:(state,action)=>{
            state.loading=false
            state.pageThreeInfo=action.payload
        },
        pageThreeFail:(state, action)=>{
            state.loading=false;
        }
    }
})

export default pageThreeSlice.reducer

export const { pageThreeReq, pageThreeSuccess, pageThreeFai}= pageThreeSlice.actions