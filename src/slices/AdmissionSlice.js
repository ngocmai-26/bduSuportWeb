import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allAdmission: [],
  searchAdmission: [],
  singleAdmission: {},
  paginationAdmission: {},
  errors: {},
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
  },
})

export const {
  setAllAdmission,
  setSearchAdmission,
  setSingleAdmission,
  setErrors,
  setPaginationAdmission
} = AdmissionsSlice.actions

export default AdmissionsSlice.reducer
