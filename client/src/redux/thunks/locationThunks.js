// thunks.js
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCountries = createAsyncThunk(
  "location/fetchCountries",
  async () => {
    try {
      const response = await axios.get("http://localhost:4500/api/countries/");
      return response.data;
    } catch (error) {
      console.error("Error fetching countries:", error);
      throw error;
    }
  }
);

export const fetchProvincesByCountry = createAsyncThunk(
  "location/fetchProvincesByCountry",
  async (countryId) => {
    try {
      const response = await axios.get(
        `http://localhost:4500/api/provinces/location/?countryId=${countryId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching provinces:", error);
      throw error;
    }
  }
);

export const fetchCitiesByProvince = createAsyncThunk(
  "location/fetchCitiesByProvince",
  async (provinceId) => {
    try {
      const response = await axios.get(
        `http://localhost:4500/api/cities/location/?provinceId=${provinceId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Cities:", error);
      throw error;
    }
  }
);
export const fetchCityAreasByCity = createAsyncThunk(
  "location/fetchCityAreasByCity",
  async (cityId) => {
    try {
      const response = await axios.get(
        `http://localhost:4500/api/cityAreas/location/?cityId=${cityId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching City Areas:", error);
      throw error;
    }
  }
);
