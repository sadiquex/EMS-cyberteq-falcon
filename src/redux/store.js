import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./admin-slices/employeesSlice";
import userReducer from "./employee-slices/userDetailsSlice";

const store = configureStore({
  reducer: {
    employees: employeesReducer,
    user: userReducer,
  },
});

export default store;
