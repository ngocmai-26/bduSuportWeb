import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allFunctions: [],
  searchFunctions: [],
  singleFunctions: {},
  paginationFunctions: {},
  errors: {},
  current_page: 0,
  total_page: 0,
}
const FunctionSlice = createSlice({
  name: 'function',
  initialState: initState,
  reducers: {
    setAllFunctions: (state, { payload }) => {
      state.allFunctions = payload
    },
    setSearchFunctions: (state, { payload }) => {
      state.searchFunctions = payload
    },
    setSingleFunctions: (state, { payload }) => {
      state.singleFunctions = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationFunctions: (state, { payload }) => {
      state.paginationFunctions = payload
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
  setAllFunctions,
  setSearchFunctions,
  setSingleFunctions,
  setErrors,
  setPaginationFunctions,
  setCurrentPage,
  setTotalPage
} = FunctionSlice.actions

export default FunctionSlice.reducer
