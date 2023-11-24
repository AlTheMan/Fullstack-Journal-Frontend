// LoginPage.tsx

import LoginForm from '../../components/LoginForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userApiAddress } from '../../api/RequestAddresses';


const LoginPage = () => {
  const navigate = useNavigate(); //för forced-redirect
  const apiAddress = userApiAddress();

  const handleLoginFormSubmit = async (username: string, password: string) => {
    console.log('Submitted from LoginPage:', username, password);

    // Define the data to be sent in the request body
    const requestData = {
      email: username,
      password: password,
    };

      // Make the HTTP POST request using Axios
      const response = await axios.post(apiAddress + '/login', requestData);
      console.log(response.status);
      console.log(response.data);

      if(response.status==200){ //success

        const { privilege, id } = response.data;



        //TODO: kolla response.data==DOCTOR eller response.data==patient (?) kommer inte ihåg om det var patient.
        localStorage.setItem("username",username);
        localStorage.setItem("privilege",privilege);
       

        console.log("username: " + localStorage.getItem("username"));
        console.log("privilege: " + localStorage.getItem("privilege"));
        


        if(privilege==="NEWPATIENT"){
          localStorage.setItem("userId",id);
          console.log("userId: " + localStorage.getItem("userId"));
          navigate('/RegisterPatientPage');
        }
        else if(privilege=="NEWDOCTOR"){
          localStorage.setItem("userId",id);
          console.log("userId: " + localStorage.getItem("userId"));
          navigate('/RegisterStaffPage');
        }
        else if(privilege=="NEWSTAFF"){
          localStorage.setItem("userId",id);
          console.log("userId: " + localStorage.getItem("userId"));
          navigate('/RegisterStaffPage');
        }
        else{
          localStorage.setItem("id",id);
          console.log("id: " + localStorage.getItem("id"));
          navigate('/HomePage');
        }
      }
  };

  const handleRegister = async () => {
    navigate('/RegisterPage');
  }

  return (
    <div>
      <LoginForm onLogin={handleLoginFormSubmit} onRegister={handleRegister}  />
    </div>
  );
};

export default LoginPage;
