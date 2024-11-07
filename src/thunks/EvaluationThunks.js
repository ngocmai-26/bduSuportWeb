import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAllEvaluation } from '../slices/EvaluationSlice'
import { API } from '../constants/api'
import axios from 'axios'
import { loadTokenFromStorage } from '../services/AuthService'
import axiosInstance from '../axiosConfig'
import { logout } from '../slices/AuthSlice'

export const getAllEvaluation = () => async (dispatch, rejectWithValue) => {

  await axiosInstance
    .get(`${API.uri}/backoffice/evaluation-methods`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(setAllEvaluation(response.data.data))
      }
    })
    .catch((error) => { 
      if(error.response.data.code === "invalid_session") {
      dispatch(logout())
    }
    })
}
