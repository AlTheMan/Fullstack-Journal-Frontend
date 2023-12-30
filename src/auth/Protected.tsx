import React, {useEffect, useRef, useState} from "react";
import {KeycloakProfile} from "keycloak-js";
import Routing from "../Routing";
import {useLocalStorage} from "../hooks/UseLocalStorage.ts";
import NewPatientPage from "./NewPatientPage";
import {useKeycloak} from "@react-keycloak/web";
import {fetchPersonIdByUserId} from "../api/auth/FetchPersonIdByUserId.ts";
import {addNewStaff} from "../api/auth/AddNewStaff.ts";
import {addNewPatient} from "../api/auth/AddNewPatient.ts";
import useTokenHandler from "./UseTokenHandler.tsx";


const Protected: React.FC = () => {
    const {keycloak: keycloak} = useKeycloak()
    const [userId, setUserId] = useState<string | null>(null);
    const email = useRef<string | null>(null);
    const keycloakProfile = useRef<KeycloakProfile | null>(null);
    const {setItem} = useLocalStorage();
    const token = useTokenHandler();


    const [id, setId] = useState<string | null>("");


    const getRole = async (): Promise<string | null> => {
        if (!keycloak) return null;
        try {
            const profile = await keycloak.loadUserProfile();
            if (profile) {
                if (!profile.email || !profile.id) {
                    return null;
                }
                keycloakProfile.current = profile;
                setUserId(profile.id) //= profile.id;
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
        const patient = await addNewPatient(newPatient, token);
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
            const staff = await addNewStaff(firstName, lastName, userId, privilege, token);
            if (staff) {
                setItem("id", staff.id.toString())
                setId(staff.id.toString())
            }
        }
    };


    useEffect(() => {
        const fetchRoleAndPersonId = async () => {
            try {
                const fetchedRole = await getRole();
                if (!fetchedRole) {
                    console.log("Role was null");
                    keycloak?.logout();
                    return;
                }

                if (!userId) return;
                const personId = await fetchPersonIdByUserId(userId, keycloak.token);
                if (!personId) {
                    if (fetchedRole === "PATIENT") {
                        setId(null); // Redirects to new patient page
                    } else if (fetchedRole === "STAFF" || fetchedRole === "DOCTOR") {
                        await handleStaff(fetchedRole);
                    }
                } else {
                    localStorage.setItem("id", personId.toString());
                    setId(personId.toString());
                }

                setItem("privilege", fetchedRole);

                if (email.current) {
                    setItem("username", email.current);
                }
            } catch (error) {
                console.error("Error fetching role or person ID: ", error);
            }
        };

        fetchRoleAndPersonId();
    }, [keycloak, userId]);


    const firstName = keycloakProfile.current?.firstName;
    const lastName = keycloakProfile.current?.lastName;

    // If 'id' is not set, and we have the necessary user details, show the new patient page.
    if (id === null && userId && firstName && lastName) {
        return (<NewPatientPage
                userId={userId}
                firstName={firstName}
                lastName={lastName}
                submitNewPatient={handleNewPatientSubmit}
            />);
    }

    // If we have an 'id', render the Routing component, otherwise null.

    return id ? <Routing/> : null;
};

export default Protected;
