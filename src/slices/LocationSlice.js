import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allLocation: [],
  searchLocation: [],
  singleLocation: {},
  paginationLocation: {},
  errors: {},
  current_page: 0,
  total_page: 0,
}
const LocationsSlice = createSlice({
  name: 'Location',
  initialState: initState,
  reducers: {
    setAllLocation: (state, { payload }) => {
      state.allLocation = payload
    },
    setSearchLocation: (state, { payload }) => {
      state.searchLocation = payload
    },
    setSingleLocation: (state, { payload }) => {
      state.singleLocation = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationLocation: (state, { payload }) => {
      state.paginationLocation = payload
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
  setAllLocation,
  setSearchLocation,
  setSingleLocation,
  setErrors,
  setPaginationLocation,
  setCurrentPage,
  setTotalPage
} = LocationsSlice.actions

export default LocationsSlice.reducer
