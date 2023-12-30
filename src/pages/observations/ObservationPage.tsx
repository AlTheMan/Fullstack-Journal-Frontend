import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar.tsx";
import GenericTable from "../../components/GenericTable.tsx";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import DoctorButton from "../../components/DoctorButton.tsx";
import { useNavigate } from "react-router-dom";
import {useFetchObservations} from "../../api/patient/observations/UseFetchObservations.ts";


const ObservationPage: React.FC = () => {
  
  
  
  const [observations, setObservations] =
    useState<Observation[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const observationData = useFetchObservations(selectedPatient?.id)
  const navigate = useNavigate();

  const handleObservationButton = () => {
    navigate("/AddObservation");
  }

  useEffect(() => {
    const storedPatient = localStorage.getItem("currentPatient")
    if (storedPatient) {
        const patientData: Patient = JSON.parse(storedPatient)
        setSelectedPatient(patientData);
    }
}, []);

  useEffect(() => {
    setLoading(true)
    if (observationData){
      setObservations(observationData)
    }
    setLoading(false)
  }, [observationData, selectedPatient]);


  const observationList = observations ?? [];

  const columns: TableColumn[] = [
    { id: "description", label: "Description" },
    { id: "value", label: "Value" },
    { id: "unit", label: "Unit" },
  ];

  const data: TableData[] = observationList.map((observationList) => ({
    id: observationList.id,
    values: [
      observationList.description,
      observationList.value,
      observationList.unit,
    ],
  }));

  return (
    <>
      <NavBar />
      <div className="horizontalCenterWithTopMargin">
        <DoctorButton
          children="Add Observation"
          onClick={handleObservationButton}/>
      </div>
      {loading || observations === null ? (
        <LoadingSpinner />
      ) : (
        <>
          <div style={{ margin: "20px" }}>
            <h2>Patient Conditions</h2>
          </div>

          <GenericTable columns={columns} data={data} />
        </>
      )}
    </>
  );
};

export default ObservationPage;
