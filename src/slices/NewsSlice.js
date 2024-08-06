import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allNews: [],
  searchNews: [],
  singleNews: {},
  paginationNews: {},
  errors: {},
  typeNews: [],
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
  },
})

export const {
  setAllNews,
  setSearchNews,
  setSingleNews,
  setErrors,
  setPaginationNews,
  setTypeNews
} = NewSlice.actions

export default NewSlice.reducer
