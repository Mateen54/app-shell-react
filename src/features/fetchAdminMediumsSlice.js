// src/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../httpService/httpService";

export const fetchAdminMedium = createAsyncThunk(
  "admin/adminMedium",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.get(
        "/medium/fetch-all-mediums-admin"
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

const fetchAdminMediumsSlice = createSlice({
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
      .addCase(fetchAdminMedium.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchAdminMedium.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdminMedium.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default fetchAdminMediumsSlice.reducer;
