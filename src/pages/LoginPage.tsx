// LoginPage.tsx
import React from 'react';
import Button from '../components/Button';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const handleLoginFormSubmit = async (username: string, password: string) => {
    // Handle the form submission logic here
    console.log('Submitted from LoginPage:', username, password);

    try {
      // Define the data to be sent in the request body
      const requestData = {
        username: username,
        password: password,
      };

      // Make the HTTP POST request using fetch
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      //alt:
       // Make the HTTP POST request using Axios
       //const response = await axios.post('http://localhost:8080/user/login', requestData);


      // Check if the request was successful
      if (response.ok) {
        // Parse the response JSON if needed
        const responseData = await response.json();
        console.log('Response from server:', responseData);
      } else {
        // Handle errors
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:');
    }

  };

  return (
    <div>
      <LoginForm onSubmit={handleLoginFormSubmit} />
    </div>
  );
};

export default LoginPage;
