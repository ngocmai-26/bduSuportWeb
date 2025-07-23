import axiosInstance from '../axiosConfig';
import { API } from '../constants/api';
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast';
import { setAlert } from '../slices/AlertSlice';
import { setFacilityImages } from '../slices/FacilityImageSlice';

// export const getFacilityImagesThunk = (facilityId) => async (dispatch) => {
//   try {
//     // COMMENT: Không dùng API này nữa vì backend không hỗ trợ
//     // const res = await axiosInstance.get(`${API.uri}/backoffice/facilities/${facilityId}`);
//     // dispatch(setFacilityImages(res.data.data.images || []));
//   } catch (err) {
//     // Có thể xử lý lỗi nếu cần
//   }
// };

export const addFacilityImageThunk = (facilityId, image) => async (dispatch) => {
  const formData = new FormData();
  formData.append('facility', facilityId);
  formData.append('image', image);
  try {
    await axiosInstance.post(`${API.uri}/backoffice/facility-images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch(setAlert({ type: TOAST_SUCCESS, content: 'Thêm ảnh thành công' }));
    // dispatch(getFacilityImagesThunk(facilityId));
  } catch (err) {
    dispatch(setAlert({ type: TOAST_ERROR, content: 'Thêm ảnh thất bại' }));
  }
};

export const deleteFacilityImageThunk = (facilityId, imageId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`${API.uri}/backoffice/facility-images/${imageId}`);
    dispatch(setAlert({ type: TOAST_SUCCESS, content: 'Xóa ảnh thành công' }));
    // dispatch(getFacilityImagesThunk(facilityId));
  } catch (err) {
    dispatch(setAlert({ type: TOAST_ERROR, content: 'Xóa ảnh thất bại' }));
  }
}; 