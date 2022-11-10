import {
    Routes,
    Route,
    BrowserRouter,
    Outlet,
    Navigate,
} from "react-router-dom";
import React from "react";
import LandingPage from "../Components/LandingPage/LandingPage";
import Auth from "../Components/AuthPage/Auth";
import CandidateOnboarding from "../Components/Candidate/CandidateOnboarding/CandidateOnboarding";
import CandidateProfile from "../Components/Candidate/CandidateProfile/CandidateProfile";
import CandidateJobs from "../Components/Candidate/CandidateJobs/CandidateJobs";
import CandidateConversation from "../Components/Candidate/CandidateConversation/CandidateConversation";
import Applications from "../Components/Candidate/Applications/Applications";
import EmployerOnboarding from "../Components/Employer/Onboarding/EmployerOnboarding";
import EmployerProfile from "../Components/Employer/Profile/EmployerProfile";
import EmployerJobs from "../Components/Employer/Jobs/EmployerJobs";
import EmployerConversation from "../Components/Employer/Conversation/EmployerConversation";
import Applicants from "../Components/Employer/Applicants/Applicants";
function NavPage() {
    const CandidateProtectedRoutes = () => {

        if ("a" === "a") {
            return <Outlet />;
        } else {
            return <Navigate to="/" />;
        }
    };

    const EmployerProtectedRoutes = () => {
        if ("a" === "a") {
            return <Outlet />;
        } else {
            return <Navigate to="/" />;
        }
    }


    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route element={<CandidateProtectedRoutes />}>
                <Route
                    path="/candidateOnboarding"
                    element={<CandidateOnboarding />}
                />
                <Route path="candidate/profile" element={<CandidateProfile />} />
                <Route path="candidate/jobs" element={<CandidateJobs />} />
                <Route
                    path="candidate/conversation"
                    element={<CandidateConversation />}
                />
                <Route path="candidate/application" element={<Applications />} />
            </Route>
            <Route element={<EmployerProtectedRoutes />}>
                <Route path="/employer/onboarding" element={<EmployerOnboarding />} />
                <Route path="employer/profile" element={<EmployerProfile />} />
                <Route path="employer/jobs" element={<EmployerJobs />} />
                <Route
                    path="employer/conversation"
                    element={<EmployerConversation />}
                />
                <Route path="employer/applicants" element={<Applicants />} />
            </Route>
        </Routes>   
    );
}

export default NavPage;