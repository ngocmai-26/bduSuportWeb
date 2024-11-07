import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allAccount: [],
  searchAccount: [],
  singleAccount: {},
  paginationAccount: {},
  errors: {},
  email: ''
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
  },
})

export const {
  setAllAccount,
  setSearchAccount,
  setSingleAccount,
  setErrors,
  setPaginationAccount,
  setEmail
} = AccountsSlice.actions

export default AccountsSlice.reducer
