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
import FunctionSlice from '../slices/FunctionSlice'
import ContactSlice from '../slices/ContactSlice'
import HandbookSlice from '../slices/HandbookSlice'
import InfoStudentsSlice from '../slices/InfoStudentSlice'

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
    functionReducer: FunctionSlice,
    contactReducer: ContactSlice,
    handbookReducer: HandbookSlice,
    infoStudentsReducer: InfoStudentsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})
