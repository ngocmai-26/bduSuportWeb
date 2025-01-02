import {
  setAllEvaluation,
  setCurrentPage,
  setTotalPage,
} from '../slices/EvaluationSlice'
import { API } from '../constants/api'
import axiosInstance from '../axiosConfig'
import { refreshSession } from './AuthThunks'

export const getAllEvaluation = (data) => async (dispatch, rejectWithValue) => {
  await axiosInstance
    .get(`${API.uri}/backoffice/evaluation-methods`, {
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
        console.log("response.data.data.results", response.data.data)
        dispatch(setAllEvaluation(response.data.data.results))
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
