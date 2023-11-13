// MessagesPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Message from '../components/Message';
import NavBar from '../components/Navbar';



const MessagesPage = () => {
    type Doctor = {
        id: number; //elr long
        firstName: string;
        lastName: string;
      };
      const [doctors, setDoctors] = useState<Doctor[]>([]);

    
  useEffect(() => {

    const fetchData = async () => {
        const response = await axios.get('http://localhost:8080/messages/getAllDoctors');
        if (response.status === 200) {
          console.log(response.data);
          const doctorData: Doctor[] = response.data;
          setDoctors(doctorData);
        }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once (equivalent to componentDidMount)

  return (
    <>
    <NavBar></NavBar>
    <div>{/* Render the list of doctors */}
    <h2>List of Doctors:</h2>
    <ul>
        {doctors.map((doctor: Doctor) => (
        <li key={doctor.id}>
            {`${doctor.firstName} ${doctor.lastName} (ID: ${doctor.id})`}
        </li>
        ))}
    </ul>
    </div>
    </>
  );
};

export default MessagesPage;
