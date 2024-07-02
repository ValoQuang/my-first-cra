import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Task {
  title: string;
  message: string;
  datetime: string;
  id?: string;
}

interface TaskState {
  tasks: Task[];
  searchResult: Task[];
}

const initialState: TaskState = {
  tasks: [],
  searchResult: [],
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
      const searchIndex = state.searchResult.findIndex(
        (task) => task.id === action.payload
      );
      if (mainIndex !== -1) {
        state.tasks.splice(mainIndex, 1);
      }
      if (searchIndex !== -1) {
        state.searchResult.splice(searchIndex, 1);
      }
    },
    handleSortTask: (state, action: PayloadAction<"asc" | "desc">) => {
      const { payload: sortOrder } = action;
      state.tasks.sort((a, b) => {
        const dateA = new Date(a.datetime).getTime();
        const dateB = new Date(b.datetime).getTime();
        if (sortOrder === "asc") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });
    },

    handleSearchTask: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.trim().toLowerCase(); // Convert to lowercase and trim whitespace
      state.searchResult = state.tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm)
      );
    },
    handleClearSearchResult: (state) => {
      state.searchResult = [];
    },
    handleEditTask: (
      state,
      action: PayloadAction<{ title: string; updatedTask: Partial<Task> }>
    ) => {
      const { title, updatedTask } = action.payload;
      const task = state.tasks.find((task) => task.title === title);
      if (task) {
        Object.assign(task, updatedTask);
      }
    },
  },
});

export const {
  handleAddTask,
  handleEditTask,
  handleSortTask,
  handleClearSearchResult,
  handleSearchTask,
  handleDeleteTask,
} = taskSlice.actions;
export default taskSlice.reducer;
