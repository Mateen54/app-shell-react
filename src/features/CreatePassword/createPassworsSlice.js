// src/features/signup/signupSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../httpService/httpService";

export const createPassword = createAsyncThunk(
  "passowrd/createPassword",
  async ({ userData, token }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        "/user/update-password/appsells",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const { data } = response;

        return {
          userData: data,
          headers: {
            contentType: response.headers["content-type"],
            contentLength: response.headers["content-length"],
          },
        };
      } else {
        // Handle non-success responses
        throw new Error("Signup failed with status: " + response.status);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const createPasswordSlice = createSlice({
  name: "password",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.userData; // Store only user data
      })
      .addCase(createPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default createPasswordSlice.reducer;
