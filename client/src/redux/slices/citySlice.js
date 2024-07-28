import { createSlice } from "@reduxjs/toolkit";
import { getCities } from "../thunks/cityThunks";

const citySlice = createSlice({
  name: "cities",
  initialState: {
    cities: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cities = action.payload;
      })
      .addCase(getCities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default citySlice.reducer;
