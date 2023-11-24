import React, { useState, useEffect } from "react";
import { fetchConditions } from "../api/PatientConditionsApi";
import NavBar from "../components/NavBar";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import DoctorButton from "../components/DoctorButton";
import "../App.css"
import { useNavigate } from "react-router-dom";


const ConditionPage: React.FC = () => {
  const [conditions, setConditions] = useState<Condition[] | null>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const navigate = useNavigate();

  const handleConditionButton = () => {
    navigate("/AddCondition");
  }
  

  useEffect(() => {
    const storedPatient = localStorage.getItem("currentPatient")
    if (storedPatient) {
        const patientData: Patient = JSON.parse(storedPatient)
        setSelectedPatient(patientData);
    }
}, []);

  useEffect(() => {
    if (selectedPatient){
      const id = Number(selectedPatient?.id)
      const username = localStorage.getItem("username") || "";
  
      if (id === -1 || username.length === 0) {
        setError("Invalid ID or Username");
        return;
      }
  
      const loadConditions = async () => {
        setLoading(true);
        const conditionData = await fetchConditions(id);
        setConditions(conditionData)
        setLoading(false)
      };
      loadConditions();
    }


   
  }, [selectedPatient]); // Add any dependencies here if necessary

  if (error) return <>{error}</>;

  let conditionList = conditions ?? [];

  let columns: TableColumn[] = [
    { id: "code", label: "Condition code" },
    { id: "bodySite", label: "Body Site" },
    { id: "clinicalStatus", label: "Clinical Status" },
    { id: "severity", label: "Severity"},
    { id: "category", label: "Category" },
    { id: "evidence", label: "Evicence" },
    { id: "verificationStatus", label: "Verification Status" }
  ];

  const data: TableData[] = conditionList.map((conditionList) => ({
    id: conditionList.id,
    values: [
      conditionList.code,
      conditionList.bodySite,
      conditionList.clinicalStatus,
      conditionList.severity,
      conditionList.category,
      conditionList.evidence,
      conditionList.verificationStatus
    ],
  }));

  return (
    <>
      <NavBar />
      <div className="horizontalCenterWithTopMargin">
        <DoctorButton
          children="Add Condition"
          onClick={handleConditionButton}/>
      </div>
      {loading || conditions === null ? (
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

export default ConditionPage;

