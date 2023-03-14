import { createSlice } from "@reduxjs/toolkit";


const initialState={}

const listHostPropertySlice=createSlice({
    name:"listhostproperty",
    initialState,
    reducers:{
        listHostPropertyReq:(state,action)=>{
            state.loading=true;
        },
        listHostPropertySuccess:(state,action)=>{
            state.loading=false;
            state.listHostPropertyData=action.payload;
        },
        listHostPropertyFail:(state,action)=>{
            state.loading=false;
        }
    }
})

export default listHostPropertySlice.reducer;

export const {listHostPropertyReq, listHostPropertySuccess, listHostPropertyFail}=listHostPropertySlice.actions