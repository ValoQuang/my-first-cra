import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { themeReducer, taskReducer } from "./index";

import storage from "redux-persist/lib/storage";
import { githubApi } from "./page/githubSlice";
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
import { getAchievementDataApi } from "./page/achievementApi";

export type StoreState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  theme: themeReducer,
  task: taskReducer,
  [githubApi.reducerPath]: githubApi.reducer,
  [getAchievementDataApi.reducerPath]: getAchievementDataApi.reducer,
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
    }).concat(githubApi.middleware).concat(getAchievementDataApi.middleware),
});

export const persistor = persistStore(store);
