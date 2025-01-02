import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allMajors: [],
  searchMajors: [],
  singleMajors: {},
  paginationMajors: {},
  errors: {},
  current_page: 0,
  total_page: 0,
}
const MajorSlice = createSlice({
  name: 'major',
  initialState: initState,
  reducers: {
    setAllMajors: (state, { payload }) => {
      state.allMajors = payload
    },
    setSearchMajors: (state, { payload }) => {
      state.searchMajors = payload
    },
    setSingleMajors: (state, { payload }) => {
      state.singleMajors = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationMajors: (state, { payload }) => {
      state.paginationMajors = payload
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
  setAllMajors,
  setSearchMajors,
  setSingleMajors,
  setErrors,
  setPaginationMajors,
  setCurrentPage,
  setTotalPage
} = MajorSlice.actions

export default MajorSlice.reducer
