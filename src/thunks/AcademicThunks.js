import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../constants/api'
import { setAlert } from '../slices/AlertSlice'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { setAllAcademic } from '../slices/AcademicSlice'
import axios from 'axios'
import { loadTokenFromStorage } from '../services/AuthService'
import { logout } from '../slices/AuthSlice'
import axiosInstance from '../axiosConfig'

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
      if(error.response.data.code === "invalid_session") {
        dispatch(logout())
      }
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

export const deleteAcademic = (id) => async (dispatch, rejectWithValue) => {
  const token = loadTokenFromStorage()
  await axios
    .delete(`${API.uri}/backoffice/academic-levels/${id}`,  {
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
            content: 'Xóa dữ liệu thành công',
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


export const updateAcademy = (data) => async (dispatch, rejectWithValue) => {
  await axiosInstance
    .put(`${API.uri}/backoffice/academic-levels/${data.id}`, data.data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Cập nhật bậc học thành công',
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


