import React, { useEffect, useRef } from 'react';
import Keycloak, {  } from 'keycloak-js';
import Routing from '../Routing';

interface ProtectedProps {
  client: Keycloak | null;
}

const Protected: React.FC<ProtectedProps> = ({ client }) => {

  const isRun = useRef(false);

  const getRole = async (): Promise<string | null> => {
    if (!client) return null;

    try {
      const profile = await client.loadUserProfile(); // Use await to wait for the profile
      if (profile) {
        if (!profile.email) {
          return null
        }
        localStorage.setItem("username", profile.email)
        localStorage.setItem("keycloakProfile", JSON.stringify(profile))
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }

    if (client.hasRealmRole('patient')) {
      console.log('PATIENT');
      return 'PATIENT';
    }
    if (client.hasRealmRole('doctor')) {
      console.log('DOCTOR');
      return 'DOCTOR';
    }
    if (client.hasRealmRole('staff')) {
      console.log('STAFF');
      return 'STAFF';
    }
    return null;
  };

  const logout = async () => {
    client?.logout();
  };

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    const fetchRole = async () => {
      const role = await getRole();
      if (!role) {
        console.log('Role was null');
        logout()
      }
      
      console.log(localStorage.getItem("username"))

    };

    fetchRole();
  }, []); // Removed username from the dependency array

  return (
    <>
      <Routing />
    </>
  );
};

export default Protected;
