
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';


const NavBarDoctor = () => {

  const { keycloak } = useKeycloak()


  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <Button onClick={() => console.log('Home clicked')}>Home</Button>
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/MessagesPage" className="nav-link">
                <Button onClick={() => console.log('Messages clicked')}>Messages</Button>
              </Link>
            </li>
            <li>
            <Link to="/SearchPage" className="nav-link">
                <Button onClick={() => console.log('SearchPage clicked')}>Search</Button>
              </Link>
              </li>
          </ul>
        </div>
       
            <Button onClick={() =>{keycloak.logout()}}>Logout</Button>
    
      </div>
    </nav>
  );
};

export default NavBarDoctor;
