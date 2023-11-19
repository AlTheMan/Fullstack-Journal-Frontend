import { fetchData } from "../api/namedPersonApi";
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ListGroupGeneric from '../components/ListGroupGeneric';
import axios from 'axios';
import { Patient } from "../types/Patient";
import NavBar from "../components/NavbarPatient";
import NavBarDoctor from "../components/NavBarDoctor";


const DoctorSelect: React.FC = () => {

    const location = useLocation();
    const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);

    useEffect(() => {
        const patientId = location.state?.patientId;
        if (patientId) {
            setSelectedPatientId(patientId);
        }
    }, [location.state]);

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
        </div>
    );
};

export default DoctorSelect;
