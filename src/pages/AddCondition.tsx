import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { PostCondition } from "../api/PostCondition";

const AddCondition: React.FC = () => {
  // Get the stringified object from localStorage
  const currentPatientString = localStorage.getItem("currentPatient");

  // Parse the string to get the object. Use null coalescing for safety in case the item doesn't exist.
  const currentPatientObject = currentPatientString
    ? JSON.parse(currentPatientString)
    : null;

  // Access the patientId property from the object. Ensure it's a number if required.
  const patientIdNum = currentPatientObject
    ? Number(currentPatientObject.patientId)
    : -1;
  const patientId = currentPatientObject
    ? Number(currentPatientObject.patientId)
    : -1;

  console.log("Patient ID:", patientIdNum);
  // const { patientId } = localStorage.getItem("currentPatient");

  const [code, setCode] = useState("");
  const [bodySite, setBodySite] = useState("");
  const [clinicalStatus, setClinicalStatus] = useState("");
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");
  const [evidence, setEvidence] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");

  //const [condition, setCondition] = useState<Condition | null>(null);

  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !bodySite ||
      !severity ||
      !category ||
      !clinicalStatus ||
      !evidence ||
      !verificationStatus ||
      !code
    ) {
      setValidationError("All fields are required");
      return;
    }

    setValidationError("");

    await PostCondition(code, bodySite, clinicalStatus, severity, category, evidence, verificationStatus, patientIdNum);
    // Clearing form fields after submission
    setBodySite("");
    setSeverity("");
    setCategory("");
    setClinicalStatus("");
    setEvidence("");
    setVerificationStatus("");
    setCode("");

    //setCondition.
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
        <h1>Add condition for patient: {patientId}</h1>
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
            <label>Condition code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Body site</label>
            <input
              type="text"
              value={bodySite}
              onChange={(e) => setBodySite(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Clinical status</label>
            <input
              type="text"
              value={clinicalStatus}
              onChange={(e) => setClinicalStatus(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Severity</label>
            <input
              type="text"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Evidence</label>
            <input
              type="text"
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Verification status</label>
            <input
              type="text"
              value={verificationStatus}
              onChange={(e) => setVerificationStatus(e.target.value)}
              className="form-control"
            />
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
                setBodySite("");
                setSeverity("");
                setCategory("");
                setClinicalStatus("");
                setEvidence("");
                setVerificationStatus("");
                setCode("");
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

export default AddCondition;
