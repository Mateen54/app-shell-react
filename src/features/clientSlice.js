import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../httpService/httpService";

// Thunk for registering a client
export const registerClient = createAsyncThunk(
  "client/register",
  async (formDataPic, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.post(
        "/client/register",
        formDataPic,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data) {
        return rejectWithValue("Failed to register client");
      }

      return response.data; // Ensure this data is serializable
    } catch (error) {
      // Axios errors contain the response object in error.response
      const message =
        error.response?.data?.message ||
        "An error occurred during registration";
      return rejectWithValue(message);
    }
  }
);

const clientSlice = createSlice({
  name: "client",
  initialState: {
    registrationData: {},
    status: null,
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerClient.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null; // Reset error on new request
      })
      .addCase(registerClient.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.registrationData = action.payload; // Assuming action.payload is serializable
      })
      .addCase(registerClient.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload; // Assuming action.payload is a string or serializable
      });
  },
});

export default clientSlice.reducer;
