
import { API } from '../constants/api'
import { setAlert } from '../slices/AlertSlice'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'

import axiosInstance from '../axiosConfig'
import { refreshSession } from './AuthThunks'
import { setAllFunctions } from '../slices/FunctionSlice'


export const getAllFunction = () => async (dispatch, rejectWithValue) => {
  
    await axiosInstance
      .get(`${API.uri}/backoffice/app-functions`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(setAllFunctions(response?.data?.data))
        }
      })
      .catch((error) => {
        if(error.response.data.code === "invalid_session") {
          dispatch(refreshSession())
        }
      })
  }

  
export const createFunction = (data) => async (dispatch, rejectWithValue) => {
  
    await axiosInstance
      .post(`${API.uri}/backoffice/app-functions`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(
            setAlert({
              type: TOAST_SUCCESS,
              content: 'Tạo chức năng thành công',
            }),
          )
          dispatch(getAllFunction())
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

  export const deleteFunction = (id) => async (dispatch, rejectWithValue) => {
  
    await axiosInstance
      .delete(`${API.uri}/backoffice/app-functions/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(
            setAlert({
              type: TOAST_SUCCESS,
              content: 'Xóa nhóm chức năng thành công',
            }),
          )
          dispatch(getAllFunction())
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

  export const patchFunction = (data) => async (dispatch, rejectWithValue) => {
  
    await axiosInstance
      .patch(`${API.uri}/backoffice/app-functions/${data?.id}`, data?.data,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(
            setAlert({
              type: TOAST_SUCCESS,
              content: 'chỉnh sửa chức năng thành công',
            }),
          )
          dispatch(getAllFunction())
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
