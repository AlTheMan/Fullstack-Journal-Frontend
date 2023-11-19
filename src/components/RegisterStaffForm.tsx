import React, { useState } from "react";

interface RegisterStaffFormProps {
  onSubmit: (firstName: string, lastName: string) => void;
}

const RegisterStaffForm: React.FC<RegisterStaffFormProps> = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
 
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(firstName, lastName);
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
            <label>First Name: </label>
            <input
              placeholder="Enter First Name"
              className="form-control"
              type="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              placeholder="Enter Last Name"
              type="lastName"
              className="form-control"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
        </div>
          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterStaffForm;
