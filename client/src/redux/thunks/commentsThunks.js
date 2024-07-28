import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComments = createAsyncThunk('comments/fetchComments', async (adId) => {
  const response = await axios.get(`http://localhost:4500/api/comments/${adId}`);
  return response.data;
});

export const postComment = createAsyncThunk('comments/postComment', async ({ adId, text }) => {
  const response = await axios.post(`http://localhost:4500/api/comments/${adId}`, { text }, {
    headers: {
      Authentication: localStorage.getItem('token'),
    },
  });
  return response.data;
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (commentId) => {
  await axios.delete(`http://localhost:4500/api/comments/${commentId}`, {
    headers: {
      Authentication: localStorage.getItem('token')
    },
  });
  return commentId;
});
