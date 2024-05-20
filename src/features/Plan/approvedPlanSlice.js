// src/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../httpService/httpService";

export const fetchApprovedPlan = createAsyncThunk(
  "plan/approvedPlain",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.get("/approved-plans-admin", {
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

const approvedPlanSlice = createSlice({
  name: "plan",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApprovedPlan.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchApprovedPlan.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchApprovedPlan.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default approvedPlanSlice.reducer;
