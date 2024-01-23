import { configureStore } from "@reduxjs/toolkit";
import adminEmployeesReducer from "../features/admin-slices/adminEmployeesSlice";
import userReducer from "../features/UserSlice";
import authReducer from "../features/auth/AuthSlice";

const store = configureStore({
  reducer: {
    employees: adminEmployeesReducer,
    user: userReducer,
  },
});

export default store;
