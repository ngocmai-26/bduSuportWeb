import axiosInstance from "../axiosConfig"
import { API } from "../constants/api"
import { TOAST_ERROR, TOAST_SUCCESS } from "../constants/toast"
import { setAlert } from "../slices/AlertSlice"
import { setAllContacts } from "../slices/ContactSlice"

export const getContactThunk = () => async (dispatch, rejectWithValue) => {
    await axiosInstance
      .get(`${API.uri}/backoffice/contact`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(setAllContacts(response.data.data))
        }
      })
     
  }

  export const AddContactThunk = (formData) => async (dispatch) => {
    await axiosInstance
      .post(`${API.uri}/backoffice/contact`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(
            setAlert({
              type: TOAST_SUCCESS,
              content: 'Tạo liên hệ thành công',
            }),
          )
          dispatch(getContactThunk())
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


  export const patchContact = (data) => async (dispatch, rejectWithValue) => {
  
    await axiosInstance
      .patch(`${API.uri}/backoffice/contact/${data?.id}`, data?.data,{
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(
            setAlert({
              type: TOAST_SUCCESS,
              content: 'chỉnh sửa liên hệ thành công',
            }),
          )
          dispatch(getContactThunk())
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

  export const deleteContact = (id) => async (dispatch, rejectWithValue) => {
  
    await axiosInstance
      .delete(`${API.uri}/backoffice/contact/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(
            setAlert({
              type: TOAST_SUCCESS,
              content: 'Xóa liên hệ thành công',
            }),
          )
          dispatch(getContactThunk())
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