// src/features/clientSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../httpService/httpService";

export const rejectBriefApi = createAsyncThunk(
  "brief/approvedBrief",
  async ({ brief_id, reason }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/reject-brief-admin-appsells/${brief_id}`,
        { reason },
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

const rejectBriefSlice = createSlice({
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
      .addCase(rejectBriefApi.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(rejectBriefApi.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(rejectBriefApi.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { resetStatus } = rejectBriefSlice.actions;
export default rejectBriefSlice.reducer;
