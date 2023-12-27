import React, { useEffect, useRef, useState } from 'react';
import Keycloak from 'keycloak-js';
import Routing from '../Routing';
import { fetchPatientIdFromUserId, fetchPatientIdFromEmail,updateUserIdInDb } from './AuthApi';

interface ProtectedProps {
  client: Keycloak | null;
}

const Protected: React.FC<ProtectedProps> = ({ client }) => {
  const isRun = useRef(false);
  const [role, setRole] = useState<string | null>(null);
  const userId = useRef<string | null>(null)
  const email = useRef<string | null>(null)
  const [id, setId] = useState<string | null>(null);
  



  const getRole = async (): Promise<string | null> => {
    if (!client) return null;

    try {
      const profile = await client.loadUserProfile();
      if (profile) {
        if (!profile.email || !profile.id) {
          return null;
        }

        userId.current = profile.id
        email.current = profile.email
        //localStorage.setItem("username", profile.email);
        //localStorage.setItem("userId", profile.id)
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      return null;
    }

    if (client.hasRealmRole('patient')) {
      return 'PATIENT';
    }
    if (client.hasRealmRole('doctor')) {
      return 'DOCTOR';
    }
    if (client.hasRealmRole('staff')) {
      return 'STAFF';
    }
    return null;
  };


  const getPatientIdFromUserId = async (): Promise<string | null> => {
    if (userId.current) {
      return fetchPatientIdFromUserId(userId.current);
    }
    return null;
  }

  const getPatientIdFromEmail = async (): Promise<string | null> => {
    if (email.current) {
      return fetchPatientIdFromEmail(email.current)
    }
    return null;
  }

  const updateUserId = async (patientId: string, userId: string | null) => {
    if (userId) {
        return updateUserIdInDb(patientId, userId)
    }
  }

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    const fetchRole = async () => {
      const fetchedRole = await getRole();
      setRole(fetchedRole);
      if (!fetchedRole) {
        console.log('Role was null');
        client?.logout();
      }
      if (fetchedRole) {
        

        let patientId = await getPatientIdFromUserId();

        // Patient have no user in patient db
        if (!patientId) {
          // check if patient has user in user db ()
          patientId = await getPatientIdFromEmail();

          if (!patientId) {
            patientId = "-1"
          } else {
            // update the patient db with keycloak id 
            await updateUserId(patientId, userId.current)
          }
        }
        localStorage.setItem("id", patientId);
        setId(patientId)
        console.log("UserId: ", userId.current)
        console.log("PatientId: ", patientId)


        localStorage.setItem("privilege", fetchedRole)
        
        if (email.current) {
          localStorage.setItem("username", email.current)
        }






      }

    };
    fetchRole()
  }, [client]); // Depend on client

  // Conditionally render the <Routing /> component if id is not null
  return (
    <>
      {id && <Routing />}
    </>
  );
};

export default Protected;
