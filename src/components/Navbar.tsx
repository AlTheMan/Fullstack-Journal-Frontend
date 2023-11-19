import React from "react";
import NavBarPatient from './NavBarPatient.tsx';
import NavBarDoctor from "./NavBarDoctor"; // Import NavBarDoctor
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
