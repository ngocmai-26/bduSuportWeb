import { API } from '../constants/api'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { setAlert } from '../slices/AlertSlice'
import {
  setAllFacilities,
  setCurrentPage,
  setTotalPage,
} from '../slices/FacilitySlice'
import axiosInstance from '../axiosConfig'
import { refreshSession } from './AuthThunks'

export const getFacilitiesThunk = (data) => async (dispatch) => {
  await axiosInstance
    .get(`${API.uri}/backoffice/facilities`, {
      params: {
        page: data?.page,
        size: 10,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.data && response.data.data) {
        dispatch(setAllFacilities(response.data.data.results))
        dispatch(setCurrentPage(response.data.data.current_page))
        dispatch(setTotalPage(response.data.data.total_page))
      }
    })
    .catch((error) => {
      if (error.response?.data?.code === 'invalid_session') {
        dispatch(refreshSession())
      }
    })
}

export const addFacilityThunk = (formData) => async (dispatch) => {
  await axiosInstance
    .post(`${API.uri}/backoffice/facilities`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Tạo cơ sở vật chất thành công',
          }),
        )
        dispatch(getFacilitiesThunk({ page: 1 }))
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

export const deleteFacilityThunk = (id) => async (dispatch) => {
  await axiosInstance
    .delete(`${API.uri}/backoffice/facilities/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Xóa cơ sở vật chất thành công',
          }),
        )
        dispatch(getFacilitiesThunk({ page: 1 }))
      }
    })
    .catch((error) => {
      if (error.response?.data?.code === 'invalid_session') {
        dispatch(refreshSession())
      } else if (error.response && error.response.status === 400) {
        dispatch(
          setAlert({ type: TOAST_ERROR, content: error.response.data.message }),
        )
      }
    })
}

export const updateFacilityThunk = (data) => async (dispatch) => {
  const id = data.get('id');
  await axiosInstance
    .put(`${API.uri}/backoffice/facilities/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Cập nhật cơ sở vật chất thành công',
          }),
        )
        dispatch(getFacilitiesThunk({ page: 1 }))
      }
    })
    .catch((error) => {
      if (error.response?.data?.code === 'invalid_session') {
        dispatch(refreshSession())
      } else if (error.response && error.response.status === 400) {
        dispatch(
          setAlert({ type: TOAST_ERROR, content: error.response.data.message }),
        )
      }
    })
} 