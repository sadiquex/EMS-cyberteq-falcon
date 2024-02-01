// slice to get user information (to display dashboard)

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
  // otherDetails: null,
};

const userDetailsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      state.userDetails = {
        ...state.userDetails,
        ...action.payload,
      };
    },
    logOut: (state) => {
      localStorage.removeItem("token");
      state.userDetails = null;
    },
  },
});

export const { updateUserDetails, logOut } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
