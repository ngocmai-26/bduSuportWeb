import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allBusiness: [],
  searchBusiness: [],
  singleBusiness: {},
  paginationBusiness: {},
  errors: {}
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
  },
})

export const {
  setAllBusiness,
  setSearchBusiness,
  setSingleBusiness,
  setErrors,
  setPaginationBusiness
} = BusinessesSlice.actions

export default BusinessesSlice.reducer
