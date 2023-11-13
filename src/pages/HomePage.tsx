// HomePage.tsx
import React from 'react';
import Button from '../components/Button';
import LoginForm from '../components/LoginForm';

const HomePage = () => {
  const handleLoginFormSubmit = (username: string, password: string) => {
    // Handle the form submission logic here
    console.log('Submitted from HomePage:', username, password);
  };

  return (
    <div>
      <Button onClick={() => console.log('Login clicked')}>Login</Button>
      <Button onClick={() => console.log('Register clicked')}>Register</Button>
      <LoginForm onSubmit={handleLoginFormSubmit} />
    </div>
  );
};

export default HomePage;
