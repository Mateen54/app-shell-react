// src/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const clientMangement = createAsyncThunk(
  "clients/clientMangement",
  async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return [
      {
        key: "1",
        srf: "01",
        clientName: "Lorem Ipsum Condor",
        companyName: "Lorem Ipsum Condor",
        createdAt: "01/11/23",
        noOfBriefs: 25,
        noOfCampaigns: 25,
        action: "View details",
      },
      {
        key: "2",
        srf: "02",
        clientName: "Lorem Ipsum Condor",
        companyName: "Lorem Ipsum Condor",
        createdAt: "01/11/23",
        noOfBriefs: 25,
        noOfCampaigns: 25,
        action: "View details",
      },
      {
        key: "3",
        srf: "03",
        clientName: "Lorem Ipsum Condor",
        companyName: "Lorem Ipsum Condor",
        createdAt: "01/11/23",
        noOfBriefs: 25,
        noOfCampaigns: 25,
        action: "View details",
      },
      {
        key: "4",
        srf: "04",
        clientName: "Lorem Ipsum Condor",
        companyName: "Lorem Ipsum Condor",
        createdAt: "01/11/23",
        noOfBriefs: 25,
        noOfCampaigns: 25,
        action: "View details",
      },
      {
        key: "5",
        srf: "05",
        clientName: "Lorem Ipsum Condor",
        companyName: "Lorem Ipsum Condor",
        createdAt: "01/11/23",
        noOfBriefs: 25,
        noOfCampaigns: 25,
        action: "View details",
      },
      {
        key: "6",
        srf: "06",
        clientName: "Lorem Ipsum Condor",
        companyName: "Lorem Ipsum Condor",
        createdAt: "01/11/23",
        noOfBriefs: 25,
        noOfCampaigns: 25,
        action: "View details",
      },
      {
        key: "7",
        srf: "07",
        clientName: "Lorem Ipsum Condor",
        companyName: "Lorem Ipsum Condor",
        createdAt: "01/11/23",
        noOfBriefs: 25,
        noOfCampaigns: 25,
        action: "View details",
      },
      {
        key: "8",
        srf: "08",
        clientName: "Lorem Ipsum Condor",
        companyName: "Lorem Ipsum Condor",
        createdAt: "01/11/23",
        noOfBriefs: 25,
        noOfCampaigns: 25,
        action: "View details",
      },
      {
        key: "9",
        srf: "09",
        clientName: "Lorem Ipsum Condor",
        companyName: "Lorem Ipsum Condor",
        createdAt: "01/11/23",
        noOfBriefs: 25,
        noOfCampaigns: 25,
        action: "View details",
      },
      {
        key: "10",
        srf: "10",
        clientName: "Lorem Ipsum Condor",
        companyName: "Lorem Ipsum Condor",
        createdAt: "01/11/23",
        noOfBriefs: 25,
        noOfCampaigns: 25,
        action: "View details",
      },
    ];
  }
);

const clientMangementSlice = createSlice({
  name: "clients",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clientMangement.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(clientMangement.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(clientMangement.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default clientMangementSlice.reducer;
