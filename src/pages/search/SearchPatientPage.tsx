
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListGroupGeneric from "../../components/ListGroupGeneric";
import fetchData from "../../api/NamedPersonApi";
import { RequestTimer } from "../../api/RequestTimer";
import { getPatientsByName } from "../../api/GetPatientsByName";
import PatientList from "./PatientList";
import NavBar from "../../components/NavBar";
import { Button } from "react-bootstrap";
import { getPatientsByDoctorId } from "../../api/GetPatientsByDoctorId";
import { getPatientsByConditionCode } from "../../api/GetPatientsByConditionCode";
import { getPatientsByConditionBodySite } from "../../api/getPatientsByConditionBodySite";

const SearchPatientPage: React.FC = () => {
  const [doctor, setDoctor] = useState<Staff | null>(null);

  const id: number = Number(localStorage.getItem("id")) || -1;
  const [searchInputPatientName, setSearchInputPatientName] = useState<string>("");
  const [searchInputConditionCode, setSearchInputConditionCode] = useState<string>("");
  const [searchInputConditionBodySite, setSearchInputConditionBodySite] = useState<string>("");


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

  const handleSearchChangePatientName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputPatientName(e.target.value);
  };

  const handleSearchChangeConditionCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputConditionCode(e.target.value);
  };
  const handleSearchChangeConditionBodySite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputConditionBodySite(e.target.value);
  };

  function setPatientData(patientData: Patient[] | null){
    if (patientData) {
        setPatients(patientData);
      } else {
        setPatients([]);
      }
  }

  const handleSearchSubmitPatientName = async (e: React.FormEvent) => {
    e.preventDefault();
    const patientData = await getPatientsByName(searchInputPatientName);
    setPatientData(patientData);
  };

  const handleSearchSubmitConditionCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const patientData = await getPatientsByConditionCode(searchInputConditionCode);
    setPatientData(patientData);
  };

  const handleSearchSubmitConditionBodySite = async (e: React.FormEvent) => {
    e.preventDefault();
    const patientData = await getPatientsByConditionBodySite(searchInputConditionBodySite);
    setPatientData(patientData);
  };

  const handleRetreiveDoctorPatients = async (e: React.FormEvent) => {
    e.preventDefault();
    const patientData = await getPatientsByDoctorId(id);
    setPatientData(patientData);
  };

  return (
    <>
    <NavBar></NavBar>
    <div>
      <h1>Welcome: {doctor?.firstName} {doctor?.lastName}</h1>
      <Button onClick={handleRetreiveDoctorPatients}>  
        Retreive my patients
      </Button>
      <form onSubmit={handleSearchSubmitPatientName}>
        <input type="text" value={searchInputPatientName} onChange={handleSearchChangePatientName} placeholder="Patient name" />
        <button type="submit">Search</button>
      </form>
      <form onSubmit={handleSearchSubmitConditionCode}>
        <input type="text" value={searchInputConditionCode} onChange={handleSearchChangeConditionCode} placeholder="Condition code" />
        <button type="submit">Search</button>
      </form>
      <form onSubmit={handleSearchSubmitConditionBodySite}>
        <input type="text" value={searchInputConditionBodySite} onChange={handleSearchChangeConditionBodySite} placeholder="Condition body site" />
        <button type="submit">Search</button>
      </form>
      <PatientList patients={patients} onSelectPerson={handleSelectPerson} />
    </div>
    </>
  );
};

export default SearchPatientPage;
