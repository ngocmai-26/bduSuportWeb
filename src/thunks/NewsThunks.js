import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../constants/api'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { setAlert } from '../slices/AlertSlice'
import axios from 'axios'
import { setAllNews, setTypeNews } from '../slices/NewsSlice'
import { loadTokenFromStorage } from '../services/AuthService'
import axiosInstance from '../axiosConfig'

export const getNewsThunk = () => async (dispatch, rejectWithValue) => {
  await axiosInstance
    .get(`${API.uri}/backoffice/news`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(setAllNews(response.data.data))
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

export const getTypeNews = () => async (dispatch, rejectWithValue) => {
  await axiosInstance
    .get(`${API.uri}/backoffice/news-types`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(setTypeNews(response.data.data))
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

export const AddNewsThunk = (formData) => async (dispatch) => {
  await axiosInstance
    .post(`${API.uri}/backoffice/news`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Tạo tin tức thành công',
          }),
        )
        dispatch(getNewsThunk())
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

export const AddTypeNews = (formData) => async (dispatch) => {
  await axiosInstance
    .post(`${API.uri}/backoffice/news-types`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Tạo loại tin tức thành công',
          }),
        )
        dispatch(getTypeNews())
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

export const DeleteNewsThunk = (id) => async (dispatch, rejectWithValue) => {
  await axiosInstance
    .delete(`${API.uri}/backoffice/news/${id}`, {
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
        dispatch(getNewsThunk())
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

export const DeleteTypeNews = (id) => async (dispatch, rejectWithValue) => {
  await axiosInstance
    .delete(`${API.uri}/backoffice/news-types/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Xóa loại tin tức thành công',
          }),
        )
        dispatch(getTypeNews())
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

export const updateTypeNews = (data) => async (dispatch, rejectWithValue) => {
  await axiosInstance
    .put(`${API.uri}/backoffice/news-types/${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Cập nhật loại tin tức thành công',
          }),
        )
        dispatch(getTypeNews())
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

export const updateNewsThunk = (data) => async (dispatch, rejectWithValue) => {
  await axiosInstance
    .put(`${API.uri}/backoffice/news/${data.id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Cập nhật tin tức thành công',
          }),
        )
        dispatch(getTypeNews())
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