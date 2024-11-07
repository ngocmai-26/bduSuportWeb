import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  logout,
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
import { setEmail } from '../slices/AccountSlice'

export const login = createAsyncThunk(
  'auth/login',
  async (data, { dispatch, rejectWithValue }) => {
    dispatch(setAuthFetching(true))

    try {
      const response = await axios.post(`${API.uri}/backoffice/login`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status >= 300) {
        dispatch(setActionStatus(response?.data?.code))
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Đã gửi mã xác nhận về email',
          }),
        )
      } else {
        dispatch(
          setAlert({ type: TOAST_SUCCESS, content: 'Đăng nhập thành công' }),
        )
      }

      setToken(response.data.data.access)
      setRefresh(response.data.data.refresh)
      dispatch(setLogged(true))

      return response.data
    } catch (error) {
      if (error.response?.data.code === 'account_unverify') {
        dispatch(
          setAlert({
            type: TOAST_ERROR,
            content: 'Tài khoản chưa được xác nhận hãy xác nhận tài khoản',
          }),
        )
        return rejectWithValue(error.response.data)
      }
      return rejectWithValue('Unexpected error')
    }
  },
)

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
    if (resp?.status >= 200 && resp?.status < 300) {
      dispatch(setAlert({ type: TOAST_SUCCESS, content: 'Đăng ký thành công' }))
      dispatch(getAllAccount())
      return resp
    } else {
      dispatch(setAlert({ type: TOAST_ERROR, content: 'Kiểm tra lại dữ liệu' }))
    }
  } catch (error) {
    console.log(error)
  }
}


export const confirmAccount = createAsyncThunk(
  'account/confirm',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.post(`${API.uri}/backoffice/admin/accounts/verify`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setRefresh(true));
      dispatch(
        setAlert({ type: TOAST_SUCCESS, content: response.data.message })
      );

      return response.data; // Return data when fulfilled
    } catch (error) {
      // Handle error in catch block
      dispatch(
        setAlert({ type: TOAST_ERROR, content: error.response?.data?.message })
      );
      return rejectWithValue(error.response?.status); // Return error code or message
    }
  }
);

export const refreshSession = createAsyncThunk(
  'backoffice/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = loadAuthRefreshFromStorage()
      if (!refreshToken) {
        console.log('Refresh token not found')
      }
      const response = await axiosInstance
        .post('/backoffice/refresh', { refresh: refreshToken })
        .catch((error) => {
          if (error) {
            logout()
          }
        })

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
