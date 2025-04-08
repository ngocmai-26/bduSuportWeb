import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allInfoStudent: [],
  searchInfoStudent: [],
  singleInfoStudent: {},
  paginationInfoStudent: {},
  errors: {},
  current_page: 0,
  total_page: 0,
}
const InfoStudentsSlice = createSlice({
  name: 'InfoStudent',
  initialState: initState,
  reducers: {
    setAllInfoStudent: (state, { payload }) => {
      state.allInfoStudent = payload
    },
    setSearchInfoStudent: (state, { payload }) => {
      state.searchInfoStudent = payload
    },
    setSingleInfoStudent: (state, { payload }) => {
      state.singleInfoStudent = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationInfoStudent: (state, { payload }) => {
      state.paginationInfoStudent = payload
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
  setAllInfoStudent,
  setSearchInfoStudent,
  setSingleInfoStudent,
  setErrors,
  setPaginationInfoStudent,
  setCurrentPage,
  setTotalPage
} = InfoStudentsSlice.actions

export default InfoStudentsSlice.reducer
