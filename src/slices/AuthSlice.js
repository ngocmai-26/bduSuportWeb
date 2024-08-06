import { createSlice } from "@reduxjs/toolkit";
import { loadTokenFromStorage, removeAuthRefreshFromStorage, removeTokenFromStorage } from "../services/AuthService";

const initState = {
  logged: false,
  authToken: "",
  user: {},
  account: {},
  refresh: null,
  actionStatus: '',
  isFetching: false,
  errors: {},
  errorsRegister: {}
};
const AuthSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    setErrors: (state, { payload }) => {
      state.errors = payload;
    },
    setErrorsRegister: (state, { payload }) => {
      state.errorsRegister = payload;
    },
    setAccount: (state, { payload }) => {
      state.account = payload;
    },
    setLogged: (state, { payload }) => {
      state.logged = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setActionStatus: (state, { payload }) => {
      state.actionStatus = payload;
    },
    setRefresh: (state, { payload }) => {
      state.refresh = { fresh: !state.refresh, uri: payload };
    },
    setAuthFetching: (state, { payload }) => {
      state.isFetching = payload;
    },
    setEmailAuth: (state, { payload }) => {
      state.email = payload;
    },
    loadUser: (state) => {
      const token = loadTokenFromStorage()
      if (token) {
        state.authToken = token;
        state.logged = true;
      } else {
        state = initState;
      }
    },
    logout: (state) => {
      removeAuthRefreshFromStorage()
      removeTokenFromStorage()
      state = initState;
      window.location.assign(window.location.href);
    },
  },
});

export const {
  setLogged,
  loadUser,
  logout,
  setRefresh,
  setActionStatus,
  setUser,
  setEmailAuth,
  setErrors,
  setAuthFetching,
  setErrorsRegister,
  setAccount
} = AuthSlice.actions;

export default AuthSlice.reducer;
