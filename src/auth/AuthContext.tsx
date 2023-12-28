import { createContext } from "react";
import Keycloak from "keycloak-js";

interface AuthContext {
    client: Keycloak | null,
    isLogin: Boolean
}

export const AuthContext = createContext<AuthContext>({
  client: null,
  isLogin: false
});