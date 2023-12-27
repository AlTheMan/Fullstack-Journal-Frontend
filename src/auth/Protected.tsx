import React, { useEffect, useRef, useState } from "react";
import Keycloak, { KeycloakProfile } from "keycloak-js";
import Routing from "../Routing";
import {
  fetchPatientIdFromUserId,
  fetchPatientIdFromEmail,
  updateUserIdInDb,
  addNewPatient
} from "./AuthApi";
import NewPatientPage from "./NewPatientPage";

interface ProtectedProps {
  client: Keycloak | null;
}

const Protected: React.FC<ProtectedProps> = ({ client }) => {
  const isRun = useRef(false);
  const userId = useRef<string | null>(null);
  const email = useRef<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const keycloakProfile = useRef<KeycloakProfile | null>(null);


  const getRole = async (): Promise<string | null> => {
    if (!client) return null;

    try {
      const profile = await client.loadUserProfile();
      if (profile) {
        if (!profile.email || !profile.id) {
          return null;
        }
        keycloakProfile.current = profile;
        userId.current = profile.id;
        email.current = profile.email;
        //localStorage.setItem("username", profile.email);
        //localStorage.setItem("userId", profile.id)
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
      return null;
    }

    if (client.hasRealmRole("patient")) {
      return "PATIENT";
    }
    if (client.hasRealmRole("doctor")) {
      return "DOCTOR";
    }
    if (client.hasRealmRole("staff")) {
      return "STAFF";
    }
    return null;
  };

  const handleNewPatientSubmit = async (newPatient: NewPatientProps) => {
    const patient = await addNewPatient(newPatient)
    if (patient){
      localStorage.setItem("id", patient.id.toString())
      setId(patient.id.toString())
    }
  }

  const getPatientIdFromUserId = async (): Promise<string | null> => {
    if (userId.current) {
      return fetchPatientIdFromUserId(userId.current);
    }
    return null;
  };

  const getPatientIdFromEmail = async (): Promise<string | null> => {
    if (email.current) {
      return fetchPatientIdFromEmail(email.current);
    }
    return null;
  };

  const updateUserId = async (patientId: string, userId: string | null) => {
    if (userId) {
      return updateUserIdInDb(patientId, userId);
    }
  };

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;
    localStorage.clear();
    const fetchRole = async () => {
      const fetchedRole = await getRole();
      if (!fetchedRole) {
        console.log("Role was null");
        client?.logout();
      }
      if (fetchedRole) {
        let patientId = await getPatientIdFromUserId();

        // Patient have no user in patient db
        if (!patientId) {
          // check if patient has user in user db ()
          patientId = await getPatientIdFromEmail();
          if (patientId) {
            // update the patient db with keycloak id
            await updateUserId(patientId, userId.current);
          }
        }
        if (patientId) {
          localStorage.setItem("id", patientId);
        }
        setId(patientId);
        console.log("UserId: ", userId.current);
        console.log("PatientId: ", patientId);

        localStorage.setItem("privilege", fetchedRole);

        if (email.current) {
          localStorage.setItem("username", email.current);
        }
      }
    };
    fetchRole();
  }, [client, id]); 

  // Conditionally render the <Routing /> component if id is not null

  
  const firstName = keycloakProfile.current?.firstName;
  const lastName = keycloakProfile.current?.lastName;

  // If 'id' is not set and we have the necessary user details, show the new patient page.
  if (!id && userId.current && firstName && lastName) {
    return (
      <NewPatientPage 
        userId={userId.current} 
        firstName={firstName} 
        lastName={lastName} 
        submitNewPatient={handleNewPatientSubmit}
      />
    );
  }

  // If we have an 'id', render the Routing component, otherwise null.
  return id ? <Routing /> : null;
};

export default Protected;
