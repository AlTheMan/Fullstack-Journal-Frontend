import React, { useState } from "react";

interface RegisterPatientFormProps {
  onSubmit: (firstName: string, familyName: string, date: string, sex:'MALE'|'FEMALE') => void;
}

const RegisterPatientForm: React.FC<RegisterPatientFormProps> = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamliyName] = useState("");
  const [date, setDate] = useState("");
  const [sex, setSex] = useState<'MALE' | 'FEMALE'>('MALE'); // Default value set to 'MALE'

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(firstName, familyName, date, sex);
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
            <label>Family Name:</label>
            <input
              placeholder="Enter Family Name"
              type="familyName"
              className="form-control"
              value={familyName}
              onChange={(event) => setFamliyName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Date of Birth: </label>
            <input
            placeholder="YYYY-MM-DD"
            className="form-control"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            />
          <div className="form-group">
            <label>Sex: </label>
            <select
                className="form-control"
                value={sex}
                onChange={(event) => setSex(event.target.value as 'MALE' | 'FEMALE')}
            >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            </select>
        </div>
        </div>
        
       
          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPatientForm;
