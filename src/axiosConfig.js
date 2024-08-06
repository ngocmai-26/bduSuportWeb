import axios from 'axios';
import { API } from './constants/api';
import {
  loadTokenFromStorage,
  removeTokenFromStorage,
  loadAuthRefreshFromStorage,
  removeAuthRefreshFromStorage,
  setToken,
  setRefresh
} from './services/AuthService';
import { getNavigate } from './services/AuthService'; 

const axiosInstance = axios.create({
  baseURL: `${API.uri}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = loadTokenFromStorage();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const handleRefreshTokenFailed = () => {
  const navigate = getNavigate();
  removeTokenFromStorage();
  removeAuthRefreshFromStorage();
  if (navigate) navigate('/dang-nhap');
};

const handleInvalidSession = async (error) => {
  const refreshToken = loadAuthRefreshFromStorage();

  if (!refreshToken) {
    handleRefreshTokenFailed();
    return Promise.reject(error);
  }

  try {
    const response = await axios.post(`${API.uri}/refresh-token`, { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    setToken(accessToken);
    setRefresh(newRefreshToken);

    const config = error.config;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return axiosInstance(config);
  } catch (refreshError) {
    handleRefreshTokenFailed();
    return Promise.reject(refreshError);
  }
};

const handleAccountUnverify = () => {
  const navigate = getNavigate();
  if (navigate) navigate('/ma-xac-thuc'); 
};

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response) {
      const { code } = error.response.data;

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
          return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
