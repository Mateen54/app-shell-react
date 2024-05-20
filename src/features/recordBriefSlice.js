import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentRecord: {},
};

export const recordBriefSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    setRecord: (state, action) => {
      state.currentRecord = action.payload;
    },
  },
});

export const { setRecord } = recordBriefSlice.actions;

export default recordBriefSlice.reducer;
