import {createSlice} from '@reduxjs/toolkit'

const initialState={};

const listHostsSlice= createSlice({
    name:"listhosts",
    initialState,
    reducers:{
        listHostsReq:(state, action)=>{
            state.loading=true;
        },
        listHostsSuccess:(state, action)=>{
            console.log("3456");
            state.loading=false;
            state.hostsList=action.payload;
            console.log(state.hostsList, "3456");
        },
        listHostsFail:(state, action)=>{
            state.loading=false;
            state.error=action.payload;
        }
    }
})

export default listHostsSlice.reducer;

export const { listHostsReq,listHostsSuccess, listHostsFail}= listHostsSlice.actions