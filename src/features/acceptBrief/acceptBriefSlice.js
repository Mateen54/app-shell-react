// src/features/clientSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../httpService/httpService";

export const approvedBriefApi = createAsyncThunk(
  "brief/approvedBrief",
  async (brief_id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/accept-brief-admin-appsells/${brief_id}`,
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

      return brief_id; // Returning clientId to identify which client was deleted
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "An error occurred during the deletion";
      return rejectWithValue(message);
    }
  }
);

const acceptBriefSlice = createSlice({
  name: "brief",
  initialState: {
    status: null,
    error: null,
    loading: false,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(approvedBriefApi.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(approvedBriefApi.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(approvedBriefApi.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { resetStatus } = acceptBriefSlice.actions;
export default acceptBriefSlice.reducer;
