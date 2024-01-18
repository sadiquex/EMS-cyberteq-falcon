import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // user details
  userDetails: {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    ghanaCardNumber: "",
    ssnitNumber: "",
    bankAccountNumber: "",
    alternatePhoneNumber: "",
    profilePicture: "",
  },
};

const employeeDetailsSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      state.userDetails = {
        ...state.userDetails,
        ...action.payload,
      };
    },
  },
});

export const { updateUserDetails } = employeeDetailsSlice.actions;
export default employeeDetailsSlice.reducer;
