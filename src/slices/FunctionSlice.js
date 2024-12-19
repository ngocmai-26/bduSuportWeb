import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allFunctions: [],
  searchFunctions: [],
  singleFunctions: {},
  paginationFunctions: {},
  errors: {},
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
  },
})

export const {
  setAllFunctions,
  setSearchFunctions,
  setSingleFunctions,
  setErrors,
  setPaginationFunctions
} = FunctionSlice.actions

export default FunctionSlice.reducer
