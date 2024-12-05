
import { API } from '../constants/api'
import { setAlert } from '../slices/AlertSlice'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { setAllSubject, setStatus } from '../slices/SubjectSlice'
import axiosInstance from '../axiosConfig'
import { refreshSession } from './AuthThunks'

export const getAllSubject = () => async (dispatch, rejectWithValue) => {
  try {
    await axiosInstance
      .get(`${API.uri}/backoffice/subjects`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(setAllSubject(response.data.data))
        }
      })
      .catch((error) => { 
        if(error.response.data.code === "invalid_session") {
          dispatch(refreshSession())
      }
      })
  } catch (error) {
    console.log('error', error)
  }
}

export const createSubject = (data) => async (dispatch, rejectWithValue) => {
  try {
    const resp = await axiosInstance.post(
      `${API.uri}/backoffice/subjects`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    if (resp?.status >= 200 && resp?.status < 300) {
      dispatch(
        setAlert({ type: TOAST_SUCCESS, content: 'Tạo môn học thành công' }),
      )
      dispatch(getAllSubject())
      setStatus(resp?.status)
    }
  } catch (error) {
    console.log(error)
  }
}

export const DeleteSubjectThunk = (id) => async (dispatch, rejectWithValue) => {
  await axiosInstance
    .delete(`${API.uri}/backoffice/subjects/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({ type: TOAST_SUCCESS, content: 'Xóa môn học thành công' }),
        )
        dispatch(getAllSubject())
      }
    })
    .catch((error) => {
      if (error.response && error.response?.status === 400) {
        dispatch(
          setAlert({ type: TOAST_ERROR, content: error.response.data.message }),
        )
      }
    })
}
