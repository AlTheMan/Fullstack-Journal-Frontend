
import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Note from "../components/Note";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import NavBarDoctor from "../components/NavBarDoctor";
import {useFetchNotes} from "../api/patient/notes/UseFetchNotes.ts";

const PatientNotes: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null)
  const noteData = useFetchNotes(patient?.id)
  const [notes, setNotes] = useState<Note[] | null>(null);
  const navigate = useNavigate();


  //const username: string = String(localStorage.getItem("username") || "");

  useEffect(() => {
    const storedPatient = localStorage.getItem("currentPatient")
    if (storedPatient) {
        const patientData: Patient = JSON.parse(storedPatient)
        setPatient(patientData);
    }
}, []);


const handleAddNoteButton = () => {
  navigate("/NotePage")
}


useEffect(() => {
  if(patient) {
    const loadNotes = async () => {
      setNotes(noteData)
    };
    loadNotes();
  }
    
  }, [noteData, patient]);

  const noteList = notes ?? []

  return (
    <>
    <NavBarDoctor></NavBarDoctor>

    <div className="horizontalCenterWithTopMargin"><p>Notes for {patient?.firstName} {patient?.lastName}</p></div>
      <div className="horizontalCenterWithTopMargin">
           <Button onClick={handleAddNoteButton}>Add note</Button>
      </div>

      {!notes && <LoadingSpinner />}
      {noteList && (
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
      )}
    </>
  );
};

export default PatientNotes