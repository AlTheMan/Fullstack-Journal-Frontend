import { fetchData } from "../api/namedPersonApi";
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import ListGroupGeneric from '../components/ListGroupGeneric';
import axios from 'axios';
import { Patient } from "../types/Patient";


const DoctorHome: React.FC = () => {
  const [doctor, setDoctor] = useState<NamedPerson | null>(null);

  const id: number = Number(localStorage.getItem("id")) || -1;

  useEffect(() => {
    const loadDoctor = async () => {
      const doctorData = await fetchData(id);
      if (doctorData) {
        setDoctor(doctorData);
      }
    };

    loadDoctor();
  }, []);

  var patientId = 11;

  const [patients, setPatients] = useState<Patient[]>([]);

    const handleSelectPerson=(patientId:number ) =>{
        const myId: number = Number(localStorage.getItem("id")) || -1; //ifall att numret är null så sätts värdet till "-1"
        console.log("my id: " + myId)
        const privilege: string = localStorage.getItem("privilege") || "";
    }


    useEffect(() => {
        const fetchData2 = async () => {
            const response = await axios.get('http://localhost:8080/patient/get_all');
            if (response.status === 200) {
                console.log(response.data);
                const patientData: Patient[] = response.data;
                setPatients(patientData);
            }
        };
        fetchData2();
        }, []); // Empty dependency array to run the effect only once (equivalent to componentDidMount)        

 

return (
    <div>
      <h1>
        Welcome: Dr {doctor?.firstName} {doctor?.lastName}
      </h1>
      <Link to={`/NotePage/${patientId}`} className="nav-link">
        <Button onClick={() => console.log(`Patient id: ${patientId}`)}>
         Add note
        </Button>
       
      </Link>
       <div style={{ paddingBottom: '100px', backgroundColor: 'transparent'}}> {/* Add padding to bottom equal to the height of the fixed form */}
        <h2>List of Patients:</h2>
        <div style={{ overflowY: 'auto', height: 'calc(100vh - 100px)' }}> {/* Make this div scrollable */}
            <ul>
                <ListGroupGeneric<Patient>
                    items={patients}
                    getKey={(patient) => patient.patientId.toString()}
                    getLabel={(patient) => `${patient.firstName} ${patient.familyName} (ID: ${patient.patientId})`}
                    onSelectItem={(patient) => handleSelectPerson(patient.patientId)}
                />
            </ul>
        </div>
    </div>
    </div>
  );
};

export default DoctorHome;
