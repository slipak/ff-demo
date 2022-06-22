import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../users/types";

export type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { saveUser, logOut } = authSlice.actions;

export default authSlice.reducer;
