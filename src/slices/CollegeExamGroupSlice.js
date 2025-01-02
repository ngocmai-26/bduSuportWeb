import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allCollegeExamGroups: [],
  searchCollegeExamGroups: [],
  singleCollegeExamGroups: {},
  paginationCollegeExamGroups: {},
  errors: {},
  current_page: 0,
  total_page: 0,
}
const CollegeExamGroupsSlice = createSlice({
  name: 'collegeExamGroup',
  initialState: initState,
  reducers: {
    setAllCollegeExamGroups: (state, { payload }) => {
      state.allCollegeExamGroups = payload
    },
    setSearchCollegeExamGroups: (state, { payload }) => {
      state.searchCollegeExamGroups = payload
    },
    setSingleCollegeExamGroups: (state, { payload }) => {
      state.singleCollegeExamGroups = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationCollegeExamGroups: (state, { payload }) => {
      state.paginationCollegeExamGroups = payload
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
  setAllCollegeExamGroups,
  setSearchCollegeExamGroups,
  setSingleCollegeExamGroups,
  setErrors,
  setPaginationCollegeExamGroups,
  setCurrentPage,
  setTotalPage
} = CollegeExamGroupsSlice.actions

export default CollegeExamGroupsSlice.reducer
