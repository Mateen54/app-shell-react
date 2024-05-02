// src/features/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addClient = createAsyncThunk(
  "client/addClient",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch("https://dummyjson.com/products/1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addClientSlice = createSlice({
  name: "client",
  initialState: {
    data: {},
    status: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addClient.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addClient.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
      });
  },
});

export default addClientSlice.reducer;
