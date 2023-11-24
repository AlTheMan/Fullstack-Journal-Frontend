import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { PostEncounter } from "../api/PostEncounter";

const AddEncounter: React.FC = () => {
  // Retrieve patientId from localStorage
  const currentPatientString = localStorage.getItem("currentPatient");
  const currentPatientObject = currentPatientString
    ? JSON.parse(currentPatientString)
    : null;
  const patientId = currentPatientObject ? Number(currentPatientObject.id) : -1;

  // Retrieve doctorId from localStorage and parse it to a number
  const doctorIdString = localStorage.getItem("id");
  const doctorId = doctorIdString ? Number(doctorIdString) : -1;

  // State variables for form fields
  const [status, setStatus] = useState("PLANNED"); //default status
  const [reason, setReason] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!status || !reason || !priority) {
      setValidationError("All fields are required");
      return;
    }
    setValidationError("");

    console.log(
      "Status: " +
        status +
        ", Reason: " +
        reason +
        ", Priority: " +
        priority +
        ", PatientId: " +
        patientId
    );
    await PostEncounter(status, reason, priority, patientId, doctorId);
  };

  return (
    <>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <h1>Add Encounter for patient: {patientId}</h1>
      </div>
      <div
        className="mx-auto"
        style={{
          backgroundColor: "lightblue",
          padding: "30px",
          width: "400px",
          border: "1px solid black",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-control"
            >
              <option value="PLANNED">Planned</option>
              <option value="IN_PROGRESS">In progress</option>
              <option value="FINISHED">Finished</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="ON_LEAVE">On leave</option>
            </select>
          </div>
          <div className="form-group">
            <label>Reason</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="form-control"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          {validationError && (
            <div style={{ color: "red", padding: "10px" }}>
              {validationError}
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <button type="submit">Submit</button>
            <button
              type="button"
              onClick={() => {
                setStatus("");
                setReason("");
                setPriority("");
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEncounter;
