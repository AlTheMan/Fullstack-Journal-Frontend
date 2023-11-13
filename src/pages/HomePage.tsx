// LoginPage.tsx
import React from 'react';
import Button from '../components/Button';

const HomePage = () => {
return (
    <div>
      <Button onClick={() => console.log('Login clicked')}>Login</Button>
      <Button onClick={() => console.log('Register clicked')}>Register</Button>
    </div>
  );
};

export default HomePage;