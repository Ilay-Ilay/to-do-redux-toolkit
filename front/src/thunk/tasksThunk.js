import { createAsyncThunk } from "@reduxjs/toolkit";
import { $apiRoutes } from "../axios";
import { openMessage } from "../slice/messageSlice";

const showMessage = (dispatch, type, text) => {
  dispatch(openMessage({ messageType: type, messageText: text }));
};

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await $apiRoutes.get("/tasks");
      return { tasks: data.tasks };
    } catch {
      return rejectWithValue([]);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({ name, tempId }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await $apiRoutes.post("/tasks", { name, status: false });
      showMessage(dispatch, "success", data.message);
      return { task: data.task, tempId };
    } catch (error) {
      showMessage(dispatch, "error", error?.response?.data?.message);
      return rejectWithValue({ tempId });
    }
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ id, name, status }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await $apiRoutes.put(`/tasks/${id}`, { name, status });
      showMessage(dispatch, "success", data.message);
      return { task: data.task };
    } catch (error) {
      showMessage(dispatch, "error", error?.response?.data?.message);
      return rejectWithValue({ id });
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (task, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await $apiRoutes.delete(`/tasks/${task.id}`);
      showMessage(dispatch, "success", data.message);
    } catch (error) {
      showMessage(dispatch, "error", error?.response?.data?.message);
      return rejectWithValue(task);
    }
  }
);
