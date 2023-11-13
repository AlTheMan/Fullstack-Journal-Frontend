// MessagesPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Message from '../components/Message';
import NavBar from '../components/Navbar';
import ListGroupGeneric from '../components/ListGroupGeneric';



const MessagesPage = () => {
    type Doctor = {
        id: number; //elr long
        firstName: string;
        lastName: string;
        privilege: 'STAFF' | 'DOCTOR';
      };
      const [doctors, setDoctors] = useState<Doctor[]>([]);

      
      type Message ={
            id: number;
            time: Date;
            employeeId: number;
            patientId: number;
            sentById: number;
            message: string;
      };
      const [messages, setMessages] = useState<Message[]>([]);



      const handleSelectDoctor=(id:number ) =>{
        console.log("staff/doctor id:" + id);
        

        const fetchData = async (employeeId: number, patientId: number) => {
            const response = await axios.get('http://localhost:8080/messages/get',{
                params: {
                    employeeId,
                    patientId,
                },
            });
            if (response.status === 200) {
              console.log(response.data);
              const messageData: Message[] = response.data;
              setMessages(messageData);
            }
        };
        //fetchData(id, localStorage.getItem("username")); //TODO: hämta meddelanden från användarnamn istället, alt. returnera userId när man loggar in.

      }



    
  useEffect(() => {

    const fetchData = async () => {
        const response = await axios.get('http://localhost:8080/messages/getAllStaff');
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
            <ListGroupGeneric<Doctor>
                items={doctors}
                getKey={(doctor) => doctor.id.toString()}
                getLabel={(doctor) => `${doctor.firstName} ${doctor.lastName} (ID: ${doctor.id}) ${doctor.privilege}`}
                onSelectItem={(doctor) => handleSelectDoctor(doctor.id)}
            />
        </ul>
        <ul>

        </ul>
    </div>
    </>
  );
};

export default MessagesPage;



/* alternativt:
{doctors.map((doctor: Doctor) => (
        <li key={doctor.id}
        onClick={()=> {
            setSelectedIndex(doctor.id);
            handleSelectDoctor(doctor.id);
        }}
        className={selectedIndex===doctor.id ? 'list-group-item active': 'list-group-item'}
        >
            {`${doctor.firstName} ${doctor.lastName} (ID: ${doctor.id}) ${doctor.privilege} `}
        </li>
        ))}


        */