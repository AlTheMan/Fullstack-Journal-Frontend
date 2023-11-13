// LoginPage.tsx
import React from 'react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const HomePage = () => {
return (
    <div>
       <Link to="/LoginPage">
        <Button onClick={() => console.log('Login clicked')}>Login</Button>
      </Link>
      <Link to="/reg">
        <Button onClick={() => console.log('Register clicked')}>Register</Button>
        </Link>
    </div>
  );
};

export default HomePage;

/* <Link to="/LoginPage">Login</Link>*/