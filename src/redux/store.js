import { configureStore } from "@reduxjs/toolkit";
import adminEmployeesReducer from "./admin-slices/adminEmployeesSlice";
// import employeeDetailsReducer from "./employee-slices/employeeDetailsSlice";
import currentUserReducer from "./UserSlice";

const store = configureStore({
  reducer: {
    employees: adminEmployeesReducer,
    currentUser: currentUserReducer,
  },
});

export default store;
