import { createSlice } from "@reduxjs/toolkit";

const initialState={}

const messageSlice = createSlice({
    name: "messageslice",
    initialState,
    reducers: {
        messageReq:(state, action)=>{
            state.loading=true
        },
        messageSuccess: (state, action) => {
            state.loading=false
            state.messageData = action.payload
        },
        messageFail:(state,action)=>{
            state.loading=false
            state.messageError=action.payload;
        }
    }
})

export default messageSlice.reducer

export const { messageSuccess, messageFail, messageReq } = messageSlice.actions;