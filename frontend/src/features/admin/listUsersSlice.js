import {createSlice} from '@reduxjs/toolkit'

const initialState={};

const listUsersSlice= createSlice({
    name:"listusers",
    initialState,
    reducers:{
        listUsersReq:(state, action)=>{
            state.loading=true;
        },
        listUsersSuccess:(state, action)=>{
            state.loading=false;
            state.usersList=action.payload;
        },
        listUsersFail:(state, action)=>{
            state.loading=false;
            state.error=action.payload;
        }
    }
})

export default listUsersSlice.reducer;

export const { listUsersReq,listUsersSuccess, listUsersFail}= listUsersSlice.actions