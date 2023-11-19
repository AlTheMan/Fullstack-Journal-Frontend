import { useEffect, useState } from "react";
import fetchEncounters from "../api/PatientEncountersApi";
import NavBar from "../components/Navbar";
import "../App.css";
import LoadingSpinner from "../components/LoadingSpinner";
import GenericTable from "../components/GenericTable";
import ClickPopupButton from "../components/ClickPopupButton";
import NavBarDoctor from "../components/NavBarDoctor";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const EncounterPage: React.FC = () => {
  const [encounters, setEncounters] = useState<EncounterCollection | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  //id från routing
  const location = useLocation();
  const patientId = location.state?.patientId;

  useEffect(() => {
    var id: number = Number(localStorage.getItem("id")) || -1;
    if(patientId){
      id=patientId; 
    }
    const username: string = String(localStorage.getItem("username") || null);

    if (id === -1 || username.length === 0) {
      setError("Invalid ID or Username");
      return;
    }

    const loadEncounters = async () => {
      setLoading(true);
      try {
        const encounterData = await fetchEncounters(username, id);
        if (encounterData) {
          setEncounters(encounterData);
        } else {
          setError("Data not found");
        }
      } catch (error) {
        setError("An error occured while fetching data");
      } finally {
        setLoading(false);
      }
    };

    loadEncounters();
  }, []);

  if (error) return <>Error</>;
  if (loading || encounters === null) {
    return (
      <>
        <NavBar></NavBar>
        <LoadingSpinner></LoadingSpinner>
      </>
    );
  }

  var encounterList = encounters.encounters;

  for (let index = 0; index < encounterList.length; index++) {
    const item = encounterList[index];
    item.id = index;
  }

  const columns: TableColumn[] = [
    { id: "reason", label: "Reason for appointment" },
    { id: "priority", label: "Priority" },
    { id: "status", label: "Appointment status" },
    { id: "doctors", label: "Doctors present" },
  ];

  const data: TableData[] = encounterList.map((encounter) => ({
    id: encounter.id,
    values: [
      encounter.reason,
      encounter.priority,
      encounter.status,
      <ClickPopupButton doctorList={encounter.doctors}></ClickPopupButton>,
    ],
  }));

  return (
    <>
      <NavBar></NavBar>

      <GenericTable columns={columns} data={data}></GenericTable>
    </>
  );
};

export default EncounterPage;
