import axiosInstance from '../axiosConfig'
import { API } from '../constants/api'
import {
  setAllInfoStudent,
  setCurrentPage,
  setTotalPage,
} from '../slices/InfoStudentSlice'
import { refreshSession } from './AuthThunks'

export const getInfoStudent = (data) => async (dispatch, rejectWithValue) => {
  await axiosInstance
    .get(`${API.uri}/backoffice/reservations`, {
      params: {
        page: data?.page,
        size: 10,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(setAllInfoStudent(response.data.data.results))
        dispatch(setCurrentPage(response?.data?.data.current_page))
        dispatch(setTotalPage(response?.data?.data.total_page))
      }
    })
    .catch((error) => {
      if (error.response.data.code === 'invalid_session') {
        dispatch(refreshSession())
      }
    })
}
