import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  images: [],
};

const FacilityImageSlice = createSlice({
  name: 'facilityImage',
  initialState,
  reducers: {
    setFacilityImages: (state, { payload }) => {
      state.images = payload;
    },
    clearFacilityImages: (state) => {
      state.images = [];
    },
  },
});

export const { setFacilityImages, clearFacilityImages } = FacilityImageSlice.actions;
export default FacilityImageSlice.reducer; 