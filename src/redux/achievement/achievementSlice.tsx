import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AchievementType {
  title: string;
  message: string;
  datetime: string;
  id?: string;
  humidity?: string;
  temperature?: string;
}

interface AchievementState {
  tasks: AchievementType[];
}

const initialState: AchievementState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    handleAddTask: (state, action: PayloadAction<AchievementType>) => {
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
    handleEditTask: (state, action: PayloadAction<AchievementType>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload,
        };
      }
    },
  },
});

export const {
  handleAddTask,
  handleDeleteTask,
  handleEditTask
} = taskSlice.actions;
export default taskSlice.reducer;
