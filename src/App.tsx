
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}
/*   <div className='App'> <HomePage></HomePage></div> */
export default App
