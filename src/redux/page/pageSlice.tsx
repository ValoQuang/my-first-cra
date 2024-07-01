import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  avatar_url?: string;
  name?: string | null;
  company?: string | null;
  email?: string | null;
  bio: string | null;
  public_repos: number;
}

type InitialState = {
  data: UserData | null;
  error: string | null;
  loading: boolean;
};

const initialState: InitialState = {
  data: null,
  error: null,
  loading: false,
};

const pageSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchingStart: (state: { loading: boolean }) => {
      state.loading = true;
    },
    fetchingSuccess: (state: InitialState, action: PayloadAction<UserData>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchingFailure: (state: InitialState, action: PayloadAction<string | null>) => {
      state.loading = true;
      state.error = action.payload;
    },
  },
});

export const { fetchingStart, fetchingSuccess, fetchingFailure } =
  pageSlice.actions;

export default pageSlice.reducer;
