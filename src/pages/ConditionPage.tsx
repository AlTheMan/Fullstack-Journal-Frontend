import React, { useState, useEffect } from "react";
import { fetchConditions } from "../api/PatientConditionsApi";
import NavBar from "../components/Navbar";
import GenericTable from "../components/GenericTable";
import { Box, padding } from "@mui/system";

const ConditionPage: React.FC = () => {
  const [conditions, setConditions] = useState<ConditionCollection | null>(
    null
  );

  const id: number = Number(localStorage.getItem("id")) || -1;
  const username: string = String(localStorage.getItem("username") || "");

  if (id === -1 || username.length == 0) return <> Something went wrong.. </>;

  useEffect(() => {
    const loadConditions = async () => {
      const conditionData = await fetchConditions(username, id);
      if (conditionData) {
        setConditions(conditionData);
      }
    };

    loadConditions();
  }, []);

  if (!conditions) {
    return <>No conditions found</>;
  }

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
      <div style={{margin: "20px"}}>
      <h2>Patient Conditions</h2>
      </div>
      
      
      <GenericTable columns={columns} data={data}></GenericTable>
    </>
  );
};

export default ConditionPage;
