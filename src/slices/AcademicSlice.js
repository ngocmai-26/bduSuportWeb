import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allAcademic: [],
  searchAcademic: [],
  singleAcademic: {},
  paginationAcademic: {},
  errors: {},
  current_page: 0,
  total_page: 0,
}
const AcademicsSlice = createSlice({
  name: 'academic',
  initialState: initState,
  reducers: {
    setAllAcademic: (state, { payload }) => {
      state.allAcademic = payload
    },
    setSearchAcademic: (state, { payload }) => {
      state.searchAcademic = payload
    },
    setSingleAcademic: (state, { payload }) => {
      state.singleAcademic = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationAcademic: (state, { payload }) => {
      state.paginationAcademic = payload
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
  setAllAcademic,
  setSearchAcademic,
  setSingleAcademic,
  setErrors,
  setPaginationAcademic,
  setCurrentPage,
  setTotalPage
} = AcademicsSlice.actions

export default AcademicsSlice.reducer
