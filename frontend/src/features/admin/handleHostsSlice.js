import { createSlice } from "@reduxjs/toolkit";


const initialState={}

const handleHostsSlice=createSlice({
    name:"handleusers",
    initialState,
    reducers:{
        handleHostReq:(state, action)=>{
            state.loading=true
        },
        handleHostSuccess:(state, action)=>{
            state.loading=false;
            state.hostState=action.payload
        },
        handleHostFail:(state, action)=>{
            state.loading=false
            state.error=action.payload
        }
    }
})

export default handleHostsSlice.reducer;

export const {handleHostReq, handleHostSuccess, handleHostFail }= handleHostsSlice.actions