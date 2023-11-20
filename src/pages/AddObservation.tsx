import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PostObservation } from "../api/PostObservation";
import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";


const AddObservation: React.FC = () => {

    //useLocation from react-router-dom
    const location = useLocation();
  const selectedPatient = location.state?.selectedPatient as Patient | undefined;


  //const { patientId } = useParams();
  //const patientIdNum = Number(patientId);

  const [description, setDescription] = useState("");
  const [value, setValue] = useState<number | ''>(''); // Initialize as empty string for controlled input
  const [unit, setUnit] = useState("");
  const [validationError, setValidationError] = useState("");

  // If selectedPatient is not defined, patientIdNum will be -1 or you can handle it differently
  const patientIdNum = selectedPatient ? selectedPatient.patientId : -1;
  console.log("patient id: " + patientIdNum)


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!description || value === '' || !unit) {
      setValidationError("All fields are required");
      return;
    }
    setValidationError("");

    console.log("description: " + description + ", value: "+ value + ", unit: " + unit + ", patientIdNum: " + patientIdNum)
    await PostObservation(description, value, unit, patientIdNum);
    // Clearing form fields after submission
    setDescription("");
    setValue('');
    setUnit("");
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue ? Number(newValue) : ''); // Convert to number, or empty string if conversion fails
  };

  return (
    <>
      <NavBar />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "50px" }}>
        <h1>Add Observation for patient: {patientId}</h1>
      </div>
      <div className="mx-auto" style={{ backgroundColor: "lightblue", padding: "30px", width: "400px", border: "1px solid black" }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" />
          </div>
          <div className="form-group">
            <label>Value</label>
            <input type="number" value={value} onChange={handleValueChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Unit</label>
            <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} className="form-control" />
          </div>
          {validationError && <div style={{ color: "red", padding: "10px" }}>{validationError}</div>}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => { setDescription(""); setValue(''); setUnit(""); }}>Clear</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddObservation;
