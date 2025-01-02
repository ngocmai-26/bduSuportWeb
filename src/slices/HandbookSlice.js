import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allHandbooks: [],
  searchHandbooks: [],
  singleHandbooks: {},
  paginationHandbooks: {},
  errors: {},
  current_page: 0,
  total_page: 0,
}
const HandbookSlice = createSlice({
  name: 'Handbook',
  initialState: initState,
  reducers: {
    setAllHandbooks: (state, { payload }) => {
      state.allHandbooks = payload
    },
    setSearchHandbooks: (state, { payload }) => {
      state.searchHandbooks = payload
    },
    setSingleHandbooks: (state, { payload }) => {
      state.singleHandbooks = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationHandbooks: (state, { payload }) => {
      state.paginationHandbooks = payload
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
  setAllHandbooks,
  setSearchHandbooks,
  setSingleHandbooks,
  setErrors,
  setPaginationHandbooks,
  setCurrentPage,
  setTotalPage
} = HandbookSlice.actions

export default HandbookSlice.reducer
