// slice.js
import { createSlice } from "@reduxjs/toolkit";
import { replyEmail, sentEmail } from "../thunks/emailThunk";

const initialState = {
  email: null,
  status: "idle",
  error: null,
  replyEmail:null
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    clearEmail(state) {
        state.email = null;
        state.status = "idle";
        state.error = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sentEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sentEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.email = action.payload;
      })
      .addCase(sentEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(replyEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(replyEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.replyEmail = action.payload;
      })
      .addCase(replyEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {clearEmail } = emailSlice.actions;


export default emailSlice.reducer;
