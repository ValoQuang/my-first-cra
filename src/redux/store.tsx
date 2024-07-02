import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { themeReducer, taskReducer } from "./index";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { githubApi } from "./page/pageSlice";

export type StoreState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  theme: themeReducer,
  task: taskReducer,
  [githubApi.reducerPath]: githubApi.reducer,
});
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["theme", "task"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});

export const persistor = persistStore(store);
