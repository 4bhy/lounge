import {createSlice} from '@reduxjs/toolkit'

const initialState={}

const pageTwoSlice= createSlice({
    name:"pageOne",
    initialState,
    reducers:{
        pageTwoReq:(state, action)=>{
            state.loading=true;
        },
        pageTwoSuccess:(state, action)=>{
            state.loading=false;
            state.pageTwoInfo=action.payload;
            console.log(action.payload, "90");
        },
        pageTwoFail:(state,action)=>{
            state.loading=false;
        }
    }
})

export default pageTwoSlice.reducer

export const {pageTwoReq, pageTwoSuccess, pageTwoFail}= pageTwoSlice.actions;