import {createSlice} from '@reduxjs/toolkit'

const initialState={};

const listApprovalsSlice= createSlice({
    name:"listapprovals",
    initialState,
    reducers:{
        listApprovalsReq:(state, action)=>{
            state.loading=true;
        },
        listApprovalsSuccess:(state, action)=>{
            state.loading=false;
            state.approvalsData=action.payload;
         
        },
        listApprovalsFail:(state, action)=>{
            state.loading=false;
            state.error=action.payload;
        }
    }
})

export default listApprovalsSlice.reducer;

export const { listApprovalsReq,listApprovalsSuccess, listApprovalsFail}= listApprovalsSlice.actions