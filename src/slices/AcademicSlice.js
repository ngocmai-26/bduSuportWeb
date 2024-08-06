import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allAcademic: [],
  searchAcademic: [],
  singleAcademic: {},
  paginationAcademic: {},
  errors: {},
}
const AcademicsSlice = createSlice({
  name: 'academic',
  initialState: initState,
  reducers: {
    setAllAcademic: (state, { payload }) => {
      state.allAcademic = payload
    },
    setSearchAcademic: (state, { payload }) => {
      state.searchAcademic = payload
    },
    setSingleAcademic: (state, { payload }) => {
      state.singleAcademic = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationAcademic: (state, { payload }) => {
      state.paginationAcademic = payload
    },
  },
})

export const {
  setAllAcademic,
  setSearchAcademic,
  setSingleAcademic,
  setErrors,
  setPaginationAcademic
} = AcademicsSlice.actions

export default AcademicsSlice.reducer
