import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBarDoctor from "../components/NavBarDoctor";
import '../App.css'


const DoctorSelect: React.FC = () => {


    const location = useLocation();
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
    const navigate = useNavigate();


    useEffect(() => {
        const patient = location.state?.patient;
        if (patient) {
            setSelectedPatient(patient)
        }
    }, [location.state]);

    const handleNavigate = (path: string) => {
        if (selectedPatient) {
            navigate(path, { state: { selectedPatient } });
        }
    };

    return (
        <div>
            <NavBarDoctor></NavBarDoctor>
            <div className='horizontalCenterWithTopMargin'>Current patient: {selectedPatient?.firstName} {selectedPatient?.familyName}</div>

            <Button onClick={() => handleNavigate('/PatientNotes')}>
                Patient Notes
            </Button>

            <Button onClick={() => handleNavigate('/ConditionPage')}>
                Condition
            </Button>
            <Button onClick={() => handleNavigate('/EncounterPage')}>
                Encounter
            </Button>
            <Button onClick={() => handleNavigate('/ObservationPage')}>
                Observation
            </Button>
        </div>
    );
};

export default DoctorSelect;
