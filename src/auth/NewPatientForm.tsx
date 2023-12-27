import React, { useState } from "react";

interface NewPatientFormProps {
  onSubmit: (date: string, sex: "MALE" | "FEMALE") => void;
}

const NewPatientForm: React.FC<NewPatientFormProps> = ({ onSubmit }) => {
  const [date, setDate] = useState("");
  const [sex, setSex] = useState<"MALE" | "FEMALE">("MALE"); // Default value set to 'MALE'

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(date, sex);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "200px",
        }}
      >
        <h1>Algots Sjukstuga</h1>
      </div>

      <div
        className="mx-auto"
        style={{
          backgroundColor: "lightblue",
          margin: "100px",
          padding: "30px",
          width: "400px",
          border: "1px solid black",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date of Birth: </label>
            <input
              placeholder="YYYY-MM-DD"
              className="form-control"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Sex: </label>
            <select
              className="form-control"
              value={sex}
              onChange={(event) =>
                setSex(event.target.value as "MALE" | "FEMALE")
              }
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>
          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewPatientForm;
