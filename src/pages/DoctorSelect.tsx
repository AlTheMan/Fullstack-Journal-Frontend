import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import NavBarDoctor from "../components/NavBarDoctor";
import "../App.css";

const DoctorSelect: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPatient = localStorage.getItem("currentPatient");
    if (storedPatient) {
      const patientData: Patient = JSON.parse(storedPatient);
      setSelectedPatient(patientData);
    }
  }, []);

  const handleNavigate = (path: string) => {
    if (selectedPatient) {
      navigate(path);
    }
  };

  return (
    <div>
      <NavBarDoctor></NavBarDoctor>
      <div className="horizontalCenterWithTopMargin">
        Current patient: {selectedPatient?.firstName}{" "}
        {selectedPatient?.lastName}
      </div>

      <div className="horizontalCenterWithTopMargin">
        <Button onClick={() => handleNavigate("/PatientNotes")}>Notes</Button>
        <Button onClick={() => handleNavigate("/ConditionPage")}>Conditions</Button>
        <Button onClick={() => handleNavigate("/EncounterPage")}>Encounters</Button>
        <Button onClick={() => handleNavigate("/ObservationPage")}>Observations</Button>
        <Button onClick={() => handleNavigate("/ImagePage")}>Images</Button>

      </div>
    </div>
  );
};

export default DoctorSelect;
