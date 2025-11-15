import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout } from "../slice/userSlice";
import { $authRoutes } from "../axios";
import { openMessage } from "../slice/messageSlice";

export const me = createAsyncThunk(
  "me",
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) dispatch(logout());

    try {
      const { data } = await $authRoutes.get("/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(login({ user: data.user }));
    } catch (error) {
      dispatch(logout());
    }
  }
);

export const authorization = createAsyncThunk(
  "authorization",
  async ({ email, password, isRegistration }, { dispatch }) => {
    try {
      const { data } = await $authRoutes.post(
        `/${isRegistration ? "register" : "login"}`,
        { email, password }
      );
      localStorage.setItem("token", data.token);
      dispatch(login({ user: data.user }));
      dispatch(
        openMessage({ messageType: "success", messageText: data.message })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        openMessage({
          messageType: "error",
          messageText: error?.response?.data?.message || error.message,
        })
      );
    }
  }
);
