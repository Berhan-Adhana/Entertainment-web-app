import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "loggedUser",
  initialState: {
    user: {
      id: "",
      name: "",
      email: "",
      accessToken: "",
      bookmarks: [],
    },
  },
  reducers: {
    updateUser: (state, action) => {
      state.user.id = action.payload.id;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.accessToken = action.payload.accessToken;
      state.user.bookmarks = action.payload.bookmarks;
    },
  },
});
export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
