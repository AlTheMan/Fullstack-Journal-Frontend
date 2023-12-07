import React, { useState, useEffect } from "react";
import { fetchConditions } from "../../api/PatientConditionsApi";
import NavBar from "../../components/NavBar";
import GenericTable from "../../components/GenericTable";
import LoadingSpinner from "../../components/LoadingSpinner";
import DoctorButton from "../../components/DoctorButton";
import { useNavigate } from "react-router-dom";


const SearchPage: React.FC = () => {
  const navigate = useNavigate();

  const handlePatientButton = () => {
    navigate("/SearchPatientPage");
  }
  const handleEncounterButton = () => {
    navigate("/SearchEncounterPage");
  }
  
  return (
    <>
      <NavBar />
      <div className="horizontalCenterWithTopMargin">
        <DoctorButton
          children="Search Patient"
          onClick={handlePatientButton}/>
           <DoctorButton
          children="Search Encounters"
          onClick={handleEncounterButton}/>
      </div>
    </>
  );
};

export default SearchPage;

