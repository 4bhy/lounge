import {createSlice} from '@reduxjs/toolkit';

const initialState={};

const hostRegisterSlice= createSlice({
    name:"host",
    initialState,
    reducers:{
        hostRegisterReq:(state, action)=>{
            state.loading= true;
        },
        hostRegisterSuccess:(state, action)=>{
            state.loading=false;
            state.hostInfo= action.payload;
        },
        hostRegisterFail:(state, action)=>{
            state.loading=false;
            state.error= action.payload;
        }
    }
})

export default hostRegisterSlice.reducer;

export const {hostRegisterReq,  hostRegisterSuccess, hostRegisterFail}= hostRegisterSlice.actions;
