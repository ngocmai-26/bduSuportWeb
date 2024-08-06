import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAllAdmission, setSingleAdmission } from '../slices/AdmissionSlice'
import { API } from '../constants/api'
import axios from 'axios'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { setAlert } from '../slices/AlertSlice'
import { loadTokenFromStorage } from '../services/AuthService'
import axiosInstance from '../axiosConfig'

export const getAllAdmission = (data) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`${API.uri}/backoffice/admission-registration`, {
      params: {
        evaluation_method: data?.evaluation_method,
        major: data?.major,
        college_exam_group: data?.college_exam_group,
        review_status: data?.review_status,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response) {
      dispatch(setAllAdmission(response.data.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllAdmissionById = (id) => async (
  dispatch,
  rejectWithValue,
) => {
  await axiosInstance
    .get(`${API.uri}/backoffice/admission-registration/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(setSingleAdmission(response.data.data))
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

export const reviewAdmission = (id, formData) => async (dispatch) => {
  await axiosInstance
    .post(
      `${API.uri}/backoffice/admission-registration/${id}/review`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Gửi thông báo thành công',
          }),
        )
        dispatch(getAllAdmission())
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
