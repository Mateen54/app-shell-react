// src/features/signup/signupSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../httpService/httpService";

export const addSEC = createAsyncThunk(
  "add/addSEC",
  async (SECData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axiosInstance.post(
        "/sec-class/create-sec-range/appsells",
        SECData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        const res = response;

        return {
          data: res.data,
          headers: {
            contentType: response.headers["content-type"],
            contentLength: response.headers["content-length"],
          },
        };
      } else {
        // Handle non-success responses
        throw new Error("Signup failed with status: " + response.status);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addSECSlice = createSlice({
  name: "add",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSEC.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSEC.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Store only user data
      })
      .addCase(addSEC.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default addSECSlice.reducer;
