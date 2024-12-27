import axios from 'axios'
import { API } from './constants/api'
import {
  loadTokenFromStorage,
  removeTokenFromStorage,
  loadAuthRefreshFromStorage,
  removeAuthRefreshFromStorage,
  setToken,
  setRefresh,
} from './services/AuthService'
import { getNavigate } from './services/AuthService'
import { logout } from './slices/AuthSlice'

const axiosInstance = axios.create({
  baseURL: `${API.uri}`,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  function (config) {
    const token = loadTokenFromStorage()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

const handleRefreshTokenFailed = () => {
  const navigate = getNavigate()
  removeTokenFromStorage()
  removeAuthRefreshFromStorage()
  logout()
}

const handleInvalidSession = async (error) => {
  const refreshToken = loadAuthRefreshFromStorage()

  if (!refreshToken) {
    handleRefreshTokenFailed()
    return Promise.reject(error)
  }
  console.log("refreshToken", refreshToken)

  

  try {
    const response = await axios.post(`${API.uri}/backoffice/refresh`, {
      refresh: refreshToken,
    })
    setToken(response?.data?.data?.access)
    setRefresh(response?.data?.data?.refresh)
    console.log("response", response?.data?.data?.refresh)

    const config = error.config
    config.headers.Authorization = `Bearer ${response?.data?.data?.access}`
    return axiosInstance(config)
  } catch (refreshError) {
    handleRefreshTokenFailed()
    return Promise.reject(refreshError)
  }
}

const handleAccountUnverify = () => {
  const navigate = getNavigate()
  if (navigate) navigate('/ma-xac-thuc')
}

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    if (error.response) {
      const { code } = error.response.data
      console.log("codssse", error.response)


      switch (code) {
        case 'refresh_token_failed':
          console.log("sss")
          handleRefreshTokenFailed()
          break
          
        case 'invalid_session':
          return handleInvalidSession(error)

        case 'account_unverify':
          handleAccountUnverify()
          break

        default:
          return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
