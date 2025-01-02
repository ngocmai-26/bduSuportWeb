import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allContacts: [],
  searchContacts: [],
  singleContacts: {},
  paginationContacts: {},
  errors: {},
  current_page: 0,
  total_page: 0,
}
const ContactSlice = createSlice({
  name: 'Contact',
  initialState: initState,
  reducers: {
    setAllContacts: (state, { payload }) => {
      state.allContacts = payload
    },
    setSearchContacts: (state, { payload }) => {
      state.searchContacts = payload
    },
    setSingleContacts: (state, { payload }) => {
      state.singleContacts = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationContacts: (state, { payload }) => {
      state.paginationContacts = payload
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
  setAllContacts,
  setSearchContacts,
  setSingleContacts,
  setErrors,
  setPaginationContacts,
  setCurrentPage,
  setTotalPage
} = ContactSlice.actions

export default ContactSlice.reducer
