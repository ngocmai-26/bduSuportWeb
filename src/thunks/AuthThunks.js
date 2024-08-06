import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  setActionStatus,
  setAuthFetching,
  setErrors,
  setErrorsRegister,
  setLogged,
} from '../slices/AuthSlice'
import { API } from '../constants/api'
import { setAlert } from '../slices/AlertSlice'
import {
  dataToBase64,
  delaySync,
  loadAuthRefreshFromStorage,
  setAuthInfo,
  setRefresh,
  setToken,
} from '../services/AuthService'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import axios from 'axios'
import { getAllAccount } from './AccountThunks'
import axiosInstance from '../axiosConfig'

export const login = (data) => async (dispatch, rejectWithValue) => {
  dispatch(setAuthFetching(true))
  await delaySync(1)
  await axios
    .post(`${API.uri}/backoffice/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.status >= 300) {
        dispatch(setActionStatus(response?.data?.code))
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Đã gửi mã xác nhận về email',
          }),
        )
      }
      dispatch(
        setAlert({ type: TOAST_SUCCESS, content: 'Đăng nhập thành công' }),
      )
      console.log("response?.data?.data", response?.data?.data)
      setToken(response?.data?.data?.access)
      setRefresh(response?.data?.data?.refresh)
      dispatch(setLogged(true))
    })
    .catch((error) => {
      if ( error.response.status === 400) {
        dispatch(
          setAlert({ type: TOAST_ERROR, content: error.response.data.message }),
        )
      }
    })
}

export const create = (data) => async (dispatch, rejectWithValue) => {
  try {
    const token = localStorage.getItem('auth_token')
    const resp = await axios.post(
      `${API.uri}/backoffice/super-admin/accounts`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (resp.status >= 200 && resp.status < 300) {
      dispatch(setAlert({ type: TOAST_SUCCESS, content: 'Đăng ký thành công' }))
      dispatch(getAllAccount())
      return resp
    }
  } catch (error) {
    console.log(error)
  }
}

export const confirmAccount = (data) => async (dispatch, rejectWithValue) => {
  try {
    const token = localStorage.getItem('auth_token')
    const resp = await axios.post(
      `${API.uri}/backoffice/admin/accounts/verify`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (resp.status >= 200 && resp.status < 300) {
      dispatch(setRefresh(true))
      dispatch(
        setAlert({ type: TOAST_SUCCESS, content: 'Xác nhận thành công' }),
      )
    }
  } catch (error) {
    console.log(error)
  }
}

export const refreshSession = createAsyncThunk(
  'backoffice/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = loadAuthRefreshFromStorage();

      if (!refreshToken) {
        console.log("Refresh token not found")
      }

      const response = await axiosInstance.post('/backoffice/refresh', { refresh: refreshToken });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
