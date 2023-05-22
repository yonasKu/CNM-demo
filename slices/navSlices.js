import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Origin: null,
  Destination: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.Origin = action.payload;
    },
    setDestination: (state, action) => {
      state.Destination = action.payload;
    },
  },
});

export const { setOrigin, setDestination } = navSlice.actions;

// selectors
export const selectOrigin = (state) => state.nav.Origin;
export const selectDestination = (state) => state.nav.Destination;

export default navSlice.reducer;