import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the asynchronous thunk
export const fetchUsers = createAsyncThunk("employees/fetchUsers", async () => {
  try {
    const response = await axios.get(
      "https://cyberteq-falcon-api.onrender.com/api/Users"
    );
    console.log(response.data.result);
    return response.data.result;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  // Assuming employeesData is an array of users
  employees: [],
  loading: "",
  error: null, // Additional field to store any errors
};

const adminEmployeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees = [{ ...action.payload }, ...state.employees];
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees?.filter(
        (employee) => employee.id !== action.payload
      );
    },
    editEmployee: (state, action) => {
      const { id, updatedEmployeeData } = action.payload;
      const index = state.employees.findIndex((employee) => employee.id === id);

      if (index !== -1) {
        state.employees[index] = {
          ...state.employees[index],
          ...updatedEmployeeData,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.employees = [];
        state.error = action.error.message;
      });
  },
});

export const { addEmployee, deleteEmployee, editEmployee } =
  adminEmployeesSlice.actions;

// Export the asynchronous thunk
// export { fetchUsers };

export default adminEmployeesSlice.reducer;
