import { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: 'https://keycloak-dev.vm-app.cloud.cbh.kth.se/', //'http://localhost:8080/',
  realm: 'journalrealm',
  clientId: 'testclient2',
  onLoad: 'check-sso', // check-sso | login-required
  KeycloakResponseType: 'code',
};

const keycloak = new Keycloak(keycloakConfig);

const useAuth = () : [Boolean, Keycloak | null]=>  {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isRun = useRef(false)

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true
    keycloak.init({
      onLoad: 'login-required',
      //silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      pkceMethod: 'S256'
    }).then((authenticated) => {
      setIsAuthenticated(authenticated);
      if (authenticated) {
        console.log('Authenticated');
        // Store the tokens securely or dispatch them to your state management
      } else {
        console.log('Not authenticated');
        keycloak.login();
      }
    }).catch(console.error);



    // Token refresh logic could be implemented here or elsewhere in your application logic
  }, []);

  return [isAuthenticated, keycloak];
};

export default useAuth
