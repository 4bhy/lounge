import { createSlice } from "@reduxjs/toolkit";

const initialState={}

const messageSlice = createSlice({
    name: "messageslice",
    initialState,
    reducers: {
        message: (state, action) => {
            state.messageData = action.payload
        }
      
    }
})

export default messageSlice.reducer

export const { message } = messageSlice.actions;