import React, { useState, useEffect } from "react";
import NavBarPatient from "../components/NavbarPatient";
import NavBarDoctor from "../components/NavBarDoctor"; // Import NavBarDoctor
// ... other imports

const NavBar: React.FC = () => {
  // ... (rest of your component's state and logic)

  let navbar;
  if (localStorage.getItem("privilege") === "DOCTOR" || localStorage.getItem("privilege") === "STAFF") {
    navbar = <NavBarDoctor />;
  } else {
    navbar = <NavBarPatient />;
  }

  return (
    <>
      {navbar} {/* Render the chosen navbar */}
      {/* ... rest of your JSX */}
    </>
  );
};

export default NavBar;
