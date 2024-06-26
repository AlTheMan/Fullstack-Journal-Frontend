import React, {useState} from "react";
import NavBar from "../../components/NavBar.tsx";
import {useKeycloak} from "@react-keycloak/web";
import {postObservation} from "../../api/patient/observations/PostObservation.ts";
import {useNavigate} from "react-router-dom";


const AddObservation: React.FC = () => {

    const currentPatientString = localStorage.getItem("currentPatient");

    // Parse the string to get the object. Use null coalescing for safety in case the item doesn't exist.
    const currentPatientObject = currentPatientString ? JSON.parse(currentPatientString) : null;

    // Access the patientId property from the object. Ensure it's a number if required.
    const patientIdNum = currentPatientObject ? Number(currentPatientObject.id) : -1;

    console.log("Patient ID:", patientIdNum);

    const [description, setDescription] = useState("");
    const [value, setValue] = useState<number | ''>(''); // Initialize as empty string for controlled input
    const [unit, setUnit] = useState("");
    const [validationError, setValidationError] = useState("");
    const {keycloak} = useKeycloak()
    const [disabledButton, setDisabledButton] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (event: React.FormEvent) => {
        setDisabledButton(true)
        event.preventDefault();
        if (!description || value === '' || !unit) {
            setValidationError("All fields are required");
            return;
        }
        setValidationError("");

        keycloak.updateToken(5).then(function () {
        }).catch(function () {
            alert('Failed to refresh token, or the session has expired');
            return
        });

        await postObservation(description, value, unit, patientIdNum, keycloak.token);
        // Clearing form fields after submission
        setDescription("");
        setValue('');
        setUnit("");
        setDisabledButton(false)
        navigate("/ObservationPage")
    };

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue ? Number(newValue) : ''); // Convert to number, or empty string if conversion fails
    };

    return (<>
            <NavBar/>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "50px"
            }}>
                <h1>Add Observation for patient: {patientIdNum}</h1>
            </div>
            <div className="mx-auto"
                 style={{backgroundColor: "lightblue", padding: "30px", width: "400px", border: "1px solid black"}}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
                               className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Value</label>
                        <input type="number" value={value} onChange={handleValueChange} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Unit</label>
                        <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)}
                               className="form-control"/>
                    </div>
                    {validationError && <div style={{color: "red", padding: "10px"}}>{validationError}</div>}
                    <div style={{display: "flex", justifyContent: "space-between", marginTop: "20px"}}>
                        <button disabled={disabledButton} type="submit">Submit</button>
                        <button type="button" onClick={() => {
                            setDescription("");
                            setValue('');
                            setUnit("");
                        }}>Clear
                        </button>
                    </div>
                </form>
            </div>
        </>);
};

export default AddObservation;
