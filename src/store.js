// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./features/signup/signupSlice";
import clientManagementSlice from "./features/ClientReducer/clientManagementSlice";
import addClientSlice from "./features/AddClient/addClientSlice";

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    clientMangement: clientManagementSlice,
    addClient: addClientSlice,
  },
});
