// campaignSlice.js
import { createSlice } from "@reduxjs/toolkit";

const selectedCampaignSlice = createSlice({
  name: "campaign",
  initialState: {
    selectedCampaign: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCampaign: (state, action) => {
      state.selectedCampaign = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSelectedCampaign, setLoading, setError } =
  selectedCampaignSlice.actions;

export default selectedCampaignSlice.reducer;
