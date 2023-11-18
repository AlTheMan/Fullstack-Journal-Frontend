import React, { useState } from "react";

interface RegisterFormProps {
  onSubmit: (username: string, password: string, role: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("doctor"); // Default role

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(username, password, role);
  };

  return (
    <>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "200px"}}><h1>Algots Sjukstuga</h1></div>
      
      <div className="mx-auto" style={{
        backgroundColor: "lightblue",
        margin: "100px",
        padding: "30px",
        width: "400px",
        border: "1px solid black",
      }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address: </label>
            <input
              placeholder="Enter email"
              className="form-control"
              type="email"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              placeholder="Enter password"
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select
              className="form-control"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="DOCTOR">DOCTOR</option>
              <option value="PATIENT">PATIENT</option>
              <option value="STAFF">STAFF</option>
            </select>
          </div>
          <div className="form-group">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
