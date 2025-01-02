import axiosInstance from "../axiosConfig"
import { API } from "../constants/api"
import { setAllFeedBack, setCurrentPage, setTotalPage } from "../slices/FeedBackSlice"
import { refreshSession } from "./AuthThunks"

export const getFeedbackThunk = (data) => async (dispatch, rejectWithValue) => {
    await axiosInstance
      .get(`${API.uri}/backoffice/feedbacks`, {
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
          dispatch(setAllFeedBack(response.data.data.results))
                    dispatch(setCurrentPage(response?.data?.data.current_page))
                    dispatch(setTotalPage(response?.data?.data.total_page))
        }
      })
      .catch((error) => { 
        if(error.response.data.code === "invalid_session") {
          dispatch(refreshSession())
      }
      })
  }
