// slice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchCountries, fetchProvincesByCountry , fetchCitiesByProvince , fetchCityAreasByCity } from '../thunks/locationThunks';

const initialState = {
  countries: [],
  provinces: [],
  cities:[],
  cityAreas:[],
  status:'idle'
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
      })
      .addCase(fetchProvincesByCountry.fulfilled, (state, action) => {
        state.provinces = action.payload;
      })
      .addCase(fetchCitiesByProvince.fulfilled, (state, action) => {
        state.cities = action.payload;
      })
      .addCase(fetchCityAreasByCity.fulfilled, (state, action) => {
        state.cityAreas = action.payload;
      })
  }
});

export default locationSlice.reducer;
