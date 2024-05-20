// src/features/clientSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../httpService/httpService";

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (clientId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/user/delete-appsells/${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
  name: "user",
  initialState: {
    status: null,
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default deleteClientSlice.reducer;
