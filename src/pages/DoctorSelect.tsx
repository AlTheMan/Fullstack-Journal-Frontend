import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import NavBarDoctor from "../components/NavBarDoctor";


const DoctorSelect: React.FC = () => {


    const location = useLocation();
    //const patientId = location.state?.patientId;
    const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        const patientId = location.state?.patientId;
        if (patientId) {
            setSelectedPatientId(patientId);
        }
    }, [location.state]);

    const handleNavigate = (path: string) => {
        if (selectedPatientId !== null) {
            navigate(path, { state: { patientId: selectedPatientId } });
        }
    };

    return (
        <div>
            <NavBarDoctor></NavBarDoctor>
            <h1>Welcome: Dr</h1>
            <p>selected patient id: {selectedPatientId}</p>
            <Link to={selectedPatientId !== null ? `/NotePage/${selectedPatientId}` : '#'} className="nav-link">
                <Button onClick={() => console.log(`Patient id: ${selectedPatientId}`)}>
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
