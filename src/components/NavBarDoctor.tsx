import Button from '../components/Button';
import { Link } from 'react-router-dom';

const NavBarDoctor = () => {
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
          </ul>
        </div>
        <Link to="/LoginPage" className="nav-link">
            <Button onClick={() => console.log('Logout clicked')}>Logout</Button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBarDoctor;
