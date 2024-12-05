
import { API } from '../constants/api'
import { setAllAccount } from '../slices/AccountSlice'
import { setAlert } from '../slices/AlertSlice'
import { TOAST_SUCCESS } from '../constants/toast'
import axiosInstance from '../axiosConfig'
import { refreshSession } from './AuthThunks'

export const getAllAccount = () => async (dispatch, rejectWithValue) => {
  await axiosInstance
    .get(`${API.uri}/backoffice/accounts`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(setAllAccount(response.data.results))
      }
    })
    .catch((error) => {
      if(error.response.data.code === "invalid_session") {
        dispatch(refreshSession())
      }
    })
}


export const unlockAccount = (id) => async (dispatch, rejectWithValue) => {
  await axiosInstance
    .get(`${API.uri}/backoffice/super-admin/accounts/backoffice/${id}/unlock`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Thành công',
          }),
        )
        dispatch(getAllAccount())
      }
    })
    .catch((error) => {
      console.log("error", error)
    })
}
export const lockAccount = (id) => async (dispatch, rejectWithValue) => {

  await axiosInstance
    .get(`${API.uri}/backoffice/super-admin/accounts/backoffice/${id}/lock`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Thành công',
          }),
        )
        dispatch(getAllAccount())
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
