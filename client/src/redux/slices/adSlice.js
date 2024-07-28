import { createSlice } from "@reduxjs/toolkit";
import {
  getAds,
  createAd,
  updateAd,
  deleteAd,
  fetchAd,
  searchAd,
  likeAd,
  userAds,
  saveAd,
  removeSaveAd
} from "../thunks/adThunks";

const adSlice = createSlice({
  name: "ads",
  initialState: {
    ads: [],
    userAds: [],
    categoryAds: [],
    searchedAds: [],
    uAds: null,
    lAds:[],
    sAds:[],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all ads
      .addCase(getAds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ads = action.payload;
      })
      .addCase(getAds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
    
      // Get user ads
      
      // Create ad
      .addCase(createAd.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAd.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ads.push(action.payload);
      })
      .addCase(createAd.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Update ad
      .addCase(updateAd.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAd.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.ads.findIndex((ad) => ad.id === action.payload.id);
        if (index !== -1) {
          state.ads[index] = action.payload;
        }
      })
      .addCase(updateAd.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Delete ad
      .addCase(deleteAd.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAd.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ads = state.ads.filter((ad) => ad.id !== action.payload);
      })
      .addCase(deleteAd.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAd.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAd.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ad = action.payload;
      })
      .addCase(fetchAd.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(searchAd.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchAd.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchedAds = action.payload;
      })
      .addCase(searchAd.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      }).addCase(likeAd.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(likeAd.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.ads.findIndex((ad) => ad._id === action.meta.arg.id);
        if (index !== -1) {
          state.ads[index].likes = action.payload;
        }
      })
      .addCase(likeAd.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(userAds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userAds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.uAds = action.payload
        state.error = null;

      })
      .addCase(userAds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(saveAd.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveAd.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.ads.findIndex((ad) => ad._id === action.meta.arg.id);
        if (index !== -1) {
          state.ads[index].saved = action.payload;
        }
      })
      .addCase(saveAd.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      }) .addCase(removeSaveAd.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeSaveAd.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.ads.findIndex((ad) => ad._id === action.meta.arg.id);
        if (index !== -1) {
          state.ads[index].saved = action.payload;
        }
      })
      .addCase(removeSaveAd.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export default adSlice.reducer;
