import React from 'react';
import NavBar from '../components/Navbar';
import PatientHome from './PatientHome';
import DoctorHome from './DoctorHome';
import NavBarDoctor from '../components/NavBarDoctor';

const HomePage: React.FC = () => {
  const privilege: string = localStorage.getItem("privilege") || ""; 

  console.log(privilege);

  const performActionBasedOnPrivilege = () => {
    switch (privilege) {
      case "DOCTOR":
        return (
          <>
          <NavBarDoctor/>
            <DoctorHome/>
          </>
        )
      case "STAFF":
        return (
          <>
          <NavBarDoctor/>
            <DoctorHome/>
          </>
        )
      case "PATIENT":
        return (
          <>
          <NavBar/>
            <PatientHome/>
          </>
        )
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
