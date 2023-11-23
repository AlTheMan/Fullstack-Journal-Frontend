import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import fetchObservations from "../api/PatientObservationsApi";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import DoctorButton from "../components/DoctorButton";
import { useNavigate } from "react-router-dom";


const ObservationPage: React.FC = () => {
  const [observations, setObservations] =
    useState<ObservationCollection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

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
    if (selectedPatient) {
      const id = Number(selectedPatient?.patientId);
      const username = String(localStorage.getItem("username") || null);
  
      if (id === -1 || username === null) {
        setError("Invalid ID or Username");
        return;
      }
  
      const loadObservations = async () => {
        setLoading(true);
        try {
          const observationData = await fetchObservations(username, id);
          if (observationData) {
            setObservations(observationData);
          } else {
            //setError("Data not found");
          }
        } catch (error) {
          //setError("An error occured while fetching data");
        } finally {
          setLoading(false);
        }
      };
  
      loadObservations();
    }
    
   
  }, [selectedPatient?.patientId]);

  if (error) return <>Error + {error}</>;

  const observationList = observations?.observationDTOs ?? [];

  for (let index = 0; index < observationList.length; index++) {
    const item = observationList[index];
    item.id = index;
  }

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
