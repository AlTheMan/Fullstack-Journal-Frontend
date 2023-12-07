
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListGroupGeneric from "../../components/ListGroupGeneric";
import fetchData from "../../api/NamedPersonApi";
import { RequestTimer } from "../../api/RequestTimer";
import { getPatientsByName } from "../../api/GetPatientsByName";
import PatientList from "./PatientList";

const SearchPatientPage: React.FC = () => {
  const [doctor, setDoctor] = useState<Staff | null>(null);

  const id: number = Number(localStorage.getItem("id")) || -1;
  const [searchInput, setSearchInput] = useState<string>("");


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
    console.log("patient id in doctor home: " + patient.id.toString()); // patient id is a number
    if(privilege=="DOCTOR"){
      navigate("/DoctorSelect");
    }
    if(privilege=="STAFF"){
      navigate("/StaffSelect", { state: { patient } });
    }
   
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const patientData = await getPatientsByName(searchInput);
    if (patientData) {
      setPatients(patientData);
    } else {
      setPatients([]);
    }
  };

  return (
    <div>
      <h1>Welcome: {doctor?.firstName} {doctor?.lastName}</h1>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" value={searchInput} onChange={handleSearchChange} placeholder="Search Patient" />
        <button type="submit">Search</button>
      </form>
      <PatientList patients={patients} onSelectPerson={handleSelectPerson} />
    </div>
  );
};

export default SearchPatientPage;
