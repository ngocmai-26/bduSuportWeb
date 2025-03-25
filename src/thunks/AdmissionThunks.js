import { setAllAdmission, setCurrentPage, setSingleAdmission, setTotalPage } from '../slices/AdmissionSlice'
import { API } from '../constants/api'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { setAlert } from '../slices/AlertSlice'
import axiosInstance from '../axiosConfig'
import { refreshSession } from './AuthThunks'

export const getAllAdmission = (data) => async (dispatch) => {
  try {
    await axiosInstance
      .get(`${API.uri}/backoffice/admission-registration`, {
        params: {
          evaluation_method: data?.evaluation_method,
          major: data?.major,
          college_exam_group: data?.college_exam_group,
          review_status: data?.review_status,
          page: data?.page,
          size: 10,
          year: data?.year
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(setAllAdmission(response.data.data.results))
          dispatch(setCurrentPage(response?.data?.data.current_page))
          dispatch(setTotalPage(response?.data?.data.total_page))
        }
      })
      .catch((error) => {
        if (error.response.data.code === 'invalid_session') {
          dispatch(refreshSession())
        }
      })
  } catch (error) {
    console.log(error)
  }
}

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
      if (error.response.data.code === 'invalid_session') {
        dispatch(refreshSession())
      }
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
