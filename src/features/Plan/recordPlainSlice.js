import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentRecordPlan: {},
};

export const recordPlainSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    setRecordPlan: (state, action) => {
      state.currentRecordPlan = action.payload;
    },
  },
});

export const { setRecordPlan } = recordPlainSlice.actions;

export default recordPlainSlice.reducer;
