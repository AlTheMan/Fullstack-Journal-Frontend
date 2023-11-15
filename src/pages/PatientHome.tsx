import { Patient } from "../types/Patient";
import { fetchData } from "../api/patientApi"
import React, { useEffect, useState } from 'react';


const PatientHome: React.FC = () => {

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
       Welcome {patient?.firstName} {patient?.familyName}
    </div>
  );
};

export default PatientHome;

