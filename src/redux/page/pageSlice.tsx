import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  data: any;
  error: null;
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
    fetchingSuccess: (state: InitialState, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchingFailure: (state: InitialState, action: PayloadAction<any>) => {
      state.loading = true;
      state.error = action.payload;
    },
  },
});

export const {
  fetchingStart,
  fetchingSuccess,
  fetchingFailure,
} = pageSlice.actions;

export default pageSlice.reducer;
