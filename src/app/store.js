import { configureStore } from '@reduxjs/toolkit'

// Auth & User Management
import AuthReducer from '../slices/AuthSlice'
import AccountsSlice from '../slices/AccountSlice'
import InfoStudentsSlice from '../slices/InfoStudentSlice'

// Academic & Education
import AcademicsSlice from '../slices/AcademicSlice'
import SubjectsSlice from '../slices/SubjectSlice'
import CollegeExamGroupsSlice from '../slices/CollegeExamGroupSlice'
import MajorSlice from '../slices/MajorSlice'
import EvaluationSlice from '../slices/EvaluationSlice'
import AdmissionsSlice from '../slices/AdmissionSlice'

// Content Management
import NewsSlice from '../slices/NewsSlice'
import HandbookSlice from '../slices/HandbookSlice'
import BusinessSlice from '../slices/BusinessSlice'
import FacilitySlice from '../slices/FacilitySlice'
import FacilityImageReducer from '../slices/FacilityImageSlice'

// UI & System
import AlertReducer from '../slices/AlertSlice'
import LocationSlice from '../slices/LocationSlice'
import FunctionSlice from '../slices/FunctionSlice'
import ContactSlice from '../slices/ContactSlice'
import FeedBackSlice from '../slices/FeedBackSlice'

/**
 * Redux store configuration
 * Groups reducers by functionality and disables serializable check for better performance
 */
export const store = configureStore({
  reducer: {
    // Auth & User Management
    authReducer: AuthReducer,
    accountsReducer: AccountsSlice,
    infoStudentsReducer: InfoStudentsSlice,

    // Academic & Education
    academicsReducer: AcademicsSlice,
    subjectsReducer: SubjectsSlice,
    collegeExamGroupsReducer: CollegeExamGroupsSlice,
    majorReducer: MajorSlice,
    evaluationReducer: EvaluationSlice,
    allAdmissionsReducer: AdmissionsSlice,

    // Content Management
    newsReducer: NewsSlice,
    handbookReducer: HandbookSlice,
    businessesReducer: BusinessSlice,
    facilityReducer: FacilitySlice,
    facilityImageReducer: FacilityImageReducer,

    // UI & System
    alertReducer: AlertReducer,
    locationReducer: LocationSlice,
    functionReducer: FunctionSlice,
    contactReducer: ContactSlice,
    feedbacksReducer: FeedBackSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})
