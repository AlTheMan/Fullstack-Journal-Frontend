import React from "react";
import ListGroupGeneric from "../../components/ListGroupGeneric";

// Define the structure of the props
interface PatientListProps {
  patients: Patient[]; 
  onSelectPerson: (patient: Patient) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onSelectPerson }) => {
  return (
    <div style={{ paddingBottom: '100px', backgroundColor: 'transparent'}}>
      <h2>List of Patients:</h2>
      <div style={{ overflowY: "auto", height: "calc(100vh - 100px)" }}>
        <ul>
          <ListGroupGeneric<Patient>
            items={patients}
            getKey={(patient) => patient.id.toString()}
            getLabel={(patient) => `${patient.firstName} ${patient.lastName} (ID: ${patient.id})`}
            onSelectItem={onSelectPerson}
          />
        </ul>
      </div>
    </div>
  );
};

export default PatientList;
