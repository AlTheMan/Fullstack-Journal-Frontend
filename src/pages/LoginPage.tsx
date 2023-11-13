// LoginPage.tsx
import React from 'react';
import Button from '../components/Button';
import LoginForm from '../components/LoginForm';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const navigate = useNavigate(); //för forced-redirect

  const handleLoginFormSubmit = async (username: string, password: string) => {
    console.log('Submitted from LoginPage:', username, password);

    // Define the data to be sent in the request body
    const requestData = {
      username: username,
      password: password,
    };

      // Make the HTTP POST request using Axios
      const response = await axios.post('http://localhost:8080/user/login', requestData);
      console.log(response.status);
      console.log(response.data);

      if(response.status==200){ //success
        //TODO: kolla response.data==DOCTOR eller response.data==patient (?) kommer inte ihåg om det var patient.
        localStorage.setItem("username",username);
        localStorage.setItem("privilege",response.data);
        console.log("username: " + localStorage.getItem("username"));
        console.log("privilege: " + localStorage.getItem("privilege"));
        navigate('/HomePage');
      }
      

  };

  return (
    <div>
      <LoginForm onSubmit={handleLoginFormSubmit} />
    </div>
  );
};

export default LoginPage;
