import React, {useEffect, useState} from "react";
import "../../App.css";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import GenericTable from "../../components/GenericTable.tsx";
import NavBar from "../../components/NavBar.tsx";
import {useNavigate} from "react-router-dom";
import DoctorButton from "../../components/DoctorButton.tsx";
import {useFetchEncounters} from "../../api/patient/encounters/UseFetchEncounters.ts";

const EncounterPage: React.FC = () => {

    const [encounters, setEncounters] = useState<Encounter[] | null>(null);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const encounterData = useFetchEncounters(selectedPatient?.id)
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
        if (encounterData) {
            setEncounters(encounterData)
        }
    }, [encounterData, selectedPatient]);

    const encounterList = encounters ?? [];

    const columns: TableColumn[] = [{id: "reason", label: "Reason for appointment"}, {
        id: "priority",
        label: "Priority"
    }, {id: "status", label: "Appointment status"}, {id: "doctor", label: "Doctor present"},];

    const data: TableData[] = encounterList.map((encounter) => ({
        id: encounter.id,
        values: [encounter.reason, encounter.priority, encounter.status, encounter.doctor.firstName + " " + encounter.doctor.lastName,],
    }));

    return (<>
            <NavBar/>
            <div className="horizontalCenterWithTopMargin">
                <DoctorButton
                    children="Add Encounter"
                    onClick={handleEncounterButton}
                />
            </div>
            {encounters === null ? (<LoadingSpinner/>) : (<>
                    <div style={{margin: "20px"}}>
                        <h2>Patient Encounter</h2>
                    </div>

                    <GenericTable columns={columns} data={data}/>
                </>)}
        </>);
};

export default EncounterPage;
