import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { themeReducer, taskReducer } from "./index";

import storage from "redux-persist/lib/storage";
import { githubApi } from "./page/pageSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

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
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(githubApi.middleware),
});

export const persistor = persistStore(store);
