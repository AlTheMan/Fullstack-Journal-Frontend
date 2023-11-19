// MessagesPage.tsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Message from '../components/Message';
import NavBar from '../components/Navbar';
import MessageForm from '../components/MessageForm';
import ListGroupGeneric from '../components/ListGroupGeneric';
import NavBarDoctor from '../components/NavBarDoctor';



type Patient = {
    patientId: number; 
    firstName: string;
    familyName: string;
    sex: string;
    birthdate: string;
};




const MessagesPage = () => {
   
    const [patients, setPatients] = useState<Patient[]>([]);

    const handleSelectPerson=(otherId:number ) =>{

        const myId: number = Number(localStorage.getItem("id")) || -1; //ifall att numret är null så sätts värdet till "-1"
        console.log("other id:" + otherId);
        console.log("my id: " + myId)
        localStorage.setItem("otherId", otherId.toString());

        const privilege: string = localStorage.getItem("privilege") || "";
        
    }


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8080/patient/get_all');
            if (response.status === 200) {
                console.log(response.data);
                const patientData: Patient[] = response.data;
                setPatients(patientData);
            }
        };
        fetchData();
        }, []); // Empty dependency array to run the effect only once (equivalent to componentDidMount)        

 
   

  return (
    <>
    <NavBarDoctor></NavBarDoctor>
    <div style={{ paddingBottom: '100px', backgroundColor: 'transparent'}}> {/* Add padding to bottom equal to the height of the fixed form */}
        <h2>List of People:</h2>
        <div style={{ overflowY: 'auto', height: 'calc(100vh - 100px)' }}> {/* Make this div scrollable */}
            <ul>
                //Visar patientlista
                <ListGroupGeneric<Patient>
                    items={patients}
                    getKey={(patient) => patient.patientId.toString()}
                    getLabel={(patient) => `${patient.firstName} ${patient.familyName} (ID: ${patient.patientId})`}
                    onSelectItem={(patient) => handleSelectPerson(patient.patientId)}
                />
            </ul>
        </div>
    </div>
    </>
  );
};

export default MessagesPage;

