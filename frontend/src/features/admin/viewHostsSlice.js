import { createSlice } from "@reduxjs/toolkit";


const initialState={}

const viewHostsSlice= createSlice({

    name:"viewhosts",
    initialState,
    reducers:{
        viewHostsReq:(state,action)=>{
            state.loading=true;
        },
        viewHostsSuccess:(state, action)=>{
            state.loading=false
            state.viewHostInfo=action.payload
        },
        viewHostsFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        }
    }
    
})

export default viewHostsSlice.reducer;

export const {viewHostsReq,viewHostsSuccess, viewHostsFail}=viewHostsSlice.actions