// LoginPage.tsx
import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import {fetchData} from '../api/patientApi'
import { Patient } from '../types/Patient';

const HomePage: React.FC = () => {


  const [patient, setPatient] = useState<Patient | null>(null);

  const id: number = Number(localStorage.getItem("id")) || -1;
  const username: string = String(localStorage.getItem("username") || "");

  useEffect(() => {
    const loadPatient = async () => {
      const patientData = await fetchData(id.toString(), username);
      if (patientData) {
        setPatient(patientData);
      }
    };

    loadPatient();
  }, []);




return (
    <div>
       <NavBar></NavBar>
       Welcome {patient?.firstName} {patient?.familyName}
    </div>
  );
};

export default HomePage;

/* <Link to="/LoginPage">Login</Link>*/