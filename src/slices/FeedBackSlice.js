import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allFeedBack: [],
  searchFeedBack: [],
  singleFeedBack: {},
  paginationFeedBack: {},
  errors: {}
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
  },
})

export const {
  setAllFeedBack,
  setSearchFeedBack,
  setSingleFeedBack,
  setErrors,
  setPaginationFeedBack
} = FeedBacksSlice.actions

export default FeedBacksSlice.reducer
