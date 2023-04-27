import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum userType {
  SENDER = "SENDER",
  BIKER = "BIKER",
}

export interface User {
  id: number;
  name: string;
  email: string;
  type: userType;
}

type AuthState = {
  user: User | null;
  accessToken: string | null;
};

const slice = createSlice({
  name: "auth",
  initialState: { user: null, accessToken: null } as AuthState,
  reducers: {
    setToken: (
      state,
      { payload: { accessToken } }: PayloadAction<{ accessToken: string }>
    ) => {
      state.accessToken = accessToken;
    },
    setUser: (state, { payload: { user } }: PayloadAction<{ user: User }>) => {
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setToken, setUser, logout } = slice.actions;
export default slice.reducer;
