import { Patient } from "../types/Patient";
import { fetchData } from "../api/PatientApi";
import React, { useEffect, useState } from "react";
import fetchNotes from "../api/NotesApi";
import "../App.css";
import LoadingSpinner from "../components/LoadingSpinner";
import Note from "../components/Note";

const PatientHome: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [notes, setNotes] = useState<NoteCollection | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const id: number = Number(localStorage.getItem("id")) || -1;
  const username: string = String(localStorage.getItem("username") || "");

  useEffect(() => {
    const loadPatient = async () => {
      setLoading(true);
      try {
        const patientData = await fetchData(id.toString(), username);
        if (patientData) {
          setPatient(patientData);
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

  useEffect(() => {
    const loadNotes = async () => {
      setLoading(true);
      try {
        console.log("hello");
        const noteData = await fetchNotes(username, id);
        if (noteData) {
          console.log("notes fetched");
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
  }, []);

  if (!notes || loading || !patient) {
    return (
      <>
        <LoadingSpinner></LoadingSpinner>
      </>
    );
  }

  var noteList = notes.notes;

  var priv = localStorage.getItem("privilege");

  return (
    <>
      <div className="horizontalCenterWithTopMargin">
        <div>
          <h3>Welcome {priv?.toLowerCase()}</h3>
          <h5>
            Name: {patient.firstName} {patient.familyName}
          </h5>
          <h5>Birthdate: {patient.birthdate.toString()}</h5>
          <h5>Gender: {patient.sex.toLowerCase()}</h5>
        </div>
      </div>
        <div className="noteBoxesAlignment">
          {noteList.map((noteItem, index) => { // Renamed 'note' to 'noteItem' to avoid variable name conflict
            const firstName = noteItem.name.firstName;
            const lastName = noteItem.name.lastName;
    
            const date = noteItem.dateWritten;
            const noteContent = noteItem.note; // Renamed 'note' to 'noteContent' to avoid variable name conflict
    
            // The component must be returned from the map callback.
            // Also, string concatenation should be done with template literals or the + operator without curly braces.
            return <Note 
                    key={index} // Always provide a unique key when rendering lists
                    writtenBy={`${firstName} ${lastName}`} // Corrected string concatenation
                    date={new Date(date)} // Assuming 'date' is a string that needs to be converted to a Date object
                    note={noteContent}
                  />;
          })}
          </div>
    </>
  );
  
 
};

export default PatientHome;
