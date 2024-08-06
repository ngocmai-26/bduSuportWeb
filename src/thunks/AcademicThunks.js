import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../constants/api'
import { setAlert } from '../slices/AlertSlice'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { setAllAcademic } from '../slices/AcademicSlice'
import axios from 'axios'
import { loadTokenFromStorage } from '../services/AuthService'

export const getAllAcademic = () => async (dispatch, rejectWithValue) => {
  const token = loadTokenFromStorage()
  await axios
    .get(`${API.uri}/backoffice/academic-levels`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response) {
        dispatch(setAllAcademic(response.data.data))
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

export const createAcademic = (data) => async (dispatch, rejectWithValue) => {
  const token = loadTokenFromStorage()
  await axios
    .post(`${API.uri}/backoffice/academic-levels`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Tạo cấp bậc thành công',
          }),
        )
        dispatch(getAllAcademic())
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        dispatch(
          setAlert({ type: TOAST_ERROR, content: error.response.data.message }),
        )
      }
    })
}
