import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  logout,
  setActionStatus,
  setAuthFetching,
  setLogged,
  setUser,
} from '../slices/AuthSlice'
import { API } from '../constants/api'
import { setAlert } from '../slices/AlertSlice'
import {
  loadAuthRefreshFromStorage,
  setRefresh,
  setToken,
} from '../services/AuthService'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import axios from 'axios'
import { getAllAccount } from './AccountThunks'
import axiosInstance from '../axiosConfig'

export const login = createAsyncThunk(
  'auth/login',
  async (data, { dispatch, rejectWithValue }) => {
    dispatch(setAuthFetching(true))

    try {
      const response = await axios
        .post(`${API.uri}/backoffice/login`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          dispatch(
            setAlert({ type: TOAST_SUCCESS, content: response.data.message }),
          )
          setToken(response.data.data.access)
          setRefresh(response.data.data.refresh)
          dispatch(setLogged(true))
          dispatch(setUser(response.data.data.user_info))
        })
        .catch((error) => {
          dispatch(setActionStatus(error?.data?.code))
          dispatch(
            setAlert({
              type: TOAST_ERROR,
              content:
                'Thông tin đăng nhập chưa chính xác hoặc tài khoản chưa được xác minh',
            }),
          )
        })

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
      const token = localStorage.getItem('auth_token')
      await axios
        .post(`${API.uri}/backoffice/anonymous/account/verify`, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          dispatch(setRefresh(true))
          dispatch(
            setAlert({ type: TOAST_SUCCESS, content: response.data.message }),
          )
        })
        .catch((error) => {
          dispatch(
            setAlert({
              type: TOAST_ERROR,
              content: error.response?.data?.message,
            }),
          )
          return rejectWithValue(error.response?.status) // Return error code or message
        })
    } catch (error) {
      console.log('error', error)
    }
  },
)

export const resendVerifyOtp = createAsyncThunk(
  'account/resend',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      await axios
        .post(
          `${API.uri}/backoffice/anonymous/account/resend-verify-otp`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          dispatch(setRefresh(true))
          dispatch(
            setAlert({ type: TOAST_SUCCESS, content: response.data.message }),
          )
        })
        .catch((error) => {
          dispatch(
            setAlert({
              type: TOAST_ERROR,
              content: error.response?.data?.message,
            }),
          )
          return rejectWithValue(error.response?.status) // Return error code or message
        })
    } catch (error) {
      console.log('error', error)
    }
  },
)

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

export const changePassword = createAsyncThunk(
  'change_password',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      await axios
        .patch(`${API.uri}/backoffice/admin/accounts/change-password`, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          dispatch(
            setAlert({ type: TOAST_SUCCESS, content: response.data.message }),
          )
          dispatch(setRefresh(true))
        })
        .catch((error) => {
          dispatch(
            setAlert({
              type: TOAST_ERROR,
              content: error.response?.data?.message,
            }),
          )
          return rejectWithValue(error.response?.status) // Return error code or message
        })
    } catch (error) {
      console.log('error', error)
    }
  },
)

export const resetPassword = createAsyncThunk(
  'reset_password',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      await axios
        .patch(
          `${API.uri}/backoffice/super-admin/accounts/backoffice/${data.id}/reset-password`,
          data.data,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          dispatch(
            setAlert({ type: TOAST_SUCCESS, content: response.data.message }),
          )
          dispatch(setRefresh(true))
        })
        .catch((error) => {
          dispatch(
            setAlert({
              type: TOAST_ERROR,
              content: error.response?.data?.message,
            }),
          )
          return rejectWithValue(error.response?.status)
        })
    } catch (error) {
      console.log('error', error)
    }
  },
)
