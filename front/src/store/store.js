import { configureStore } from "@reduxjs/toolkit";
import user from "../slice/userSlice";
import tasks from "../slice/tasksSlice";
import message from "../slice/messageSlice";
import modal from "../slice/modalSlice";

const store = configureStore({
  reducer: {
    user,
    tasks,
    message,
    modal,
  },
});

export default store;
