import { createSlice } from "@reduxjs/toolkit";

const initialState={}

const messageSlice = createSlice({
    name: "messageslice",
    initialState,
    reducers: {
        messageSuccess: (state, action) => {
            state.messageData = action.payload
        },
        messageFail:(state,action)=>{
            state.error=action.payload;
        }
    }
})

export default messageSlice.reducer

export const { messageSuccess, messageFail } = messageSlice.actions;