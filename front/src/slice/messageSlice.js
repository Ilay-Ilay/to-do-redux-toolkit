import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    isOpen: false,
    messageType: null,
    messageText: null,
  },
  reducers: {
    openMessage: (state, action) => {
      state.isOpen = true;
      state.messageType = action.payload.messageType;
      state.messageText = action.payload.messageText;
    },
    closeMessage: (state) => {
      state.isOpen = false;
      state.messageType = null;
      state.messageText = null;
    },
  },
});

export const { openMessage, closeMessage } = messageSlice.actions;

export default messageSlice.reducer;
