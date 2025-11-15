import { createSlice } from "@reduxjs/toolkit";
import { addTask, deleteTask, editTask, getTasks } from "../thunk/tasksThunk";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    filterMode: "all",
  },
  reducers: {
    setFilterMode: (state, action) => {
      state.filterMode = action.payload;
    },
    addTemp: {
      reducer: (state, action) => {
        state.tasks.push(action.payload);
      },
      prepare: (name) => ({
        payload: { name, id: Date.now(), status: false },
      }),
    },
    editTemp: (state, action) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.tasks[index] = action.payload;
    },
    deleteTemp: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload.tasks;
      })
      .addCase(getTasks.rejected, (state) => {
        state.tasks = [];
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t) => t.id === action.payload.tempId
        );
        if (index !== -1) state.tasks[index] = action.payload.task;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload.tempId);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t) => t.id === action.payload.task.id
        );
        if (index !== -1) state.tasks[index] = action.payload.task;
      })
      .addCase(editTask.rejected, (state, action) => {})
      .addCase(deleteTask.rejected, (state, action) => {
        state.tasks.push(action.payload);
      });
  },
});

export const { setFilterMode, addTemp, editTemp, deleteTemp } =
  tasksSlice.actions;
export default tasksSlice.reducer;
