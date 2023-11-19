import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MessagesPage from './pages/MessagesPage';
import ConditionPage from './pages/ConditionPage';
import ObservationPage from './pages/ObservationPage';
import RegisterPage from './pages/RegisterPage';
import EncounterPage from './pages/EncounterPage';
import RegisterPatientPage from './pages/RegisterPatientPage';
import RegisterStaffPage from './pages/RegisterStaffPage';


export const Routing=()=>{
    return(
        <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/MessagesPage" element={<MessagesPage />} />
          <Route path='/ConditionPage' element={<ConditionPage />} />
          <Route path='/EncounterPage' element={<EncounterPage/>} />
          <Route path='/ObservationPage' element={<ObservationPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
          <Route path="/RegisterPatientPage" element={<RegisterPatientPage />} />
          <Route path="/RegisterStaffPage" element={<RegisterStaffPage />} />
        </Routes>
      </Router>
    )
}

export default Routing