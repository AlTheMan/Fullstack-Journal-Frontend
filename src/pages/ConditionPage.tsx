import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import DoctorButton from "../components/DoctorButton";
import "../App.css"
import { useNavigate } from "react-router-dom";
import {useFetchConditions} from "../api/patient/conditions/UseFetchConditions.ts";


const ConditionPage: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const conditionData = useFetchConditions(selectedPatient?.id)

  const [conditions, setConditions] = useState<Condition[] | null>([]);
  
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
    if (conditionData) {
      setConditions(conditionData)
    }
  }, [conditionData, selectedPatient]);



  const conditionList = conditions ?? [];

  const columns: TableColumn[] = [
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
      {!conditions ? (
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

