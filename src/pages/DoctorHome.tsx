
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListGroupGeneric from "../components/ListGroupGeneric";
import fetchData from "../api/NamedPersonApi";
import { fetchAllPatients } from "../api/GetAllPatientsTimerApi";
import { RequestTimer } from "../api/RequestTimer";

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
  }, [id]);

 
  const [patients, setPatients] = useState<Patient[]>([]);


  const navigate = useNavigate();

  const handleSelectPerson = (patient: Patient) => {
    const privilege: string = localStorage.getItem("privilege") || "";
    localStorage.setItem("currentPatient", JSON.stringify(patient))
    console.log("patient id in doctor home: " + patient.patientId); // patient id is a number
    if(privilege=="DOCTOR"){
      navigate("/DoctorSelect");
    }
    if(privilege=="STAFF"){
      navigate("/StaffSelect", { state: { patient } });
    }
   
  };

  useEffect(() => {
    const canMakeRequest = RequestTimer()
    const storedPatients = localStorage.getItem("patients");
    if (storedPatients) {
      const patientData: Patient[] = JSON.parse(storedPatients);
      setPatients(patientData);
    } else if (canMakeRequest) {
      const getPatients = async () => {
        const patientData = await fetchAllPatients();
        if (patientData){
          setPatients(patientData)
        } else {
          setPatients([])
        }
      };
      getPatients();
     
    }

  }, []);

  return (
    <div>
      <h1>
        Welcome: {doctor?.firstName} {doctor?.lastName}
      </h1>
       <div style={{ paddingBottom: '100px', backgroundColor: 'transparent'}}> {/* Add padding to bottom equal to the height of the fixed form */}
        <h2>List of Patients:</h2>
        <div style={{ overflowY: "auto", height: "calc(100vh - 100px)" }}>
          {" "}
          {/* Make this div scrollable */}
          <ul>
            <ListGroupGeneric<Patient>
              items={patients}
              getKey={(patient) => patient.patientId.toString()}
              getLabel={(patient) =>
                `${patient.firstName} ${patient.familyName} (ID: ${patient.patientId})`
              }
              onSelectItem={(patient) => handleSelectPerson(patient)}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorHome;
