import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  userDetails: localStorage.getItem("userDetalils")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userDetails = action.payload;
      localStorage.setItem("userDetails", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userDetails = null;
      localStorage.removeItem("userDetails");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
