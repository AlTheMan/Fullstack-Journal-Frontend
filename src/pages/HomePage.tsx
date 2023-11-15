import React from 'react';
import NavBar from '../components/Navbar';
import PatientHome from './PatientHome';

const HomePage: React.FC = () => {
  const privilege: string = localStorage.getItem("privilege") || ""; 

  console.log(privilege);

  const performActionBasedOnPrivilege = () => {
    switch (privilege) {
      case "DOCTOR":
        return <div>Doctor page</div>;
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
      <NavBar /> 
      {performActionBasedOnPrivilege()}
    </>
  );
};

export default HomePage;
