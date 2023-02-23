import { createSlice } from "@reduxjs/toolkit";


const initialState={}

const handleHotelsSlice=createSlice({
    name:"handlehotels",
    initialState,
    reducers:{
        handleHotelsReq:(state, action)=>{
            state.loading=true  
        },
        handleHotelsSuccess:(state, action)=>{
            state.loading=false;
            state.hotelsState=action.payload
        },
        handleHotelsFail:(state, action)=>{
            state.loading=false
            state.error=action.payload
        }
    }
})

export default handleHotelsSlice.reducer;

export const {handleHotelsReq, handleHotelsSuccess, handleHotelsFail }= handleHotelsSlice.actions