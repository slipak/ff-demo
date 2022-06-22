import { AlertProps } from '@mui/material';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

export type Snackbar = {
  id: string;
  title?: string;
  content: string;
  severity?: AlertProps['severity'];
};

export type SnackbarsState = Snackbar[];

const initialState: SnackbarsState = [];

export const snackbarsSlice = createSlice({
  name: "snackbars",
  initialState,
  reducers: {
    addNext: {
      reducer(state, { payload }: PayloadAction<Snackbar>) {
        state.push(payload);
      },
      prepare(payload: Omit<Snackbar, "id">) {
        return {
          payload: { ...payload, id: nanoid() },
        };
      },
    },
    removePrevious: (state) => {
      state.shift();
    },
  },
});

export const {
  addNext: showSnackbar,
  removePrevious: dismissPreviousSnackbar,
} = snackbarsSlice.actions;

export default snackbarsSlice.reducer;
