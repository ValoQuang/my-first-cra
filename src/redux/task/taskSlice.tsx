import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Task {
  title: string;
  message: string;
  datetime: string;
  id?: string;
  weather?: string;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    handleAddTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    handleDeleteTask: (state, action: PayloadAction<string>) => {
      const mainIndex = state.tasks.findIndex(
        (task) => task.id === action.payload
      );
      if (mainIndex !== -1) {
        state.tasks.splice(mainIndex, 1);
      }
    },
  },
});

export const {
  handleAddTask,
  handleDeleteTask,
} = taskSlice.actions;
export default taskSlice.reducer;
