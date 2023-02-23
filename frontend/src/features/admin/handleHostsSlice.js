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
            console.log("yeet");
            console.log("payload:", action.payload);
            console.log("state:1",state.hostState);
            state.loading=false;
            state.hostState=action.payload
            console.log("state:2",state.hostState);
        },
        handleHostFail:(state, action)=>{
            state.loading=false
            state.error=action.payload
        }
    }
})

export default handleHostsSlice.reducer;

export const {handleHostReq, handleHostSuccess, handleHostFail }= handleHostsSlice.actions