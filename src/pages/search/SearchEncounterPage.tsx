import { useEffect, useState } from "react";
import fetchEncounters from "../../api/PatientEncountersApi";
import "../../App.css";
import LoadingSpinner from "../../components/LoadingSpinner";
import GenericTable from "../../components/GenericTable";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import DoctorButton from "../../components/DoctorButton";
import { getEncountersByDate } from "../../api/GetÉncountersByDate";

const SearchEncounterPage: React.FC = () => {
    const id: number = Number(localStorage.getItem("id")) || -1;
  const [encounters, setEncounters] = useState<Encounter[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const navigate = useNavigate();
  const [inputDate, setInputDate] = useState('');

  // Function to update state when the date changes
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDate(e.target.value);
  };


  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Selected Date:', inputDate);
    const date = new Date(inputDate);
    const encounterData = await getEncountersByDate(id, inputDate);
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

export default SearchEncounterPage;
