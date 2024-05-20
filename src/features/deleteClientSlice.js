// src/features/clientSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../httpService/httpService";

export const deleteClient = createAsyncThunk(
  "client/delete",
  async (clientId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axiosInstance.delete(
        `/admin/delete-clients/${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data) {
        return rejectWithValue("Failed to delete client");
      }

      return clientId; // Returning clientId to identify which client was deleted
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "An error occurred during the deletion";
      return rejectWithValue(message);
    }
  }
);

const deleteClientSlice = createSlice({
  name: "client",
  initialState: {
    status: null,
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteClient.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default deleteClientSlice.reducer;
