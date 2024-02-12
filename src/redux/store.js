import { configureStore } from "@reduxjs/toolkit";
import adminEmployeesReducer from "./features/admin-slices/adminEmployeesSlice";
import userReducer from "./features/UserSlice";
import leaveReducer from "./features/employee-slices/LeaveSlice";
import authReducer from "./features/auth/AuthSlice";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

// data to persist in storage
const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedUserData = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    employees: adminEmployeesReducer,
    user: persistedUserData,
    // leaves: leaveReducer,
    // auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // to prevent redux serialize errors
    }),
  devTools: true, // to allow use redux UI
});

export default store;
export const persistor = persistStore(store);
