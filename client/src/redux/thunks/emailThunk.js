import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sentEmail = createAsyncThunk(
    "email/sentEmail",
    async (emailData) => {
      const response = await axios.post("http://localhost:4500/api/email/send-email", emailData);
      return response.data;
    }
);
export const replyEmail = createAsyncThunk(
    "email/replyEmail",
    async (emailData) => {
      const response = await axios.post("http://localhost:4500/api/email/send-email", emailData);
      return response.data;
    }
);




