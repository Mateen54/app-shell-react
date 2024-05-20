// src/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../httpService/httpService";

export const getRoles = createAsyncThunk(
  "role/getRoles",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.get("/admin/fetch-roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

const getRoleSlice = createSlice({
  name: "role",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default getRoleSlice.reducer;
