import { createSlice } from "@reduxjs/toolkit";
import { signupUser, loginUser, getMe, verifyEmail, resendVerification, getSavedAds } from "../thunks/authThunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null, // Load token from local storage
    user: null,
    status: "idle",
    error: null,
    savedAds : null,
    message:null
  },
  verifyToken: function () {
    const token = localStorage.getItem("token");
    const myData = getMe(token);
    console.log(myData);
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
      console.log(action);
      state.user = action.payload;
      localStorage.setItem("token", action.payload); // Save token to local storage
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("token"); // Remove token from local storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      }).addCase(verifyEmail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = "You are verified Successfully"

        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      }).addCase(resendVerification.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(resendVerification.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = "Otp Resend Successfully"
        state.error = null;
      })
      .addCase(resendVerification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      }).addCase(getSavedAds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSavedAds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.savedAds = action.payload;
        state.error = null

      })
      .addCase(getSavedAds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
