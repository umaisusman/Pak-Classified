import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMessages = createAsyncThunk('message/fetchMessages', async (chatId) => {
  const response = await axios.get(`http://localhost:4500/api/message/${chatId}`, {
    headers: {
      Authentication : localStorage.getItem('token')
    }
  });
  return response.data;
});

export const sendMessage = createAsyncThunk('message/sendMessage', async (messageData) => {
    const response = await axios.post('http://localhost:4500/api/message', messageData, {
      headers: {
        Authentication: localStorage.getItem('token')
      }
    });
    return response.data;
  });