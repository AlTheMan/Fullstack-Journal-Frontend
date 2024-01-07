
import React, { useEffect, useState } from "react";
import "../App.css";
import LoadingSpinner from "../components/LoadingSpinner";
import Note from "../components/Note";
import { useFetchPatient } from "../api/patient/UseFetchPatient";
import { useFetchNotes } from "../api/patient/notes/UseFetchNotes";

const PatientHome: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [id] = useState<number | null>(Number(localStorage.getItem("id")))
  const patientData = useFetchPatient(id)
  const noteData = useFetchNotes(patient?.id)
  
  // Fetching patient name from db
  useEffect(() => {
    if (patientData) {
      setPatient(patientData)
    }
  }, [patientData, id]);

  // fetching notes
  useEffect(() => {
    if (noteData) {
      setNotes(noteData)
    }
  
  }, [noteData, id]);

  
  if (!notes || !patient) {
    return (
      <>
        <LoadingSpinner></LoadingSpinner>
      </>
    );
  }

  const noteList = notes;

  const privilege = localStorage.getItem("privilege");

  return (
    <>
      <div className="horizontalCenterWithTopMargin">
        <div>
          <h3>Welcome {privilege?.toLowerCase()}</h3>
          <h5>
            Name: {patient.firstName} {patient.lastName}
          </h5>
          <h5>Birthdate: {patient.birthdate.toString()}</h5>
          <h5>Gender: {patient.sex.toLowerCase()}</h5>
        </div>
      </div>
      <div className="noteBoxesAlignment">
        {noteList.map((noteItem, index) => {
          const firstName = noteItem.writtenBy.firstName;
          const lastName = noteItem.writtenBy.lastName;

          const date = noteItem.dateWritten;
          const noteContent = noteItem.noteText;
          return (
            <Note
              key={index}
              writtenBy={`${firstName} ${lastName}`}
              date={new Date(date)}
              note={noteContent}
            />
          );
        })}
      </div>
    </>
  );
};

export default PatientHome;
