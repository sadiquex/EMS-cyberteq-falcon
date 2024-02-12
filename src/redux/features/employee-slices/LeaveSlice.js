// manage leaves
import { createSlice } from "@reduxjs/toolkit";

// store the leaves to be able to access the number of leaves somewhere else

const initialState = {
  leaves: null,
};

const leavesSlice = createSlice({
  name: "leaves",
  initialState,
  reducers: {
    updateLeaves: (state, action) => {
      state.leaves = {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateLeaves } = leavesSlice.actions;
export default leavesSlice.reducer;
