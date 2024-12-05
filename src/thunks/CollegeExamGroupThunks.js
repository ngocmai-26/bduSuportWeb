
import { API } from '../constants/api'
import { setAlert } from '../slices/AlertSlice'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { setAllCollegeExamGroups } from '../slices/CollegeExamGroupSlice'

import axiosInstance from '../axiosConfig'
import { refreshSession } from './AuthThunks'

export const getAllCollegeExamGroup = () => async (
  dispatch,
  rejectWithValue,
) => {

  await axiosInstance
    .get(`${API.uri}/backoffice/college-exam-groups`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(setAllCollegeExamGroups(response.data.data))
      }
    })
    .catch((error) => {
      if(error.response.data.code === "invalid_session") {
        dispatch(refreshSession())
      }
    })
}

export const createCollegeExamGroup = (data) => async (
  dispatch,
  rejectWithValue,
) => {

  await axiosInstance
    .post(`${API.uri}/backoffice/college-exam-groups`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Tạo nhóm môn học thành công',
          }),
        )
        dispatch(getAllCollegeExamGroup())
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


export const DeleteCollegeExamGroup = (id) => async (dispatch, rejectWithValue) => {

  await axiosInstance
    .delete(`${API.uri}/backoffice/college-exam-groups/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Xóa loại nhóm môn học thành công',
          }),
        )
        dispatch(getAllCollegeExamGroup())
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
