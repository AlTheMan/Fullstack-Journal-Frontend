import React from 'react';

import PatientHome from './PatientHome';
import DoctorHome from './DoctorHome';
import NavBar from '../components/NavBar';

const HomePage: React.FC = () => {
  const privilege: string = localStorage.getItem("privilege") || ""; 

  console.log("Privilege in Homepage: ", privilege);

  const performActionBasedOnPrivilege = () => {
    switch (privilege) {
      case "DOCTOR":
        return <DoctorHome/>
      case "STAFF":
        return <DoctorHome/>
      case "PATIENT":
        return <PatientHome/>
      default:
        return <div>Privilege not recognized. Please log in.</div>;
    }
  };

  return (
    <>
    <NavBar/>
      {performActionBasedOnPrivilege()}
    </>
  );
};

export default HomePage;
