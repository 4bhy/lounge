import {createSlice} from '@reduxjs/toolkit'

const initialState={}

const handleUsersSlice=createSlice({
    name:"handleusers",
    initialState,
    reducers:{
        handleUserReq:(state, action)=>{
            state.loading=true
        },
        handleUserSuccess:(state, action)=>{
            state.loading=false;
            state.userState=action.payload
        },
        handleUserFail:(state, action)=>{
            state.loading=false
            state.error=action.payload
        }
    }
})

export default handleUsersSlice.reducer;

export const {handleUserReq, handleUserSuccess, handleUserFail }= handleUsersSlice.actions