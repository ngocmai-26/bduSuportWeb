import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allFacilities: [],
  singleFacility: {},
  errors: {},
  current_page: 0,
  total_page: 0,
}
const FacilitySlice = createSlice({
  name: 'facility',
  initialState: initState,
  reducers: {
    setAllFacilities: (state, { payload }) => {
      state.allFacilities = payload
    },
    setSingleFacility: (state, { payload }) => {
      state.singleFacility = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
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
  setAllFacilities,
  setSingleFacility,
  setErrors,
  setCurrentPage,
  setTotalPage,
} = FacilitySlice.actions

export default FacilitySlice.reducer 