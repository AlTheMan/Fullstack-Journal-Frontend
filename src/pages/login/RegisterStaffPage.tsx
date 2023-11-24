//RegisterStaffPage.tsx

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RegisterStaffForm from '../../components/RegisterStaffForm';
import { userApiAddress } from '../../api/RequestAddresses';



const RegisterStaffPage = () => {
  const navigate = useNavigate(); //för forced-redirect

  const handleRegisterFormSubmit = async (firstName: string, lastName: string) => {
    const apiAddress = userApiAddress();
    
    console.log('Submitted from RegisterPage:', firstName, lastName);

    // Define the data to be sent in the request body
    const requestData = {
      firstName: firstName,
      lastName: lastName,
      userId:localStorage.getItem("userId"),
    };
    console.log("trying to send POST with following information: " + firstName + ", " + lastName + ", userId:" + localStorage.getItem("userId"))
    
    if(localStorage.getItem("privilege")== 'NEWSTAFF'){
        const response = await axios.post(apiAddress+'/registerStaff', requestData);
        const { id } = response.data;
        console.log(response.status);
        console.log(response.data);
        if(response.status==200){ //success
            console.log("sucessfully registered account!")
            localStorage.setItem("id",id);
            localStorage.setItem("privilege",'STAFF');
            navigate('/HomePage');
        }
    }
    else if(localStorage.getItem("privilege")== 'NEWDOCTOR'){
        const response = await axios.post(apiAddress+'/registerStaff', requestData);
        const { id } = response.data;
        console.log(response.status);
        console.log(response.data);
        if(response.status==200){ //success
            console.log("sucessfully registered account!")
            localStorage.setItem("id",id);
            localStorage.setItem("privilege",'DOCTOR');
            navigate('/HomePage');
        }
    }
    else{
        navigate('/LoginPage');
    }
  };

  return (
    <div>
      <RegisterStaffForm onSubmit={handleRegisterFormSubmit} />
    </div>
  );
};

export default RegisterStaffPage;
