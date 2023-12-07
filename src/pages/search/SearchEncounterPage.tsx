import { useEffect, useState } from "react";
import fetchEncounters from "../../api/PatientEncountersApi";
import "../../App.css";
import LoadingSpinner from "../../components/LoadingSpinner";
import GenericTable from "../../components/GenericTable";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import DoctorButton from "../../components/DoctorButton";

const SearchEncounterPage: React.FC = () => {
  const [encounters, setEncounters] = useState<Encounter[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const navigate = useNavigate();

  const handleEncounterButton = () => {
    navigate("/AddEncounter");
  };

  useEffect(() => {
    const storedPatient = localStorage.getItem("currentPatient");
    if (storedPatient) {
      const patientData: Patient = JSON.parse(storedPatient);
      setSelectedPatient(patientData);
    }
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      const id = Number(selectedPatient?.id);
      const username: string = String(localStorage.getItem("username") || null);

      if (id === -1 || username.length === 0) {
        setError("Invalid ID or Username");
        return;
      }

      const loadEncounters = async () => {
        setLoading(true);
        try {
          const encounterData = await fetchEncounters(id);
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
    }
  }, [selectedPatient]);

  if (error) return <>Error</>;

  const encounterList = encounters ?? [];

  const columns: TableColumn[] = [
    { id: "reason", label: "Reason for appointment" },
    { id: "priority", label: "Priority" },
    { id: "status", label: "Appointment status" },
    { id: "doctor", label: "Doctor present" },
  ];

  const data: TableData[] = encounterList.map((encounter) => ({
    id: encounter.id,
    values: [
      encounter.reason,
      encounter.priority,
      encounter.status,
      encounter.doctor.firstName + encounter.doctor.lastName,
    ],
  }));

  return (
    <>
      <NavBar />
      <div className="horizontalCenterWithTopMargin">
        <DoctorButton
          children="Add Encounter"
          onClick={handleEncounterButton}
        />
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
