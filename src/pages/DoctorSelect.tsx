import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import NavBarDoctor from "../components/NavBarDoctor";
import '../App.css'


const DoctorSelect: React.FC = () => {


    const location = useLocation();
    //const patientId = location.state?.patientId;
    //const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
    const navigate = useNavigate();


    useEffect(() => {
        const patient = location.state?.patient;
        if (patient) {
            setSelectedPatient(patient)
            //setSelectedPatientId(patient.patientId);
        }
    }, [location.state]);

    const handleNavigate = (path: string) => {
        if (selectedPatient !== null) {
            navigate(path, { state: { patientId: selectedPatient.patientId } });
        }
    };

    return (
        <div>
            <NavBarDoctor></NavBarDoctor>
            <div className='horizontalCenterWithTopMargin'>Current patient: {selectedPatient?.firstName} {selectedPatient?.familyName}</div>
            <Link to={selectedPatient?.patientId !== null ? `/NotePage/${selectedPatient?.patientId}` : '#'} className="nav-link">
                <Button onClick={() => console.log(`Patient id: ${selectedPatient?.patientId}`)}>
                    Add note
                </Button>
            </Link>
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
