import axios from 'axios';
import { API } from './constants/api';
import {
  loadTokenFromStorage,
  removeTokenFromStorage,
  loadAuthRefreshFromStorage,
  removeAuthRefreshFromStorage,
  setToken,
  setRefresh,
} from './services/AuthService';
import { getNavigate } from './services/AuthService';
import { logout } from './slices/AuthSlice';
import { store } from './app/store';

const axiosInstance = axios.create({
  baseURL: `${API.uri}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = loadTokenFromStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Xử lý khi refresh token thất bại
const handleRefreshTokenFailed = () => {
  // const navigate = getNavigate();
  removeTokenFromStorage();
  removeAuthRefreshFromStorage();
  store.dispatch(logout()); // Đảm bảo logout ngay lập tức
};

// Xử lý khi phiên làm việc không hợp lệ
const handleInvalidSession = async (error) => {
  const refreshToken = loadAuthRefreshFromStorage();

  if (!refreshToken) {
    handleRefreshTokenFailed();
    return Promise.reject(error);
  }

  try {
    const response = await axios.post(`${API.uri}/backoffice/refresh`, {
      refresh: refreshToken,
    });

    setToken(response?.data?.data?.access);
    setRefresh(response?.data?.data?.refresh);

    const config = error.config;
    config.headers.Authorization = `Bearer ${response?.data?.data?.access}`;
    return axiosInstance(config); // Gửi lại request với token mới
  } catch (refreshError) {
    console.log("refreshError", refreshError)
    handleRefreshTokenFailed();
    return Promise.reject(refreshError);
  }
};

// Xử lý khi tài khoản chưa được xác minh
const handleAccountUnverify = () => {
  const navigate = getNavigate();
  if (navigate) navigate('/ma-xac-thuc');
};

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const code = error.response?.data?.code || null;
      const status = error.response.status; // HTTP status code

      switch (code) {
        case 'refresh_token_failed':
          handleRefreshTokenFailed();
          break;

        case 'invalid_session':
          return handleInvalidSession(error);

        case 'account_unverify':
          handleAccountUnverify();
          break;

        default:
          break;
      }

    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
