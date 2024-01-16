// manage employees - CRUD operations

import { createSlice } from "@reduxjs/toolkit";
import { employeesData } from "../../data";

const initialState = employeesData;

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      return [{ ...action.payload }, ...state];
    },
    deleteEmployee: (state, action) => {
      return state.filter((employee) => employee.id !== action.payload);
    },
    editEmployee: (state, action) => {
      const { id, updatedEmployeeData } = action.payload;
      const index = state.findIndex((employee) => employee.id === id);

      if (index !== -1) {
        state[index] = { ...state[index], ...updatedEmployeeData };
      }
    },
  },
});

export const { addEmployee, deleteEmployee, editEmployee } =
  employeesSlice.actions;

export default employeesSlice.reducer;
