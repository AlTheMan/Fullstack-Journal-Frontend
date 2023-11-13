// LoginPage.tsx
import React from 'react';
import Button from '../components/Button';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const handleLoginFormSubmit = (username: string, password: string) => {
    // Handle the form submission logic here
    console.log('Submitted from LoginPage:', username, password);
  };

  return (
    <div>
      <LoginForm onSubmit={handleLoginFormSubmit} />
    </div>
  );
};

export default LoginPage;
