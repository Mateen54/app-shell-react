import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../httpService/httpService";

// Async thunk for updating a client
export const deleteAdminSEC = createAsyncThunk(
  "delete/adminSEC",
  async (mediumId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/sec-class/delete-sec-range/${mediumId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.data) {
        return rejectWithValue("Failed to update client");
      }

      return response.data; // You might want to return the full response data
    } catch (error) {
      const message =
        error.response?.data?.message || "An error occurred during the update";
      return rejectWithValue(message);
    }
  }
);

const deleteSECSlice = createSlice({
  name: "delete",
  initialState: {
    status: null,
    error: null,

    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteAdminSEC.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(deleteAdminSEC.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(deleteAdminSEC.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default deleteSECSlice.reducer;
