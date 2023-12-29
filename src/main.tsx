import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloakConfig from "./auth/KeycloakConfig.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ReactKeycloakProvider
    authClient={keycloakConfig}
    initOptions={{ onLoad: "login-required" }}
  >
    <App />
  </ReactKeycloakProvider>
  /*
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  */
);
