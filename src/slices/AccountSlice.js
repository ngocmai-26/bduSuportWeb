import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allAccount: [],
  searchAccount: [],
  singleAccount: {},
  paginationAccount: {},
  errors: {},
  email: '',
  current_page: 0,
  total_page: 0,
}
const AccountsSlice = createSlice({
  name: 'account',
  initialState: initState,
  reducers: {
    setAllAccount: (state, { payload }) => {
      state.allAccount = payload
    },
    setSearchAccount: (state, { payload }) => {
      state.searchAccount = payload
    },
    setSingleAccount: (state, { payload }) => {
      state.singleAccount = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationAccount: (state, { payload }) => {
      state.paginationAccount = payload
    },
    setEmail: (state, { payload }) => {
      state.email = payload
    },
    setCurrentPage: (state, { payload }) => {
      state.current_page = payload
    },
    setTotalPage: (state, { payload }) => {
      state.total_page = payload
    },
  },
})

export const {
  setAllAccount,
  setSearchAccount,
  setSingleAccount,
  setErrors,
  setPaginationAccount,
  setEmail,
  setCurrentPage,
  setTotalPage
} = AccountsSlice.actions

export default AccountsSlice.reducer
