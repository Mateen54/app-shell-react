// src/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../httpService/httpService";

export const fetchAdminSEC = createAsyncThunk(
  "admin/adminSEC",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.get(
        "/sec-class/fetch-all-sec-range-admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data || response.status !== 200) {
        throw new Error("Failed to fetch clients");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.message || "An error occurred while fetching clients"
      );
    }
  }
);

const fetchAdminSECSlice = createSlice({
  name: "admin",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminSEC.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchAdminSEC.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdminSEC.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default fetchAdminSECSlice.reducer;
