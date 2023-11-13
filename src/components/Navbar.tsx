import Button from '../components/Button';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <Link to="/HomePage">
                <Button onClick={() => console.log('Home clicked')}>Home</Button>
            </Link>
           <Link to="/MessagesPage">
                <Button onClick={() => console.log('Messages clicked')}>Messages</Button>
            </Link>
            <Link to="/reg">
                <Button onClick={() => console.log('Conditions clicked')}>Conditions</Button>
            </Link>
            <Link to="/reg">
                <Button onClick={() => console.log('Encounter clicked')}>Encounter </Button>
            </Link>
            <Link to="/reg">
                <Button onClick={() => console.log('Observation clicked')}>Observation </Button>
            </Link>
        </div>
      );
    };
    
    export default NavBar;