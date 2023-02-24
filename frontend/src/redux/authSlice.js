import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedIn: localStorage.getItem("token") !== null || false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const signupThunk =
  ({ email, password, name }) =>
  async () => {
    let response = await axios.post(`http://localhost:8080/auth/signup`, {
      email,
      password,
      name,
    });
    console.log(response)
  };

export const loginThunk =
  ({ email, password }) =>
  async (dispatch) => {
    let response = await axios.post(`http://localhost:8080/auth/login`, {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    dispatch(login());
  };

export const logoutThunk = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch(logout());
};

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
