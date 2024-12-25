import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allContacts: [],
  searchContacts: [],
  singleContacts: {},
  paginationContacts: {},
  errors: {},
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
  },
})

export const {
  setAllContacts,
  setSearchContacts,
  setSingleContacts,
  setErrors,
  setPaginationContacts
} = ContactSlice.actions

export default ContactSlice.reducer
