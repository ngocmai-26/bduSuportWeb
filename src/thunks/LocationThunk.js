import axiosInstance from "../axiosConfig"
import { API } from "../constants/api"
import { TOAST_ERROR, TOAST_SUCCESS } from "../constants/toast"
import { setAlert } from "../slices/AlertSlice"
import { setAllLocation, setCurrentPage, setTotalPage } from "../slices/LocationSlice"
import { refreshSession } from "./AuthThunks"


export const getLocationThunk = (data) => async (dispatch, rejectWithValue) => {
    await axiosInstance
      .get(`${API.uri}/backoffice/training-location`, {
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
          dispatch(setAllLocation(response.data.data.results))
          dispatch(setCurrentPage(response?.data?.data.current_page))
          dispatch(setTotalPage(response?.data?.data.total_page))
        }
      })
      .catch((error) => { if(error.response.data.code === "invalid_session") {
        dispatch(refreshSession())
      }
      })
  }


export const AddLocationThunk = (formData) => async (dispatch) => {
    await axiosInstance
      .post(`${API.uri}/backoffice/training-location`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(
            setAlert({
              type: TOAST_SUCCESS,
              content: 'Tạo thành công',
            }),
          )
          dispatch(getLocationThunk())
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

  
export const DeleteLocationThunk = (id) => async (dispatch, rejectWithValue) => {
    await axiosInstance
      .delete(`${API.uri}/backoffice/training-location/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(
            setAlert({
              type: TOAST_SUCCESS,
              content: 'Xóa tin tức thành công',
            }),
          )
          dispatch(getLocationThunk())
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