import { useState, useEffect } from "react";
import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: "https://keycloak-dev.vm-app.cloud.cbh.kth.se/",
  realm: "journalrealm",
  clientId: "testclient2",
};

// Initialize Keycloak instance
const keycloak = new Keycloak(keycloakConfig);

const useAuth = (): [boolean, Keycloak | null] => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
      // Initialization and authentication check
      keycloak
        .init({ onLoad: "login-required" })
        .then((authenticated) => {
          setIsAuthenticated(authenticated);

          if (!authenticated) {
            keycloak.login();
          }
        })
        .catch(console.error);

      // Cleanup
      return () => {
       
        // Add cleanup code if needed
      };
  }, []);

  return [isAuthenticated, keycloak];
};

export default useAuth;
