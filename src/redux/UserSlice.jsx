// slice to get user information (to display dashboard)

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // user details
  userDetails: {
    firstName: "new",
    lastName: "user",
    dateOfBirth: "26 th march 2002",
    gender: "",
    ghanaCardNumber: "",
    ssnitNumber: "",
    bankAccountNumber: "",
    alternatePhoneNumber: "",
    profilePicture: "",
  },
};

const userDetailsSlice = createSlice({
  name: "currentUser",
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

export const { updateUserDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
