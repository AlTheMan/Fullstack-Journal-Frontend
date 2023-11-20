import fetchNotes from "../api/NotesApi";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Note from "../components/Note";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import NavBarDoctor from "../components/NavBarDoctor";

const PatientNotes: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null)

  const [notes, setNotes] = useState<NoteCollection | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const username: string = String(localStorage.getItem("username") || "");

  useEffect(() => {
    const storedPatient = localStorage.getItem("currentPatient")
    if (storedPatient) {
        const patientData: Patient = JSON.parse(storedPatient)
        setPatient(patientData);
    }
}, []);


useEffect(() => {
  if(patient) {
    const loadNotes = async () => {
      setLoading(true);
      try {
        const noteData = await fetchNotes(username, Number(patient?.patientId));
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
    
  }, [patient, username]);

  if (error) return (<>Error</>)

  let noteList = notes?.notes;

  return (
    <>
    <NavBarDoctor></NavBarDoctor>

    <div className="horizontalCenterWithTopMargin"><p>Notes for {patient?.firstName} {patient?.familyName}</p></div>
      <div className="horizontalCenterWithTopMargin">
        
        <Link
          to={patient?.patientId !== null ? `/NotePage/${patient?.patientId}` : "#"}
          className="nav-link"
        >
          <Button onClick={() => console.log(`Patient id: ${patient?.patientId}`)}>
            Add note
          </Button>
        </Link>
      </div>

      {loading && <LoadingSpinner />}
      {noteList && (
        <div className="noteBoxesAlignment">
          {noteList.map((noteItem, index) => {
            const firstName = noteItem.name.firstName;
            const lastName = noteItem.name.lastName;

            const date = noteItem.dateWritten;
            const noteContent = noteItem.note;
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