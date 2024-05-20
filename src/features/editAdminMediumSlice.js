import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../httpService/httpService";

// Async thunk for updating a client
export const editAdminMedium = createAsyncThunk(
  "edit/adminMedium",
  async ({ idMedium, dataMedium }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/medium/update-medium/appsells/${idMedium}`,
        dataMedium,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.data) {
        throw new Error("Failed to update medium");
      }

      return response.data; // Assuming you want to use the updated data in some way
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An error occurred during the update";
      return rejectWithValue(message);
    }
  }
);

const editAdminMediumSlice = createSlice({
  name: "edit",
  initialState: {
    status: null,
    error: null,
    data: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(editAdminMedium.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(editAdminMedium.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.data = action.payload; // Store the updated client data in state
      })
      .addCase(editAdminMedium.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default editAdminMediumSlice.reducer;
