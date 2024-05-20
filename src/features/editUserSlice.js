import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../httpService/httpService";

// Async thunk for updating a client
export const editUser = createAsyncThunk(
  "user/update",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/user/update/appsell/${userId}`,
        userData,
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

const editUserSlice = createSlice({
  name: "user",
  initialState: {
    status: null,
    error: null,
    data: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.data = action.payload; // Store the updated client data in state
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default editUserSlice.reducer;
