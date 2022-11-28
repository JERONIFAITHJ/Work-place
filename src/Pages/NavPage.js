import {
    Routes,
    Route,
    Outlet,
    Navigate,
} from "react-router-dom";
import React, { useContext } from "react";
import LandingPage from "../Components/LandingPage/LandingPage";
import Auth from "../Components/AuthPage/Auth";
import CandidateOnboarding from "../Components/Candidate/CandidateOnboarding/CandidateOnboarding";
import CandidateProfile from "../Components/Candidate/CandidateProfile/CandidateProfile";
import CandidateJobs from "../Components/Candidate/CandidateJobs/CandidateJobs";
import Applications from "../Components/Candidate/Applications/Applications";
import EmployerOnboarding from "../Components/Employer/Onboarding/EmployerOnboarding";
import EmployerProfile from "../Components/Employer/Profile/EmployerProfile";
import EmployerJobs from "../Components/Employer/Jobs/EmployerJobs";
import EmployerConversation from "../Components/Employer/Conversation/EmployerConversation";
import Applicants from "../Components/Employer/Applicants/Applicants";
import CandidateNavbar from "../Components/UI/CandidateNavbar";
import EmployerNavbar from "../Components/UI/EmployerNavbar";
import CandidateConversation from "../Components/Candidate/CandidateConversation/CandidateConversation";
import { UserInfoContext } from "../Components/Context/UserInfoContext";
function NavPage() {
    const [userContext] = useContext(UserInfoContext);
    const CandidateProtectedRoutes = () => {
        if (userContext && userContext.dbData?.userType === "candidate") {
            return <Outlet />;
        } else {
            return <Navigate to="/" />;
        }
    };

    const EmployerProtectedRoutes = () => {
        if (userContext && userContext.dbData?.userType === "employer") {
            return <Outlet />;
        } else {
            return <Navigate to="/" />;
        }
    }

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="candidate/auth" element={<Auth user='candidate' />} />
            <Route path="employer/auth" element={<Auth user='employer' />} />
            <Route
                path="candidate/onboarding"
                element={<CandidateOnboarding />}
            />
            <Route element={<CandidateProtectedRoutes />}>
                <Route path="candidate/profile" element={<CandidateNavbar><CandidateProfile /></CandidateNavbar>} />
                <Route path="candidate/jobs" element={<CandidateNavbar><CandidateJobs /></CandidateNavbar>} />
                <Route
                    path="candidate/conversation"
                    element={<CandidateNavbar><CandidateConversation /></CandidateNavbar>}
                />
                <Route path="candidate/applications" element={<CandidateNavbar><Applications /></CandidateNavbar>} />
            </Route>
            <Route path="employer/onboarding" element={<EmployerOnboarding />} />
            <Route element={<EmployerProtectedRoutes />}>
                <Route path="employer/profile" element={<EmployerNavbar><EmployerProfile isEdit={true} /></EmployerNavbar>} />
                <Route path="employer/jobs" element={<EmployerNavbar><EmployerJobs /></EmployerNavbar>} />
                <Route
                    path="employer/conversation"
                    element={<EmployerNavbar><EmployerConversation /></EmployerNavbar>}
                />
                <Route path="employer/applicants" element={<EmployerNavbar><Applicants /></EmployerNavbar>} />
            </Route>
            <Route path="*" element={<Navigate to='/' replace />} />
        </Routes>
    );
}

export default NavPage;