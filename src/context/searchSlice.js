import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "searchMovie",
  initialState: {
    results: null,
 
  },
  reducers: {
    loadSearchResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
