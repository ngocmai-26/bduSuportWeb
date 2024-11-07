import axiosInstance from "../axiosConfig"
import { API } from "../constants/api"
import { logout } from "../slices/AuthSlice"
import { setAllFeedBack } from "../slices/FeedBackSlice"

export const getFeedbackThunk = () => async (dispatch, rejectWithValue) => {
    await axiosInstance
      .get(`${API.uri}/backoffice/feedbacks`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(setAllFeedBack(response.data.data))
        }
      })
      .catch((error) => { 
        if(error.response.data.code === "invalid_session") {
        dispatch(logout())
      }
      })
  }
