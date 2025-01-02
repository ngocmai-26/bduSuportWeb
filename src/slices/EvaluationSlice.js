import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allEvaluation: [],
  searchEvaluation: [],
  singleEvaluation: {},
  paginationEvaluation: {},
  errors: {},
  current_page: 0,
  total_page: 0,
}
const EvaluationsSlice = createSlice({
  name: 'evaluation',
  initialState: initState,
  reducers: {
    setAllEvaluation: (state, { payload }) => {
      state.allEvaluation = payload
    },
    setSearchEvaluation: (state, { payload }) => {
      state.searchEvaluation = payload
    },
    setSingleEvaluation: (state, { payload }) => {
      state.singleEvaluation = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationEvaluation: (state, { payload }) => {
      state.paginationEvaluation = payload
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
  setAllEvaluation,
  setSearchEvaluation,
  setSingleEvaluation,
  setErrors,
  setPaginationEvaluation,
  setCurrentPage,
  setTotalPage
} = EvaluationsSlice.actions

export default EvaluationsSlice.reducer
