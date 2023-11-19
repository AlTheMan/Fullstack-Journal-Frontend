//RegisterPage.tsx

import React from 'react';
import Button from '../components/Button';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import RegisterPatientForm from '../components/RegisterPatientForm';


const RegisterPatientPage = () => {
  const navigate = useNavigate(); //för forced-redirect

  const handleRegisterFormSubmit = async (firstName: string, familyName: string, birthdate: string, sex:'MALE'|'FEMALE',) => {
    
    
    console.log('Submitted from RegisterPage:', firstName, familyName, sex, birthdate);

    // Define the data to be sent in the request body
    const requestData = {
      firstName: firstName,
      familyName: familyName,
      sex:sex,
      userId:localStorage.getItem("userId"),
      birthdate:birthdate
    };
        console.log("trying to send POST with following information: " + firstName + ", " + familyName + ", userId:" + localStorage.getItem("userId")+", "+ birthdate)

      // Make the HTTP POST request using Axios
      const response = await axios.post('http://localhost:8080/patient/add', requestData);
      const { id } = response.data;
      console.log(response.status);
      console.log(response.data);

      if(response.status==200){ //success
        console.log("sucessfully registered account!")
        localStorage.setItem("id",id);
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
