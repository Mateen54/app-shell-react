// src/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../httpService/httpService";

export const clientMangement = createAsyncThunk(
  "clients/clientMangement",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.get("/admin/fetch-all-clients", {
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

const clientMangementSlice = createSlice({
  name: "clients",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clientMangement.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(clientMangement.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(clientMangement.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default clientMangementSlice.reducer;
