import Keycloak from "keycloak-js";

const keycloakConfig = new Keycloak({
  url: "https://keycloak-dev.vm-app.cloud.cbh.kth.se",
  realm: "journalrealm",
  clientId: "testclient2",
});

export default keycloakConfig;
