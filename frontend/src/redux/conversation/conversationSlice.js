import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedConversation: null,
  messages: null,
  notifications: [],
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    selectConversation(state, action) {
      state.selectedConversation = action.payload;
    },
    clearSelected(state) {
      state.selectedConversation = null;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    newMessage(state, action) {
      state.messages.push(action.payload);
    },
    clearMessages(state) {
      state.messages = null;
    },
    newNotification(state, action) {
      state.notifications = action.payload;
    },
    clearNotification(state) {
      state.notifications = null;
    },
  },
});

export const {
  selectConversation,
  clearSelected,
  setMessages,
  clearMessages,
  newMessage,
  newNotification,
  clearNotification,
} = conversationSlice.actions;

export default conversationSlice.reducer;
