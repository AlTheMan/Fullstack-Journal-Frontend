import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { postNote } from "../api/NotesApi";
import NavBar from "../components/NavBar";

const NotePage: React.FC = () => {
  let { patientId } = useParams();
  let patientIdNum = Number(patientId);

  const [validationError, setValidationError] = useState("");
  const [note, setNote] = useState("");
  const maxLength = 255;
  const remainingCharacters = maxLength - note.length;

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const clearText = () => {
    setNote("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (note.length < 2) {
        setValidationError("Your note must have atleast 2 characters")
        return;
    }
    setValidationError("");

    await postNote(note, patientIdNum);
    clearText();
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
          paddingTop: "200px",
        }}
      >
        <h1>Enter note</h1>
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
            <label>Note for patient: {patientId}</label>
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

export default NotePage;
