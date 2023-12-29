import { createContext } from 'react';
import Keycloak from 'keycloak-js';

interface AuthContext {
  client: Keycloak | null;
  isLogin: boolean;
  getToken: () => string | undefined;
}

// Function to get the token
const getToken = (client: Keycloak | null): string | undefined => {
  return client?.token;
};

// Default context value with the method
const defaultContext: AuthContext = {
  client: null,
  isLogin: false,
  getToken: () => getToken(null),
};

export const AuthContext = createContext<AuthContext>(defaultContext);
