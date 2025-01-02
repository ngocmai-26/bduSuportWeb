import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allSubject: [],
  searchSubject: [],
  singleSubject: {},
  paginationSubject: {},
  errors: {},
  status: 0,
  current_page: 0,
  total_page: 0,
}
const SubjectsSlice = createSlice({
  name: 'subject',
  initialState: initState,
  reducers: {
    setAllSubject: (state, { payload }) => {
      state.allSubject = payload
    },
    setSearchSubject: (state, { payload }) => {
      state.searchSubject = payload
    },
    setSingleSubject: (state, { payload }) => {
      state.singleSubject = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationSubject: (state, { payload }) => {
      state.paginationSubject = payload
    },
    setStatus: (state, { payload }) => {
      state.status = payload
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
  setAllSubject,
  setSearchSubject,
  setSingleSubject,
  setErrors,
  setPaginationSubject,
  setStatus,
  setCurrentPage,
  setTotalPage
} = SubjectsSlice.actions

export default SubjectsSlice.reducer
