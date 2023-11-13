import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';


export const Routing=()=>{
    return(
        <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/bajs" element={<LoginPage />} />
        </Routes>
      </Router>
    )
}

export default Routing