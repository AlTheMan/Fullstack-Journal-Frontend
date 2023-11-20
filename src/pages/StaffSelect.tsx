import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavBarDoctor from "../components/NavBarDoctor";


const DoctorSelect: React.FC = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    useEffect(() => {
        const storedPatient = localStorage.getItem("currentPatient")
        if (storedPatient) {
            const patientData: Patient = JSON.parse(storedPatient)
            setSelectedPatient(patientData);
        }
    }, []);

    const handleClick = () =>{
        navigate("/PatientNotes")
    }

    return (
        <div>
            <NavBarDoctor></NavBarDoctor>
            <div><p>Current patient: {selectedPatient?.firstName} {selectedPatient?.familyName}</p>
                <Button onClick={handleClick}>
                    View Notes
                </Button>
                </div>
        </div>
    );
};

export default DoctorSelect;
