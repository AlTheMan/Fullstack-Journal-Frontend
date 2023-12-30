import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/LoginPage";
import MessagesPage from "./pages/MessagesPage";
import ConditionPage from "./pages/ConditionPage";
import ObservationPage from "./pages/ObservationPage";
import RegisterPage from "./pages/login/RegisterPage";
import EncounterPage from "./pages/EncounterPage";
import RegisterPatientPage from "./pages/login/RegisterPatientPage";
import RegisterStaffPage from "./pages/login/RegisterStaffPage";
import NotePage from "./pages/NotePage";
import DoctorSelect from "./pages/DoctorSelect";
import StaffSelect from "./pages/StaffSelect";
import PatientNotes from "./pages/PatientNotes";
import AddObservation from "./pages/AddObservation";
import AddEncounter from "./pages/AddEncounter";
import AddCondition from "./pages/AddCondition";
import ImagePage from "./pages/images/ImagePage";
import SearchPage from "./pages/search/SearchPage";
import SearchPatientPage from "./pages/search/SearchPatientPage";
import SearchEncounterPage from "./pages/search/SearchEncounterPage";
import ChatRoom from "./pages/message/ChatRoom";

export const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/MessagesPage" element={<ChatRoom />} />
        <Route path="/ConditionPage" element={<ConditionPage />} />
        <Route path="/EncounterPage" element={<EncounterPage />} />
        <Route path="/NotePage" element={<NotePage />} />
        <Route path="/ObservationPage" element={<ObservationPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/RegisterPatientPage" element={<RegisterPatientPage />} />
        <Route path="/RegisterStaffPage" element={<RegisterStaffPage />} />
        <Route path="/DoctorSelect" element={<DoctorSelect />} />
        <Route path="/StaffSelect" element={<StaffSelect />} />
        <Route path="/PatientNotes" element={<PatientNotes />} />
        <Route path="/AddObservation" element={<AddObservation />} />
        <Route path="/AddEncounter" element={<AddEncounter />} />
        <Route path="/AddCondition" element={<AddCondition />} />
        <Route path="/ImagePage" element={<ImagePage />} />
        <Route path="/SearchPage" element={<SearchPage />} />
        <Route path="/SearchPatientPage" element={<SearchPatientPage />} />
        <Route path="/SearchEncounterPage" element={<SearchEncounterPage />} />
      </Routes>
    </Router>
  );
};

export default Routing;
