import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allAdmission: [],
  searchAdmission: [],
  singleAdmission: {},
  paginationAdmission: {},
  errors: {},
  current_page: 0,
  total_page: 0,
}
const AdmissionsSlice = createSlice({
  name: 'admission',
  initialState: initState,
  reducers: {
    setAllAdmission: (state, { payload }) => {
      state.allAdmission = payload
    },
    setSearchAdmission: (state, { payload }) => {
      state.searchAdmission = payload
    },
    setSingleAdmission: (state, { payload }) => {
      state.singleAdmission = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationAdmission: (state, { payload }) => {
      state.paginationAdmission = payload
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
  setAllAdmission,
  setSearchAdmission,
  setSingleAdmission,
  setErrors,
  setPaginationAdmission,
  setCurrentPage,
  setTotalPage
} = AdmissionsSlice.actions

export default AdmissionsSlice.reducer
