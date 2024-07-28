import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChats = createAsyncThunk('chat/fetchChats', async () => {
  const response = await axios.get('http://localhost:4500/api/chat', {
    headers: {
      Authentication : localStorage.getItem('token')
    }
  });
  return response.data;
});

export const deleteChat = createAsyncThunk('chat/deleteChat', async (chatId) => {
  await axios.delete(`http://localhost:4500/api/chat/${chatId}`, {
    headers: {
      Authentication : localStorage.getItem('token')
    }
  });
  return chatId;
});

export const accessChat = createAsyncThunk('chat/accessChat', async (userId) => {
  const response = await axios.post('http://localhost:4500/api/chat', { userId } , {
    headers: {
      Authentication : localStorage.getItem('token')
    }
  });
  return response.data;
});
