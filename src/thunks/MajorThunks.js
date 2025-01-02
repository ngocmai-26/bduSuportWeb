
import { API } from '../constants/api'
import { setAlert } from '../slices/AlertSlice'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { setAllMajors, setCurrentPage, setTotalPage } from '../slices/MajorSlice'
import axiosInstance from '../axiosConfig'
import { refreshSession } from './AuthThunks'

export const getAllMajor = (data) => async (dispatch, rejectWithValue) => {
  
  await axiosInstance
    .get(`${API.uri}/backoffice/majors`, {
      params: {
        page: data?.page,
        size: 10,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(setAllMajors(response.data.data.results))
        dispatch(setCurrentPage(response?.data?.data.current_page))
        dispatch(setTotalPage(response?.data?.data.total_page))
      }
    })
    .catch((error) => {
      if(error.response.data.code === "invalid_session") {
        dispatch(refreshSession())
      }
    })
}

export const createMajor = (data) => async (dispatch, rejectWithValue) => {
  
  await axiosInstance
    .post(`${API.uri}/backoffice/majors`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Tạo môn học thành công',
          }),
        )
        dispatch(getAllMajor())
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

export const deleteMajor = (id) => async (dispatch, rejectWithValue) => {
  
  await axiosInstance
    .delete(`${API.uri}/backoffice/majors/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Xóa nhóm môn học thành công',
          }),
        )
        dispatch(getAllMajor())
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

export const updateMajor = (data) => async (dispatch, rejectWithValue) => {
  
  await axiosInstance
    .put(`${API.uri}/backoffice/majors/${data.id}`, data.data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Cập nhật nhóm môn học thành công',
          }),
        )
        dispatch(getAllMajor())
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
