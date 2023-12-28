import { fetchData } from "../api/PatientApi";
import React, { useEffect, useRef, useState } from "react";
import fetchNotes from "../api/NotesApi";
import "../App.css";
import LoadingSpinner from "../components/LoadingSpinner";
import Note from "../components/Note";

const PatientHome: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [notes, setNotes] = useState<Note[] | null>(null);
  const patientRun = useRef(false)
  const notesRun = useRef(false)

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [id] = useState<number | null>(Number(localStorage.getItem("id")))
  //const id: number = Number(localStorage.getItem("id")) || -1;
  const username: string = String(localStorage.getItem("username") || "");

  // Fetching patient name from db
  useEffect(() => {
    console.log("Getting patient info")
    console.log(id)
    console.log(patientRun.current)
    if (!id || patientRun.current) return


    patientRun.current = true
    const loadPatient = async () => {
      setLoading(true);
      try {
        const patientData = await fetchData(id);
        if (patientData) {
          setPatient(patientData);
          localStorage.setItem("currentPatient", JSON.stringify(patientData))
        } else {
          setError("Couldn't get patient name");
        }
      } catch (error) {
        setError("An error occured while fetching patient name");
      } finally {
        setLoading(false);
      }
    };

    loadPatient();
  }, [username, id]);

  // fetching notes
  useEffect(() => {
    if (!id || notesRun.current) return
    console.log("Getting notes")
    notesRun.current = true;
    console.log(id)
    const loadNotes = async () => {
      setLoading(true);
      try {
        const noteData = await fetchNotes(id);
        if (noteData) {
          setNotes(noteData);
        } else {
          console.log("notes else");
          setError("Couldn't get notes");
        }
      } catch (error) {
        console.log("notes error");
        setError("An error occured while fetching patient notes");
      } finally {
        setLoading(false);
      }
    };
    loadNotes();
  }, [id]);

  if (error) return (<>Error</>)

  if (!notes || loading || !patient) {
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
