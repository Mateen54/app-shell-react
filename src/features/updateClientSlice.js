import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../httpService/httpService";

// Async thunk for updating a client
export const updateClient = createAsyncThunk(
  "client/update",
  async ({ clientId, clientData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/admin/update-client/profile/${clientId}`,
        clientData,
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

const updateClientSlice = createSlice({
  name: "updateClient",
  initialState: {
    status: null,
    error: null,
    data: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateClient.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.data = action.payload; // Store the updated client data in state
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default updateClientSlice.reducer;
