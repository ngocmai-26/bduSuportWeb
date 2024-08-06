import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allCollegeExamGroups: [],
  searchCollegeExamGroups: [],
  singleCollegeExamGroups: {},
  paginationCollegeExamGroups: {},
  errors: {},
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
  },
})

export const {
  setAllCollegeExamGroups,
  setSearchCollegeExamGroups,
  setSingleCollegeExamGroups,
  setErrors,
  setPaginationCollegeExamGroups
} = CollegeExamGroupsSlice.actions

export default CollegeExamGroupsSlice.reducer
