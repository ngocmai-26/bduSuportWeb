import axiosInstance from "../axiosConfig"
import { API } from "../constants/api"
import { TOAST_SUCCESS } from "../constants/toast"
import { setAlert } from "../slices/AlertSlice"

export const createNotification = (data) => async (dispatch, rejectWithValue) => {
    try {
      const resp = await axiosInstance.post(
        `${API.uri}/backoffice/miniapp-notifications`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (resp?.status >= 200 && resp?.status < 300) {
        dispatch(
          setAlert({ type: TOAST_SUCCESS, content: 'Tạo thông báo thành công' }),
        )
      }
    } catch (error) {
      console.log(error)
    }
  }