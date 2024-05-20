// src/features/signup/signupSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../httpService/httpService";
export const signInUser = createAsyncThunk(
  "signIn/signInUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/user/login/user-appsell",
        userData
      );
      if (response.status === 200) {
        // Assuming 'data' is the part of the response you need
        const { data } = response;
        // Optionally, store specific data elements if not all data is needed
        return {
          userData: data, // or specific fields like data.user, data.token, etc.
          headers: {
            // Only store serializable parts of the headers if necessary
            contentType: response.headers["content-type"],
            contentLength: response.headers["content-length"],
          },
        };
      } else {
        // Handle non-success responses
        throw new Error("Signup failed with status: " + response.status);
      }
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.userData;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { clearError } = signInSlice.actions;
export default signInSlice.reducer;
