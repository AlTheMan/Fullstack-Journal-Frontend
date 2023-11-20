import React, { useState, useEffect } from "react";
import { fetchConditions } from "../api/PatientConditionsApi";
import NavBar from "../components/NavBar";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import DoctorButton from "../components/DoctorButton";
import "../App.css"


const handleConditionButton = () => {


}


const ConditionPage: React.FC = () => {
  const [conditions, setConditions] = useState<ConditionCollection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  //id från routing
  

  useEffect(() => {
    const storedPatient = localStorage.getItem("currentPatient")
    if (storedPatient) {
        const patientData: Patient = JSON.parse(storedPatient)
        setSelectedPatient(patientData);
    }
}, []);

  useEffect(() => {
    if (selectedPatient){
      const id = Number(selectedPatient?.patientId)
      const username = localStorage.getItem("username") || "";
  
  
  
      if (id === -1 || username.length === 0) {
        setError("Invalid ID or Username");
        return;
      }
  
      const loadConditions = async () => {
        setLoading(true);
        try {
          const conditionData = await fetchConditions(username, id);
          if (conditionData) {
            setConditions(conditionData);
          } 
        } catch (error) {
          // Handle error
        } finally {
          setLoading(false);
        }
      };
  
      loadConditions();
    }


   
  }, [selectedPatient]); // Add any dependencies here if necessary

  //if (error) return <>{error}</>;

  let conditionList = conditions?.conditionDTOS ?? [];

  // wont this code run if condition is null??
  for (let index = 0; index < conditionList.length; index++) {
    const item = conditionList[index];
    item.id = index;
  }

  let columns: TableColumn[] = [
    { id: "code", label: "Condition code" },
    { id: "bodySite", label: "Body Site" },
    { id: "clinicalStatus", label: "Clinical Status" },
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
      conditionList.category,
      conditionList.evidence,
      conditionList.verificationStatus
    ],
  }));


  



 

  return (
    <>
      <NavBar />
      <div className="horizontalCenterWithTopMargin"><DoctorButton children="Add Condition" onClick={handleConditionButton} /></div>
      {loading || !conditions ? <LoadingSpinner /> : (
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





/*
const conditionList = conditions.conditionDTOS;
  for (let index = 0; index < conditionList.length; index++) {
    const item = conditionList[index];
    item.id = index;
  }

  const columns: TableColumn[] = [
    { id: "code", label: "Condition code" },
    { id: "bodySite", label: "Body Site" },
    { id: "clinicalStatus", label: "Clinical Status" },
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
      conditionList.category,
      conditionList.evidence,
      conditionList.verificationStatus
    ],
  }));

*/
