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

const userSlice = createSlice({
  name: "user",
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

export const { updateUserDetails } = userSlice.actions;
export default userSlice.reducer;
