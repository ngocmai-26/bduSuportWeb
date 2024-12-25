import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allHandbooks: [],
  searchHandbooks: [],
  singleHandbooks: {},
  paginationHandbooks: {},
  errors: {},
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
  },
})

export const {
  setAllHandbooks,
  setSearchHandbooks,
  setSingleHandbooks,
  setErrors,
  setPaginationHandbooks
} = HandbookSlice.actions

export default HandbookSlice.reducer
