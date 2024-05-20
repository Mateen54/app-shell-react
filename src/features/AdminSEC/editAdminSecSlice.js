import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../httpService/httpService";

// Async thunk for updating a client
export const editAdminSEC = createAsyncThunk(
  "edit/editSEC",
  async ({ idMedium, dataMedium }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/sec-class/update-sec-range/appsells/${idMedium}`,
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

const editAdminSECSlice = createSlice({
  name: "edit",
  initialState: {
    status: null,
    error: null,
    data: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(editAdminSEC.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(editAdminSEC.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.data = action.payload; // Store the updated client data in state
      })
      .addCase(editAdminSEC.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default editAdminSECSlice.reducer;
