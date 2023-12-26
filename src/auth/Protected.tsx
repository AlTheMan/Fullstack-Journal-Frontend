import React, { useEffect, useRef, useState } from 'react';
import Keycloak from 'keycloak-js';
import Routing from '../Routing';

interface ProtectedProps {
  client: Keycloak | null;
}

const Protected: React.FC<ProtectedProps> = ({ client }) => {
  const isRun = useRef(false);
  const [role, setRole] = useState<string | null>(null);

  const getRole = async (): Promise<string | null> => {
    if (!client) return null;

    try {
      const profile = await client.loadUserProfile();
      if (profile) {
        if (!profile.email) {
          return null;
        }
        localStorage.setItem("username", profile.email);
        localStorage.setItem("keycloakProfile", JSON.stringify(profile));
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

  const logout = () => {
    client?.logout();
  };

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    const fetchRole = async () => {
      const fetchedRole = await getRole();
      setRole(fetchedRole); // Set the role in state
      if (!fetchedRole) {
        console.log('Role was null');
        logout(); // Logout if the role is null
      }
      if (fetchedRole) {
        localStorage.setItem("privilege", fetchedRole)
      }

    };

    fetchRole();
  }, [client]); // Depend on client

  // Conditionally render the <Routing /> component if role is not null
  return (
    <>
      {role && <Routing />}
    </>
  );
};

export default Protected;
