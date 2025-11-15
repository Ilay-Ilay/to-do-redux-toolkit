import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuth: false,
    user: null,
  },
  reducers: {
    login: (state, { user }) => {
      state.isAuth = true;
      state.user = user;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
