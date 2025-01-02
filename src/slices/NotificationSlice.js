import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allNotification: [],
  searchNotification: [],
  singleNotification: {},
  paginationNotification: {},
  errors: {},
  current_page: 0,
  total_page: 0,
}
const NotificationsSlice = createSlice({
  name: 'Notification',
  initialState: initState,
  reducers: {
    setAllNotification: (state, { payload }) => {
      state.allNotification = payload
    },
    setSearchNotification: (state, { payload }) => {
      state.searchNotification = payload
    },
    setSingleNotification: (state, { payload }) => {
      state.singleNotification = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationNotification: (state, { payload }) => {
      state.paginationNotification = payload
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
  setAllNotification,
  setSearchNotification,
  setSingleNotification,
  setErrors,
  setPaginationNotification,
  setCurrentPage,
  setTotalPage
} = NotificationsSlice.actions

export default NotificationsSlice.reducer
