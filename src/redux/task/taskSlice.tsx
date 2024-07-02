import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Task {
  name: string;
  email: string;
  message: string;
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
      prepare: ({name, email, message}: Task) => ({
        payload: {
          name,
          email,
          message,
        },
      }),
    },
    handleDeleteTask: (state, action: PayloadAction<string>) => {
      //state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
   
  },
});

export const { handleAddTask, handleDeleteTask } = taskSlice.actions;
export default taskSlice.reducer;
