import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../container/user";
import { AppMiddleware } from "../middleware/AppMiddleware";
import AccountManager from "../container/user/Account";
import AcademicManager from "../container/user/Academic";
import AdmissionStudentManager from "../container/user/AdmissionStudents";
import EvaluationManager from "../container/user/Evaluation";
import MajorManager from "../container/user/Major";
import NewsManager from "../container/user/News";
import Login from "../container/auth/login";
import VerifyCode from "../container/auth/verifyCode";
import SubjectManager from "../container/user/Subject";
import CollegeExamGroupManager from "../container/user/CollegeExamGroup";
import TypeNewsManager from "../container/user/News/typeNews";
import BusinessesManager from "../container/user/Business";
import FeedBackManager from "../container/user/Feedback";
import LocationsManager from "../container/user/Location";
import ResendVerify from "../container/auth/resendOtp";
import { loadAuthRefreshFromStorage } from "../services/AuthService";
import FunctionManager from "../container/user/Function";
import ContactManager from "../container/user/Contact";
import HandbookManager from "../container/user/Handbook";
import AuditManager from "../container/auth/audit";
import InfoStudentManager from "../container/user/infoStudent";

export const GeneralRoute = () => {
  return (
    <AppMiddleware>
      <Routes>
      <Route path="*" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/ma-xac-thuc" element={<VerifyCode />} />
        <Route path="/gui-lai-ma" element={<ResendVerify />} />
      </Routes>
    </AppMiddleware>
  );
};

export const LoggedRoute = () => {
  return (
    <AppMiddleware>
      <Routes>
      <Route path="*" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/account-manager" element={<AccountManager />} />
        <Route path="/academic-manager" element={<AcademicManager />} />
        <Route
          path="/admission-student-manager"
          element={<AdmissionStudentManager />}
        />
        <Route path="/evaluation-manager" element={<EvaluationManager />} />
        <Route path="/major-manager" element={<MajorManager />} />
        <Route path="/news-manager" element={<NewsManager />} />
        <Route path="/subject-manager" element={<SubjectManager />} />
        <Route path="/college-exam-group-manager" element={<CollegeExamGroupManager />} />
        <Route path="/type-news-manager" element={<TypeNewsManager />} />
        <Route path="/business-manager" element={<BusinessesManager />} />
        <Route path="/feedback-manager" element={<FeedBackManager />} />
        <Route path="/location-manager" element={<LocationsManager />} />
        <Route path="/function-manager" element={<FunctionManager />} />
        <Route path="/contact-manager" element={<ContactManager />} />
        <Route path="/handbook-manager" element={<HandbookManager />} />
        <Route path="/audit-manager" element={<AuditManager />} />
        <Route path="/information-student-manager" element={<InfoStudentManager />} />
      </Routes>
    </AppMiddleware>
  );
};

function Router() {
  const refresh = loadAuthRefreshFromStorage(); // Load refresh token if available

 
  return (
    <BrowserRouter basename="/bdu-support">
      {refresh ? <LoggedRoute /> : <GeneralRoute />}
    </BrowserRouter>
  );
}

export default Router;
