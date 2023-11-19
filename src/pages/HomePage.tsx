import React from 'react';
import NavBar from '../components/Navbar';
import PatientHome from './PatientHome';
import DoctorHome from './DoctorHome';

const HomePage: React.FC = () => {
  const privilege: string = localStorage.getItem("privilege") || ""; 

  console.log(privilege);

  const performActionBasedOnPrivilege = () => {
    switch (privilege) {
      case "DOCTOR":
        return <DoctorHome/>;
      case "STAFF":
        return <div>Staff page</div>;
      case "PATIENT":
        return <PatientHome />;
      default:
        return <div>Privilege not recognized. Please log in.</div>;
    }
  };

  return (
    <>
      {performActionBasedOnPrivilege()}
    </>
  );
};

export default HomePage;
