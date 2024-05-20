// src/features/clientSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../httpService/httpService";

export const fetchPO = createAsyncThunk(
  "PO/fetchPO",
  async (poID, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/fetch-all-pay-orders-/brief/appsells/${poID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.data) {
        return rejectWithValue("Failed to delete client");
      }

      return response.data; // Returning clientId to identify which client was deleted
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "An error occurred during the deletion";
      return rejectWithValue(message);
    }
  }
);

const fetchPOSlice = createSlice({
  name: "PO",
  initialState: {
    status: null,
    error: null,
    loading: false,
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPO.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchPO.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPO.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default fetchPOSlice.reducer;
