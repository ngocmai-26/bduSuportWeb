import axiosInstance from "../axiosConfig"
import { API } from "../constants/api"
import { TOAST_ERROR, TOAST_SUCCESS } from "../constants/toast"
import { setAlert } from "../slices/AlertSlice"
import { setAllHandbooks } from "../slices/HandbookSlice"

export const getHandbookThunk = () => async (dispatch, rejectWithValue) => {
    await axiosInstance
      .get(`${API.uri}/backoffice/handbooks`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(setAllHandbooks(response.data.data))
        }
      })
     
  }

  export const AddHandbookThunk = (formData) => async (dispatch) => {
    await axiosInstance
      .post(`${API.uri}/backoffice/handbooks`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(
            setAlert({
              type: TOAST_SUCCESS,
              content: 'Tạo handbook thành công',
            }),
          )
          dispatch(getHandbookThunk())
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


  export const patchHandbook = (data) => async (dispatch, rejectWithValue) => {
  
    await axiosInstance
      .patch(`${API.uri}/backoffice/handbooks/${data?.id}`, data?.data,{
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(
            setAlert({
              type: TOAST_SUCCESS,
              content: 'chỉnh sửa handbook thành công',
            }),
          )
          dispatch(getHandbookThunk())
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

  export const deleteHandbook = (id) => async (dispatch, rejectWithValue) => {
  
    await axiosInstance
      .delete(`${API.uri}/backoffice/handbooks/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(
            setAlert({
              type: TOAST_SUCCESS,
              content: 'Xóa handbook thành công',
            }),
          )
          dispatch(getHandbookThunk())
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