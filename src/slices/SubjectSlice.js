import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allSubject: [],
  searchSubject: [],
  singleSubject: {},
  paginationSubject: {},
  errors: {},
  status: 0,
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
  },
})

export const {
  setAllSubject,
  setSearchSubject,
  setSingleSubject,
  setErrors,
  setPaginationSubject,
  setStatus
} = SubjectsSlice.actions

export default SubjectsSlice.reducer
