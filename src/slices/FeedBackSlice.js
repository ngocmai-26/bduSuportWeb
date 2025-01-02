import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allFeedBack: [],
  searchFeedBack: [],
  singleFeedBack: {},
  paginationFeedBack: {},
  errors: {},
  current_page: 0,
  total_page: 0,
}
const FeedBacksSlice = createSlice({
  name: 'FeedBack',
  initialState: initState,
  reducers: {
    setAllFeedBack: (state, { payload }) => {
      state.allFeedBack = payload
    },
    setSearchFeedBack: (state, { payload }) => {
      state.searchFeedBack = payload
    },
    setSingleFeedBack: (state, { payload }) => {
      state.singleFeedBack = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationFeedBack: (state, { payload }) => {
      state.paginationFeedBack = payload
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
  setAllFeedBack,
  setSearchFeedBack,
  setSingleFeedBack,
  setErrors,
  setPaginationFeedBack,
  setCurrentPage,
  setTotalPage
} = FeedBacksSlice.actions

export default FeedBacksSlice.reducer
