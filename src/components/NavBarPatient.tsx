import Button from "./Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { useContext } from "react";

const NavBarPatient = () => {
  const { client } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <Button onClick={() => console.log("Home clicked")}>Home</Button>
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/MessagesPage" className="nav-link">
                <Button onClick={() => console.log("Messages clicked")}>
                  Messages
                </Button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ConditionPage" className="nav-link">
                <Button onClick={() => console.log("Conditions clicked")}>
                  Conditions
                </Button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/EncounterPage" className="nav-link">
                <Button onClick={() => console.log("Encounter clicked")}>
                  Encounter
                </Button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ObservationPage" className="nav-link">
                <Button onClick={() => console.log("Observation clicked")}>
                  Observation
                </Button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ImagePage" className="nav-link">
                <Button onClick={() => console.log("Image clicked")}>
                  Images
                </Button>
              </Link>
            </li>
          </ul>
        </div>
        <Button onClick={() => client?.logout()}>Logout</Button>
      </div>
    </nav>
  );
};

export default NavBarPatient;
