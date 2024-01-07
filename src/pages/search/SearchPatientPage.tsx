
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientList from "./PatientList";
import NavBar from "../../components/NavBar";
import { Button } from "react-bootstrap";
import { searchPatientsByName } from "../../api/search/SearchPatientsByName";
import { searchPatientsByDoctorId } from "../../api/search/SearchPatientsByDoctorId";
import { searchPatientsByConditionCode } from "../../api/search/SearchPatientsByConditionCode";
import { searchPatientsByConditionBodySite } from "../../api/search/SearchPatientsByConditionBodySite";
import { searchPatientsByConditionCategory } from "../../api/search/SearchPatientsByConditionCategory";
import { useKeycloak } from "@react-keycloak/web";
import {useFetchStaffData} from "../../api/staff/UseFetchStaffData.ts";

const SearchPatientPage: React.FC = () => {
  const [doctor, setDoctor] = useState<ReturnedStaffProps | null>(null);

  const id: number = Number(localStorage.getItem("id")) || -1;
  const [searchInputPatientName, setSearchInputPatientName] = useState<string>("");
  const [searchInputConditionCode, setSearchInputConditionCode] = useState<string>("");
  const [searchInputConditionBodySite, setSearchInputConditionBodySite] = useState<string>("");
  const [searchInputConditionCategory, setSearchInputConditionCategory] = useState<string>("");
  const { keycloak } = useKeycloak();
  const staffData = useFetchStaffData(id)
  const navigate = useNavigate();




  useEffect(() => {
    if (staffData){
      setDoctor(staffData)
    }
  }, [id, staffData]);


  const [patients, setPatients] = useState<Patient[]>([]);



  const handleSelectPerson = (patient: Patient) => {
    const privilege: string = localStorage.getItem("privilege") || "";
    localStorage.setItem("currentPatient", JSON.stringify(patient))
    console.log("patient id in doctor home: " + patient.id.toString()); // patient id is a number
    if (privilege == "DOCTOR") {
      navigate("/DoctorSelect");
    }
    if (privilege == "STAFF") {
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
  const handleSearchChangeConditionCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputConditionCategory(e.target.value);
  };

  function setPatientData(patientData: Patient[] | null) {
    if (patientData) {
      setPatients(patientData);
    } else {
      setPatients([]);
    }
  }

  const handleToken = () => {
    keycloak.updateToken(30).then(function () {
    }).catch(function () {
      alert('Failed to refresh token, or the session has expired');
      return
    });
  }

  const handleSearchSubmitPatientName = async (e: React.FormEvent) => {
    e.preventDefault();
    handleToken()
    const patientData = await searchPatientsByName(searchInputPatientName, keycloak.token);
    setPatientData(patientData);
  };

  const handleSearchSubmitConditionCode = async (e: React.FormEvent) => {
    e.preventDefault();
    handleToken()
    const patientData = await searchPatientsByConditionCode(searchInputConditionCode, keycloak.token);
    setPatientData(patientData);
  };

  const handleSearchSubmitConditionBodySite = async (e: React.FormEvent) => {
    e.preventDefault();
    handleToken()
    const patientData = await searchPatientsByConditionBodySite(searchInputConditionBodySite, keycloak.token);
    setPatientData(patientData);
  };

  const handleSearchSubmitConditionCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    handleToken()
    const patientData = await searchPatientsByConditionCategory(searchInputConditionCategory, keycloak.token);
    setPatientData(patientData);
  };

  const handleRetrieveDoctorPatients = async (e: React.FormEvent) => {
    e.preventDefault();
    handleToken()
    const patientData = await searchPatientsByDoctorId(id, keycloak.token);
    setPatientData(patientData);
  };



  return (
    <>
      <NavBar></NavBar>
      <div>
        <h1>Welcome: {doctor?.firstName} {doctor?.lastName}</h1>
        <Button onClick={handleRetrieveDoctorPatients}>
          Retrieve my patients
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
        <form onSubmit={handleSearchSubmitConditionCategory}>
          <input type="text" value={searchInputConditionCategory} onChange={handleSearchChangeConditionCategory} placeholder="Condition category" />
          <button type="submit">Search</button>
        </form>
        <PatientList patients={patients} onSelectPerson={handleSelectPerson} />
      </div>
    </>
  );
};

export default SearchPatientPage;
