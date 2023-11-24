import fetchNotes from "../api/NotesApi";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Note from "../components/Note";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import NavBarDoctor from "../components/NavBarDoctor";

const PatientNotes: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null)

  const [notes, setNotes] = useState<Note[] | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
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
      setLoading(true);
      try {
        const noteData = await fetchNotes(patient?.id);
        if (noteData) {
          console.log("notes fetched");
          setNotes(noteData);
        } else {
          setError("Couldn't get notes");
        }
      } catch (error) {
        setError("An error occured while fetching patient notes");
      } finally {
        setLoading(false);
      }
    };
    loadNotes();
  }
    
  }, [patient]);

  if (error) return (<>Error</>)

  let noteList = notes ?? []

  return (
    <>
    <NavBarDoctor></NavBarDoctor>

    <div className="horizontalCenterWithTopMargin"><p>Notes for {patient?.firstName} {patient?.lastName}</p></div>
      <div className="horizontalCenterWithTopMargin">
           <Button onClick={handleAddNoteButton}>Add note</Button>
      </div>

      {loading && <LoadingSpinner />}
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