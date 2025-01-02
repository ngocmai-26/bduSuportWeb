import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allNews: [],
  searchNews: [],
  singleNews: {},
  paginationNews: {},
  errors: {},
  typeNews: [],
  current_page: 0,
  total_page: 0,
  current_page_type: 0,
  total_page_type: 0,
}
const NewSlice = createSlice({
  name: 'new',
  initialState: initState,
  reducers: {
    setAllNews: (state, { payload }) => {
      state.allNews = payload
    },
    setTypeNews: (state, { payload }) => {
      state.typeNews = payload
    },
    setSearchNews: (state, { payload }) => {
      state.searchNews = payload
    },
    setSingleNews: (state, { payload }) => {
      state.singleNews = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationNews: (state, { payload }) => {
      state.paginationNews = payload
    },
    setCurrentPage: (state, { payload }) => {
      state.current_page = payload
    },
    setTotalPage: (state, { payload }) => {
      state.total_page = payload
    },
    setCurrentPageType: (state, { payload }) => {
      state.current_page_type = payload
    },
    setTotalPageType: (state, { payload }) => {
      state.total_page_type = payload
    },
  },
})

export const {
  setAllNews,
  setSearchNews,
  setSingleNews,
  setErrors,
  setPaginationNews,
  setTypeNews,
  setCurrentPage,
  setTotalPage,
  setCurrentPageType,
  setTotalPageType
} = NewSlice.actions

export default NewSlice.reducer
