import { createSlice } from "@reduxjs/toolkit";

// const currentUser = JSON.parse(localStorage.getItem("user"));

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    email: null,
    currentUser: {},
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = {};
    },
    signupStart: (state) => {
      state.isFetching = true;
    },
    signupSuccess: (state, { payload }) => {
      state.isFetching = false;
      state.username = payload.username;
      state.email = payload.email;
    },
    signupFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  signupStart,
  signupSuccess,
  signupFailure,
} = userSlice.actions;
export default userSlice.reducer;
