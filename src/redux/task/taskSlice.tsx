import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Task {
  title: string;
  message: string;
  date: string; 
  time: string;
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
    handleAddTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      },
      prepare: ({ title, message, date, time }: Task) => ({
        payload: {
          title,
          message,
          date,
          time,
        },
      }),
    },
    handleDeleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.title !== action.payload);
    },
  },
});

export const { handleAddTask, handleDeleteTask } = taskSlice.actions;
export default taskSlice.reducer;
