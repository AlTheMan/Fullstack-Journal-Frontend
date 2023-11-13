// LoginPage.tsx
import React from 'react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const HomePage = () => {
return (
    <div>
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

export default HomePage;

/* <Link to="/LoginPage">Login</Link>*/