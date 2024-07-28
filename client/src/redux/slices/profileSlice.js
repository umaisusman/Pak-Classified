// src/redux/slices/profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateProfilePicture = createAsyncThunk(
  'profile/updateProfilePicture',
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:4500/api/users/updatedp', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authentication': `${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const removeProfilePicture = createAsyncThunk(
  'profile/removeProfilePicture',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:4500/api/users/removedp/',{}, {
        headers: {
          'Authentication': token,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    status: 'idle',
    error: null,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfilePicture.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeProfilePicture.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeProfilePicture.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(removeProfilePicture.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
