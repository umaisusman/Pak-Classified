import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCities = createAsyncThunk(
    "cities/getCities",
    async () => {
      const response = await axios.get("http://localhost:4500/api/cities");
      return response.data;
    }
);
