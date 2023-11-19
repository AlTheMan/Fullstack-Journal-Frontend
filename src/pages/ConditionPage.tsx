import React, { useState, useEffect } from "react";
import { fetchConditions } from "../api/PatientConditionsApi";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import NavBar from "../components/NavBar";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";

const ConditionPage: React.FC = () => {
  const [conditions, setConditions] = useState<ConditionCollection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  //id från routing
  const location = useLocation();
  const patientId = location.state?.patientId;

  useEffect(() => {
    
    var id = Number(localStorage.getItem("id"));
    if(patientId){
        id=patientId; 
    }
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
        } else {
          setError("Data not found");
        }
      } catch (error) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    loadConditions();
  }, []); // Add any dependencies here if necessary

  if (error) return <>{error}</>;
  if (loading || !conditions)
    return (
      <>
        <NavBar></NavBar>
        <LoadingSpinner></LoadingSpinner>
      </>
    );

  var conditionList = conditions.conditionDTOS;
  for (let index = 0; index < conditionList.length; index++) {
    const item = conditionList[index];
    item.id = index;
  }

  const columns: TableColumn[] = [
    { id: "bodySite", label: "Body Site" },
    { id: "clinicalStatus", label: "Clinical Status" },
    { id: "category", label: "Category" },
    { id: "evidence", label: "Evicence" },
    { id: "verificationStatus", label: "Verification Status" },
    { id: "code", label: "Code" },
  ];

  const data: TableData[] = conditionList.map((conditionList) => ({
    id: conditionList.id,
    values: [
      conditionList.bodySite,
      conditionList.clinicalStatus,
      conditionList.category,
      conditionList.evidence,
      conditionList.verificationStatus,
      conditionList.code,
    ],
  }));

  return (
    <>
      <NavBar></NavBar>
      <div style={{ margin: "20px" }}>
        <h2>Patient Conditions</h2>
      </div>

      <GenericTable columns={columns} data={data}></GenericTable>
    </>
  );
};

export default ConditionPage;
