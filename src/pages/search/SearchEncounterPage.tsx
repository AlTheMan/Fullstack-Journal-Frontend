import React, { useState } from "react";
import "../../App.css";
import GenericTable from "../../components/GenericTable";
import NavBar from "../../components/NavBar";
import {searchEncountersByDate} from "../../api/search/SearchEncountersByDate.ts";
import {useKeycloak} from "@react-keycloak/web";

const SearchEncounterPage: React.FC = () => {
    const id: number = Number(localStorage.getItem("id")) || -1;
  const [encounters, setEncounters] = useState<Encounter[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputDate, setInputDate] = useState('');
  const {keycloak} = useKeycloak()

  // Function to update state when the date changes
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDate(e.target.value);
  };


  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const encounterData = await searchEncountersByDate(id, inputDate, keycloak.token)
    if (encounterData) {
        console.log("successfully retreived encounters");
        setEncounters(encounterData);
      } else {
        setError("Data not found");
      }
    setLoading(false);
  };

  if (error) return <>Error</>;

  const encounterList = encounters ?? [];

  const columns: TableColumn[] = [
    { id: "patient", label: "Patient" },
    { id: "reason", label: "Reason for appointment" },
    { id: "priority", label: "Priority" },
    { id: "status", label: "Appointment status" },
    { id: "doctor", label: "Doctor present" },
  ];

  const data: TableData[] = encounterList.map((encounter) => ({
    id: encounter.id,
    values: [
        encounter.patient.firstName + " " +encounter.patient.lastName,
      encounter.reason,
      encounter.priority,
      encounter.status,
      encounter.doctor.firstName + encounter.doctor.lastName,
    ],
  }));

  return (
    <>
      <NavBar />
      <div>
        <h1>Select a Date</h1>
        <form onSubmit={handleSubmit}>
            <input 
            type="date" 
            value={inputDate} 
            onChange={handleDateChange} 
            />
            <button type="submit">Submit</button>
        </form>
      </div>
      {loading || encounters === null ? (
        <div /> 
      ) : (
        <>
          <div style={{ margin: "20px" }}>
            <h2>Patient Encounters</h2>
          </div>

          <GenericTable columns={columns} data={data} />
        </>
      )}
    </>
  );
};

export default SearchEncounterPage;
