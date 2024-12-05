import { API_KEY_NAME, INFO_KEY_NAME, REFRESH_KEY_NAME } from "../constants/api";

export const loadTokenFromStorage = () => getValueByKey(API_KEY_NAME);
export const removeTokenFromStorage = () => removeWithKey(API_KEY_NAME);
export const loadAuthRefreshFromStorage = () => getValueByKey(REFRESH_KEY_NAME);
export const removeAuthRefreshFromStorage = () => removeWithKey(REFRESH_KEY_NAME);
export const loadAuthInfoFromStorage = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null; // Trả về đối tượng nếu parse thành công, nếu không trả về null
};
export const removeAuthInfoFromStorage = () => removeWithKey(INFO_KEY_NAME);
export const setToken = (token) => setValueWithKey(API_KEY_NAME, token);
export const setRefresh = (refresh) => setValueWithKey(REFRESH_KEY_NAME, refresh);
export const setInfo = (info) => setValueWithKey(INFO_KEY_NAME, info);

export const getValueByKey = (key) => localStorage.getItem(key);
export const setValueWithKey = (key, val) => localStorage.setItem(key, val);
export const removeWithKey = (key) => localStorage.removeItem(key);

export const dataToBase64 = (data) => {
  return btoa(JSON.stringify(data));
};
export const base64ToData = (base64Str) => {
  return JSON.parse(atob(base64Str));
};
export const delaySync = async (seconds) => {
  await new Promise((res) => setTimeout(() => res(), seconds * 1000));
};

let navigate;

export const setNavigate = (nav) => {
  navigate = nav;
};

export const getNavigate = () => navigate;
