//RegisterPage.tsx

import React from 'react';
import Button from '../components/Button';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import RegisterPatientForm from '../components/RegisterPatientForm';


const RegisterPatientPage = () => {
  const navigate = useNavigate(); //för forced-redirect

  const handleRegisterFormSubmit = async (username: string, password: string, userPrivilege:string) => {
    
    // Convert userPrivilege to uppercase
    const userPrivilegeUpperCase = userPrivilege.toUpperCase();
    console.log('Submitted from RegisterPage:', username, password, userPrivilegeUpperCase);

    // Define the data to be sent in the request body
    const requestData = {
      username: username,
      password: password,
      userPrivilege: userPrivilegeUpperCase
    };
        console.log("trying to send POST with following information: " + username + ", " + password+ ", " + userPrivilege)

      // Make the HTTP POST request using Axios
      const response = await axios.post('http://localhost:8080/user/registerUser', requestData);
      console.log(response.status);
      console.log(response.data);

      if(response.status==200){ //success
        console.log("sucessfully registered account!")
        navigate('/LoginPage');
      }
      

  };

  return (
    <div>
      <RegisterPatientForm onSubmit={handleRegisterFormSubmit} />
    </div>
  );
};

export default RegisterPatientPage;
