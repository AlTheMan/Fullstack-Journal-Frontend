import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect } from "react";
import { fetchData } from "../api/PatientConditionsApi";

const ConditionPage: React.FC = () => {
  const [conditions, setConditions] = useState<ConditionCollection | null>(
    null
  );

  const id: number = Number(localStorage.getItem("id")) || -1;
  const username: string = String(localStorage.getItem("username") || "");

  if (id === -1 || username.length == 0) return <> Something went wrong.. </>;

  useEffect(() => {
    const loadConditions = async () => {
      const conditionData = await fetchData(username, id);
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

  return (
    <>
    <h2>Patient Conditions</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Body Site</TableCell>
            <TableCell>Clinical Status</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Evidence</TableCell>
            <TableCell>Verification Status</TableCell>
            <TableCell>Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {conditionList.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.bodySite}
              </TableCell>
              <TableCell>{row.clinicalStatus}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.evidence}</TableCell>
              <TableCell>{row.verificationStatus}</TableCell>
              <TableCell>{row.code}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default ConditionPage;
