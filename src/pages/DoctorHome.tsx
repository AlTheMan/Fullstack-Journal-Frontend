
import {useNavigate} from "react-router-dom";
import ListGroupGeneric from "../components/ListGroupGeneric";
import {useFetchAllPatients} from "../api/patient/UseFetchAllPatients.tsx";
import {useFetchStaffData} from "../api/staff/UseFetchStaffData.ts";
import React, {useEffect, useState} from "react";

const DoctorHome: React.FC = () => {
    const fetchedPatients = useFetchAllPatients();
    const id: number = Number(localStorage.getItem("id")) || -1;
    const doctorData = useFetchStaffData(id);

    const [doctor, setDoctor] = useState<ReturnedStaffProps>()

    const navigate = useNavigate();

    const handleSelectPerson = (patient: Patient) => {
        const privilege: string = localStorage.getItem("privilege") || "";
        localStorage.setItem("currentPatient", JSON.stringify(patient))
        console.log("patient id in doctor home: " + patient.id.toString()); // patient id is a number
        if (privilege == "DOCTOR") {
            navigate("/DoctorSelect");
        }
        if (privilege == "STAFF") {
            navigate("/StaffSelect", {state: {patient}});
        }
    };

    useEffect(() => {
        if (doctorData){
            setDoctor(doctorData)
        }
    }, [doctorData]);



    return (<div>
        <h1>
            Welcome: {doctor?.firstName} {doctor?.lastName}
        </h1>
        <div style={{
            paddingBottom: '100px', backgroundColor: 'transparent'
        }}> {/* Add padding to bottom equal to the height of the fixed form */}
            <h2>List of Patients:</h2>
            <div style={{overflowY: "auto", height: "calc(100vh - 100px)"}}>
                {" "}
                {/* Make this div scrollable */}
                <ul>
                    <ListGroupGeneric<Patient>
                        items={fetchedPatients}
                        getKey={(patient) => patient.id.toString()}
                        getLabel={(patient) => `${patient.firstName} ${patient.lastName} (ID: ${patient.id})`}
                        onSelectItem={(patient) => handleSelectPerson(patient)}
                    />
                </ul>
            </div>
        </div>
    </div>);
};

export default DoctorHome;
