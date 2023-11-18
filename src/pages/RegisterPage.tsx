//RegisterPage.tsx

import React from 'react';
import Button from '../components/Button';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';


const RegisterPage = () => {
  const navigate = useNavigate(); //för forced-redirect

  const handleRegisterFormSubmit = async (username: string, password: string, role:string) => {
    console.log('Submitted from RegisterPage:', username, password, role);

    // Define the data to be sent in the request body
    const requestData = {
      username: username,
      password: password,
      role: role
    };

      // Make the HTTP POST request using Axios
      const response = await axios.post('http://localhost:8080/user/register', requestData);
      console.log(response.status);
      console.log(response.data);

      if(response.status==200){ //success
        console.log("sucessfully registered account!")
        navigate('/LoginPage');
      }
      

  };

  return (
    <div>
      <RegisterForm onSubmit={handleRegisterFormSubmit} />
    </div>
  );
};

export default RegisterPage;
