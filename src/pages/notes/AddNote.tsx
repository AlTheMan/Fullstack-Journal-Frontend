import React, { useState, useEffect } from "react";
import { postNote } from "../../api/patient/notes/PostNote.ts";
import NavBar from "../../components/NavBar.tsx";
import { useNavigate } from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

const AddNote: React.FC = () => {
  
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [validationError, setValidationError] = useState("");
  const [note, setNote] = useState("");
  const maxLength = 255;
  const remainingCharacters = maxLength - note.length;
  const writtenById = localStorage.getItem("id");
  const navigate = useNavigate()
  const {keycloak} = useKeycloak()

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const clearText = () => {
    setNote("");
  };

  useEffect(() => {
    const storedPatient = localStorage.getItem("currentPatient")
    if (storedPatient) {
        const patientData: Patient = JSON.parse(storedPatient)
        setSelectedPatient(patientData);
    }
}, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (note.length < 2) {
        setValidationError("Your note must have atleast 2 characters")
        return;
    }
    if (!selectedPatient) {
      setValidationError("Patient id is not set")
      return;
    }
    if (!writtenById) {
      setValidationError("Author id not found")
      return;
    }
    keycloak.updateToken(5).then(function() {
    }).catch(function() {
      alert('Failed to refresh token, or the session has expired');
      return
    });
    setValidationError("");

    await postNote(note, selectedPatient?.id, Number(writtenById), keycloak.token);
    clearText();
    navigate("/PatientNotes")
  };

  return (
    <>
    <NavBar/>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px"
        }}
      >
        <h1>Enter note</h1>
      </div>

      <div
        className="mx-auto"
        style={{
          backgroundColor: "lightblue",
          padding: "30px",
          width: "400px",
          border: "1px solid black"
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Note for patient: {selectedPatient?.id}</label>
            <br></br>
            <br />
          </div>
          <div className="form-group">
            <br />
            <textarea
              value={note}
              maxLength={maxLength}
              onChange={handleTextChange}
              id="textarea"
              className="form-control"
              style={{ height: "200px", resize: "none" }}
            ></textarea>
            {validationError && <div style={{ color: "red", padding:"10px" }}>{validationError}</div>}
          </div>
          <div style={{ paddingLeft: "10px", paddingBottom: "10px" }}>
            {remainingCharacters} characters remaining.
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="submit">Submit</button>
            <button type="button" onClick={clearText}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNote;
