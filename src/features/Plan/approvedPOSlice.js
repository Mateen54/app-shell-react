// src/features/clientSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../httpService/httpService";

export const approvedPO = createAsyncThunk(
  "po/approvedPO",
  async (poID, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/accept-pay-order/admin/appsell/${poID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.data) {
        return rejectWithValue("Failed to delete client");
      }

      return poID; // Returning clientId to identify which client was deleted
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "An error occurred during the deletion";
      return rejectWithValue(message);
    }
  }
);

const approedPOSlice = createSlice({
  name: "po",
  initialState: {
    status: null,
    error: null,
    loading: false,
  },
  reducers: {
    resetStatusPO: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(approvedPO.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(approvedPO.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(approvedPO.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { resetStatusPO } = approedPOSlice.actions;
export default approedPOSlice.reducer;
