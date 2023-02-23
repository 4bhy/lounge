import { createSlice } from "@reduxjs/toolkit";


const initialState={}

const hostPropertySlice=createSlice({
    name:"hostproperty",
    initialState,
    reducers:{
        hostPropertyReq:(state,action)=>{
            state.loading=true;
        },
        hostPropertySuccess:(state,action)=>{
            state.loading=false;
            state.hostPropertyData=action.payload;
        },
        hostPropertyFail:(state,action)=>{
            state.loading=false;
        }
    }
})

export default hostPropertySlice.reducer;

export const {hostPropertyReq, hostPropertySuccess, hostPropertyFail}=hostPropertySlice.actions