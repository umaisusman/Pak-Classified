import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4500/api/ads/"; // Update this URL to match your backend

export const getAds = createAsyncThunk("ads/getAds", async () => {
  const response = await axios.get("http://localhost:4500/api/ads/");
  return response.data;
});



export const createAd = createAsyncThunk(
  'ads/createAd',
  async ({ categoryId, cityAreaId, description, image, name, price }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('categoryId', categoryId);
      formData.append('cityAreaId', cityAreaId);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('name', name);
      formData.append('price', price);

      const response = await axios.post("http://localhost:4500/api/ads", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authentication: localStorage.getItem('token')
        }
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



export const updateAd = createAsyncThunk(
  "ads/updateAd",
  async ({ id, adData }) => {
  	console.log('adData:', adData)
    const response = await axios.put(`${API_URL}/${id}`, adData, {
      headers: {
        Authentication: localStorage.getItem('token')
      }
    });
    return response.data;
  }
);

export const deleteAd = createAsyncThunk("ads/deleteAd", async (id) => {
  await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authentication: localStorage.getItem('token')
      }
    });
  return id;
});

export const fetchAd = createAsyncThunk(
  "ads/fetchAd",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4500/api/ads/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchAd = createAsyncThunk(
  "searchedAds/searchAd",
  async (searchData) => {
    try {
      const response = await axios.post(
        `http://localhost:4500/api/ads/search`,
        searchData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const likeAd = createAsyncThunk(
  "lAds/likeAd",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:4500/api/ads/like/${id}/`,
        {},
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


export const userAds = createAsyncThunk(
  "uAds/userAds",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4500/api/ads/userads",
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

export const saveAd = createAsyncThunk(
  'sAds/saveAd',
  async ({id}, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:4500/api/ads/saved/${id}/`, {},{
        headers: {
          Authentication: localStorage.getItem('token'),
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeSaveAd = createAsyncThunk(
  'sAds/removeSaveAd',
  async ({id}, { rejectWithValue }) => {
    console.log('id:', id)
    try {
      
      const response = await axios.delete(`http://localhost:4500/api/ads/removesave/${id}/`,{
        headers: {
          Authentication: localStorage.getItem('token'),
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);