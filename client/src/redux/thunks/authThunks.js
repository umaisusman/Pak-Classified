import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4500/api/users/register",
        userData
      );
      if (
        response.statusText === "OK" ||
        response.ok ||
        response.status == 201
      ) {
        localStorage.setItem("token", response.data.token);
        return response.data;
      }else{
        throw new Error("failed to signup")
      }
     
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4500/api/users/login",
        loginData
      );
      if (
        response.statusText === "OK" ||
        response.ok ||
        response.status == 200
      ) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getMe = createAsyncThunk(
  "user/getMe",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4500/api/users/getme",
        {
          headers: {
            Authentication: `${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ otp, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4500/api/users/verify",
        { otp },
        {
          headers: {
            Authentication: `${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resendVerification = createAsyncThunk(
  "auth/resendOtp",
  async () => {
    const response = await axios.post("http://localhost:4500/api/users/resendotp",{}, {
      headers: {
        Authentication: localStorage.getItem('token'),
      },
    });
    return response.data;
  } 
);


export const getSavedAds = createAsyncThunk(
  "user/getSavedAds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4500/api/users/getsaved",
        {
          headers: {
            Authentication: localStorage.getItem('token'),
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


