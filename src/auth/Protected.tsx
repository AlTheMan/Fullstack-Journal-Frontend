import React, { useEffect, useRef, useState } from "react";
import { KeycloakProfile } from "keycloak-js";
import Routing from "../Routing";
import { useLocalStorage } from "../hooks/useLocalStorage";


import {
  fetchPersonIdByUserId,
  addNewPatient,
  addNewStaff
} from "./AuthApi";
import NewPatientPage from "./NewPatientPage";
import {useKeycloak} from "@react-keycloak/web";



const Protected: React.FC = () => {
  const isRun = useRef(false);
  const userId = useRef<string | null>(null);
  const email = useRef<string | null>(null);
  const [id, setId] = useState<string | null>("");
  const keycloakProfile = useRef<KeycloakProfile | null>(null);
  const { setItem } = useLocalStorage();
  const {keycloak: keycloak} = useKeycloak()

  const getRole = async (): Promise<string | null> => {
    if (!keycloak) return null;
    try {
      const profile = await keycloak.loadUserProfile();
      if (profile) {
        if (!profile.email || !profile.id) {
          return null;
        }
        keycloakProfile.current = profile;
        userId.current = profile.id;
        email.current = profile.email;
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
      return null;
    }


    if (keycloak.hasRealmRole("patient")) {
      return "PATIENT";
    }
    if (keycloak.hasRealmRole("doctor")) {
      return "DOCTOR";
    }
    if (keycloak.hasRealmRole("staff")) {
      return "STAFF";
    }
    return null;
  };

  // This function add a new patient to patientDB and adds a new user to the user db
  const handleNewPatientSubmit = async (newPatient: NewPatientProps) => {
    const patient = await addNewPatient(newPatient);
    if (patient) {
      setItem("id", patient.id.toString());
      setId(patient.id.toString());
    }
  };

  const handleStaff = async (privilege: string) => {
    const firstName = keycloakProfile.current?.firstName;
    const lastName = keycloakProfile.current?.lastName;
    const userId = keycloakProfile.current?.id
    console.log(userId)

    if (firstName && lastName && userId) {
      const staff = await addNewStaff(firstName, lastName, userId, privilege);
      if (staff){
        setItem("id", staff.id.toString())
        setId(staff.id.toString())
      }
    }
  };

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    const fetchRole = async () => {
      const fetchedRole = await getRole();
      if (!fetchedRole) {
        console.log("Role was null");
        keycloak?.logout();
      }
      console.log(fetchedRole)
      const personId = await fetchPersonIdByUserId(userId.current);
      if (!personId) {
        if (fetchedRole === "PATIENT") {
          setId(null); // Sets id to null, so it redirects to new patient page
        } else if (fetchedRole === "STAFF" || fetchedRole === "DOCTOR") {
          await handleStaff(fetchedRole);
        }
      } else {
        localStorage.setItem("id", personId);
        setId(personId);
      }

      console.log("Patient id is ", localStorage.getItem("id"))

      if (fetchedRole) {
        setItem("privilege", fetchedRole);
      }

      if (email.current) {
        setItem("username", email.current);
      }
    };
    fetchRole();
  }, [keycloak, id]);


  const firstName = keycloakProfile.current?.firstName;
  const lastName = keycloakProfile.current?.lastName;

  // If 'id' is not set, and we have the necessary user details, show the new patient page.
  if (id === null && userId.current && firstName && lastName) {
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
