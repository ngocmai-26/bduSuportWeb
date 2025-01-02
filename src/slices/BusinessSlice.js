import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allBusiness: [],
  searchBusiness: [],
  singleBusiness: {},
  paginationBusiness: {},
  errors: {},
  current_page: 0,
  total_page: 0,
}
const BusinessesSlice = createSlice({
  name: 'business',
  initialState: initState,
  reducers: {
    setAllBusiness: (state, { payload }) => {
      state.allBusiness = payload
    },
    setSearchBusiness: (state, { payload }) => {
      state.searchBusiness = payload
    },
    setSingleBusiness: (state, { payload }) => {
      state.singleBusiness = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationBusiness: (state, { payload }) => {
      state.paginationBusiness = payload
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
  setAllBusiness,
  setSearchBusiness,
  setSingleBusiness,
  setErrors,
  setPaginationBusiness,
  setCurrentPage,
  setTotalPage
} = BusinessesSlice.actions

export default BusinessesSlice.reducer
