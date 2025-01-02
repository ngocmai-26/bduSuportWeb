import axiosInstance from '../axiosConfig'
import { API } from '../constants/api'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { setAlert } from '../slices/AlertSlice'
import { setAllBusiness, setCurrentPage, setTotalPage } from '../slices/BusinessSlice'
import { refreshSession } from './AuthThunks'

export const getBusinessesThunk = (data) => async (
  dispatch,
  rejectWithValue,
) => {
  await axiosInstance
    .get(`${API.uri}/backoffice/business-recruiments`, {
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
        dispatch(setAllBusiness(response.data.data.results))
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

export const AddBusinessThunk = (formData) => async (dispatch) => {
  await axiosInstance
    .post(`${API.uri}/backoffice/business-recruiments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(
          setAlert({
            type: TOAST_SUCCESS,
            content: 'Tạo tin tuyển dụng thành công',
          }),
        )
        dispatch(getBusinessesThunk())
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
