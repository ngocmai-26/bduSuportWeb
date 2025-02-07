import { createSlice } from "@reduxjs/toolkit";
import { loadTokenFromStorage, removeAuthRefreshFromStorage, removeInfo, removeTokenFromStorage } from "../services/AuthService";

const initState = {
  logged: false,
  authToken: "",
  user: {},
  account: {},
  refresh: null,
  actionStatus: '',
  isFetching: false,
  errors: {},
  errorsRegister: {}, 
  audit: [],
  current_page: 0,
  total_page: 0,
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
    setAuditAuth: (state, { payload }) => {
      state.audit = payload;
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
      console.log("Tới đây luôn nè")
      removeAuthRefreshFromStorage()
      removeTokenFromStorage()
      removeInfo()
      state = initState;
      window.location.assign('/bdu-support');
    },
    setCurrentPage: (state, { payload }) => {
      state.current_page = payload
    },
    setTotalPage: (state, { payload }) => {
      state.total_page = payload
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
  setAccount,
  setAuditAuth,
  setCurrentPage,
  setTotalPage
} = AuthSlice.actions;

export default AuthSlice.reducer;
