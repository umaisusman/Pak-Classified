import { createSlice } from '@reduxjs/toolkit';
import { fetchChats, deleteChat, accessChat } from '../thunks/chatThunks';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    selectedChat: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    selectChat(state, action) {
      state.selectedChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        state.chats = state.chats.filter(chat => chat._id !== action.payload);
      })
      .addCase(accessChat.fulfilled, (state, action) => {
        state.selectedChat = action.payload;
      });
  },
});

export const { selectChat } = chatSlice.actions;

export default chatSlice.reducer;
