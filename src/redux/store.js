import { configureStore } from "@reduxjs/toolkit";
import adminEmployeesReducer from "./features/admin-slices/adminEmployeesSlice";
import userReducer from "./features/UserSlice";
import authReducer from "./features/auth/AuthSlice";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedUserData = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    employees: adminEmployeesReducer,
    user: persistedUserData,
    // auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export default store;
export const persistor = persistStore(store);
