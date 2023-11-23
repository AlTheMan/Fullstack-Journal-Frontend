import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import NavBarDoctor from "../components/NavBarDoctor";
import '../App.css'


const DoctorSelect: React.FC = () => {
    const navigate = useNavigate();

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
            <div className='horizontalCenterWithTopMargin'><p>Current patient: {selectedPatient?.firstName} {selectedPatient?.familyName}</p></div>
                <div className='horizontalCenterWithTopMargin'><Button onClick={handleClick}>View Notes</Button></div>
                
        </div>
    );
};

export default DoctorSelect;
