import Button from '../components/Button';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/HomePage" className="navbar-brand">
          <Button onClick={() => console.log('Home clicked')}>Home</Button>
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/MessagesPage" className="nav-link">
                <Button onClick={() => console.log('Messages clicked')}>Messages</Button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ConditionPage" className="nav-link">
                <Button onClick={() => console.log('Conditions clicked')}>Conditions</Button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/reg" className="nav-link">
                <Button onClick={() => console.log('Encounter clicked')}>Encounter</Button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ObservationPage" className="nav-link">
                <Button onClick={() => console.log('Observation clicked')}>Observation</Button>
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/LoginPage" className="nav-link">
            <Button onClick={() => console.log('Logout clicked')}>Logout</Button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
