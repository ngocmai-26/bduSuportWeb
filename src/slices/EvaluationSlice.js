import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allEvaluation: [],
  searchEvaluation: [],
  singleEvaluation: {},
  paginationEvaluation: {},
  errors: {},
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
  },
})

export const {
  setAllEvaluation,
  setSearchEvaluation,
  setSingleEvaluation,
  setErrors,
  setPaginationEvaluation
} = EvaluationsSlice.actions

export default EvaluationsSlice.reducer
