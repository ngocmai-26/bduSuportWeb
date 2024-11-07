import { configureStore } from '@reduxjs/toolkit'
import AlertReducer from '../slices/AlertSlice'
import AuthReducer from '../slices/AuthSlice'
import AccountsSlice from '../slices/AccountSlice'
import AcademicsSlice from '../slices/AcademicSlice'
import SubjectsSlice from '../slices/SubjectSlice'
import CollegeExamGroupsSlice from '../slices/CollegeExamGroupSlice'
import MajorSlice from '../slices/MajorSlice'
import EvaluationSlice from '../slices/EvaluationSlice'
import NewsSlice from '../slices/NewsSlice'
import AdmissionsSlice from '../slices/AdmissionSlice'
import BusinessSlice from '../slices/BusinessSlice'
import FeedBackSlice from '../slices/FeedBackSlice'
import LocationSlice from '../slices/LocationSlice'

export const store = configureStore({
  reducer: {
    alertReducer: AlertReducer,
    authReducer: AuthReducer,
    accountsReducer: AccountsSlice,
    academicsReducer: AcademicsSlice,
    subjectsReducer: SubjectsSlice,
    collegeExamGroupsReducer: CollegeExamGroupsSlice,
    majorReducer: MajorSlice,
    evaluationReducer: EvaluationSlice,
    newsReducer: NewsSlice,
    allAdmissionsReducer: AdmissionsSlice,
    businessesReducer: BusinessSlice,
    feedbacksReducer: FeedBackSlice,
    locationReducer: LocationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})