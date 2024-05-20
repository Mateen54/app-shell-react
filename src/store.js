import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import signupReducer from "./features/signup/signupSlice";
import clientManagementSlice from "./features/ClientReducer/clientManagementSlice";

import signInSlice from "./features/SignIn/signInSlice";
import createPassworsSlice from "./features/CreatePassword/createPassworsSlice";
import clientSlice from "./features/clientSlice";
import deleteClientSlice from "./features/deleteClientSlice";
import updateClientSlice from "./features/updateClientSlice";
import getUserSlice from "./features/getUserSlice";
import createUserSlice from "./features/createUserSlice";
import getRolesSlice from "./features/getRolesSlice";
import deleteUserSlice from "./features/deleteUserSlice";
import editUserSlice from "./features/editUserSlice";
import fetchAdminMediumsSlice from "./features/fetchAdminMediumsSlice";
import editAdminMediumSlice from "./features/editAdminMediumSlice";
import addMediumSlice from "./features/AdminMediums/addMediumSlice";
import deleteAdminMediumSlice from "./features/AdminMediums/deleteAdminMediumSlice";
import fetchAdminSECSlice from "./features/AdminSEC/fetchAdminSECSlice";
import addAdminSECSlice from "./features/AdminSEC/addAdminSECSlice";
import fetchAdminCitiesSlice from "./features/Cities/fetchAdminCitiesSlice";
import editAdminSecSlice from "./features/AdminSEC/editAdminSecSlice";
import deleteSECSlice from "./features/AdminSEC/deleteSECSlice";
import editAdminCitySlice from "./features/Cities/editAdminCitySlice";
import addAdminCitySlice from "./features/Cities/addAdminCitySlice";
import deleteAdminCitySlice from "./features/Cities/deleteAdminCitySlice";

import fetchPendingBriefSlice from "./features/fetchPendingBrief/fetchPendingBriefSlice";

import fetchApprovedBriefSlice from "./features/fetchApprovedBreif/fetchApprovedBriefSlice";

import recordBriefSlice from "./features/recordBriefSlice";

import acceptBriefSlice from "./features/acceptBrief/acceptBriefSlice";

import rejectBriefSlice from "./features/rejectBreif/rejectBriefSlice";

import approvedPlanSlice from "./features/Plan/approvedPlanSlice";

import recordPlainSlice from "./features/Plan/recordPlainSlice";

import lostPlainSlice from "./features/Plan/lostPlainSlice";

import fetchPOSlice from "./features/Plan/fetchPOSlice";

import approvedPOSlice from "./features/Plan/approvedPOSlice";

import fetchCampaignSlice from "./features/Campaign/fetchCampaignSlice";

import selectedCampaignSlice from "./features/Campaign/selectedCampaignSlice";

const rootReducer = combineReducers({
  signup: signupReducer,
  clientMangement: clientManagementSlice,
  signIn: signInSlice,
  createPassword: createPassworsSlice,
  createClient: clientSlice,
  deleteClient: deleteClientSlice,
  updateClient: updateClientSlice,
  getUser: getUserSlice,
  createUser: createUserSlice,
  getRoles: getRolesSlice,
  deleteUser: deleteUserSlice,
  editUser: editUserSlice,
  adminMedium: fetchAdminMediumsSlice,
  editMedium: editAdminMediumSlice,
  addMedium: addMediumSlice,
  deleteMedium: deleteAdminMediumSlice,
  fetchCity: fetchAdminCitiesSlice,
  editCity: editAdminCitySlice,
  addCity: addAdminCitySlice,
  deleteCity: deleteAdminCitySlice,
  fetchSEC: fetchAdminSECSlice,
  addSEC: addAdminSECSlice,
  editSec: editAdminSecSlice,
  deleteSec: deleteSECSlice,
  pendingBreif: fetchPendingBriefSlice,
  approvedBrief: fetchApprovedBriefSlice,
  selectedBrief: recordBriefSlice,
  acceptBrief: acceptBriefSlice,
  rejectBrief: rejectBriefSlice,
  approvedPlan: approvedPlanSlice,
  selectedPlan: recordPlainSlice,
  lostPlan: lostPlainSlice,
  fetchPO: fetchPOSlice,
  approvedPO: approvedPOSlice,
  fetchCampaign: fetchCampaignSlice,
  selectedCampaign: selectedCampaignSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["selectedBrief", "selectedPlan", "fetchPO", "selectedCampaign"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
