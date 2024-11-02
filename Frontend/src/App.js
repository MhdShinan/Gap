import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

//Pages Import Section
import BeAMentor from "./components/BeAMentor/BeAMentor";
import EmailVerify from "./components/EmailVerify/EmailVerify";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ForgotPassword/ResetPassword";
import VerifyE from "./components/ForgotPassword/VerifyE";
import VerifyMN from "./components/ForgotPassword/VerifyMN";
import HistoryPage from "./components/HistoryPage/HistoryPage";
import HistoryPageEmpty from "./components/HistoryPage/HistoryPageEmpty";
import HomePage from "./components/HomePage/HomePage";
import LandingPage from "./components//LandingPage/Landing";
import LandingPageAbout from "./components/LandingPageAbout/LandingPageAbout";
import LandingPageContact from "./components/LandingPageContact/LandingPageContact";
import LoginPage from "./components/LoginPage/LoginPage";
import MentoringSessionPage from "./components/MentoringSession/MentoringSession";
import MentoringSessionEmpty from "./components/MentoringSession/MentoringSessionEmpty";
import MentorsFilter from "./components/MentorsFilter/Filters";
import Mentors from "./components/MentorsPage/Mentors";
import MobileAuthentication from "./components/MobileAuthentication/MobileAuthentication";
import Notification from "./components/Notification/Notification";
import Register from "./components/Register/Register";
import Request from "./components/Request/Request";
import SettingPage from "./components/SettingPage/SettingPage";
import UserProfile from "./components/UserProfile/UserProfile";
import UserProfileEmptyView from "./components/UserProfile/UserProfileEmptyView";
import UserProfileOtherUsers from "./components/UserProfile/UserProfileOtherUsers";
import VerificationPage from "./components/Verification/VerificationPage";
import WeeklySchedulePage from "./components/WeeklySchedulePage/WeeklySchedulePage";
import UnderConstructionWeeklySchedulePage from "./components/WeeklySchedulePage/UnderConstructionWeeklySchedulePage";
import WeeklySchedulePageNotMenter from "./components/WeeklySchedulePageNotMenter/WeeklySchedulePageNotMenter";
import HandleAuth from "./utils/HandleAuth";
import DeleteAccount from "./components/SettingPage/DeleteAccount";
import ContactUs from "./components/SettingPage/ContactUs";
import ChangePassword from "./components/SettingPage/ChangePassword";
import MentorReview from "./components/BeAMentor/MentorReview";
import ReceviedMentroingSession from "./components/MentoringSession/ReceviedMentroingSession";
import ScheduledMentoringSessions from "./components/MentoringSession/ScheduledMentoringSessions";
import ConductedHistory from "./components/HistoryPage/ConductedHistory";
import BuyVoucher from "./components/LandingPageBuyVoucher/BuyVoucher";
import EmptyRecievedSession from "./components/MentoringSession/EmptyRecievedSession";
import HistoryPageEmptyUser from "./components/HistoryPage/HistoryPageEmptyUser";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route >
          <Route path="/home" element={<HomePage />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/mentoringSession" element={<MentoringSessionPage />} />
          <Route path="/beAMentor" element={<BeAMentor />} />
          <Route path="/userProfile" element={<UserProfileEmptyView />} />
        </Route>

        <Route path="/WeeklySchedulePage" element={<WeeklySchedulePage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/buyVoucher" element={<BuyVoucher />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/verifyE" element={<VerifyE />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/emailVerify" element={<EmailVerify />} />
        <Route path="/verifyMN" element={<VerifyMN />} />
        <Route path="/historyPage" element={<HistoryPage />} />
        <Route path="/historyPageEmpty" element={<HistoryPageEmpty />} />
        <Route path="/historyPageEmptyUser" element={<HistoryPageEmptyUser />} />

        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
       
        <Route path="/landingPageAbout" element={<LandingPageAbout />} />
        <Route path="/landingPageContact" element={<LandingPageContact />} />
        <Route
          path="/mentoringSessionEmpty"
          element={<MentoringSessionEmpty />}
        />

        <Route
          path="/EmptyRecievedSessionUser"
          element={<EmptyRecievedSession />}
        />          
        

        <Route path="/mentors" element={<Mentors />} />
        <Route path="/mentorsFilter" element={<MentorsFilter />} />

        <Route
          path="/mobileAuthentication"
          element={<MobileAuthentication />}
        />
        <Route path="/notification" element={<Notification />} />
        <Route path="/request" element={<Request />} />

        <Route
          path="/userProfileOtherUsers"
          element={<UserProfileOtherUsers />}
        />
        <Route path="/verificationPage" element={<VerificationPage />} />
        <Route
          path="/underConstructionWeeklySchedulePage"
          element={<UnderConstructionWeeklySchedulePage />}
        />
        <Route
          path="/weeklySchedulePageNotMenter"
          element={<WeeklySchedulePageNotMenter />}
        />
        <Route path="/settingDeleteAccount" element={<DeleteAccount />} />
        <Route path="/settingContactUs" element={<ContactUs />} />
        <Route path="/changePass" element={<ChangePassword />} />
        <Route path="/applyMentorReview/:userId" element={<MentorReview />} />
        <Route path="/receviedmentor" element={<ReceviedMentroingSession />} />
        <Route path="/schduldmentor" element={<ScheduledMentoringSessions />} />
        <Route path="/conducted" element={<ConductedHistory />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
