import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/LoginPage";
import ConditionPage from "./pages/conditions/ConditionPage.tsx";
import ObservationPage from "./pages/observations/ObservationPage.tsx";
import RegisterPage from "./pages/login/RegisterPage";
import EncounterPage from "./pages/encounters/EncounterPage.tsx";
import RegisterPatientPage from "./pages/login/RegisterPatientPage";
import RegisterStaffPage from "./pages/login/RegisterStaffPage";
import AddNote from "./pages/notes/AddNote.tsx";
import DoctorSelect from "./pages/DoctorSelect";
import StaffSelect from "./pages/StaffSelect";
import Notes from "./pages/notes/Notes.tsx";
import AddObservation from "./pages/observations/AddObservation.tsx";
import AddEncounter from "./pages/encounters/AddEncounter.tsx";
import AddCondition from "./pages/conditions/AddCondition.tsx";
import ImagePage from "./pages/images/ImagePage";
import SearchPage from "./pages/search/SearchPage";
import SearchPatientPage from "./pages/search/SearchPatientPage";
import SearchEncounterPage from "./pages/search/SearchEncounterPage";
import MessagesPage2 from "./pages/message/MessagesPage2.tsx";

export const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/MessagesPage" element={<MessagesPage2 />} />
        <Route path="/ConditionPage" element={<ConditionPage />} />
        <Route path="/EncounterPage" element={<EncounterPage />} />
        <Route path="/AddNote" element={<AddNote />} />
        <Route path="/ObservationPage" element={<ObservationPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/RegisterPatientPage" element={<RegisterPatientPage />} />
        <Route path="/RegisterStaffPage" element={<RegisterStaffPage />} />
        <Route path="/DoctorSelect" element={<DoctorSelect />} />
        <Route path="/StaffSelect" element={<StaffSelect />} />
        <Route path="/Notes" element={<Notes />} />
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
