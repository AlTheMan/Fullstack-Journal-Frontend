import { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

const client = new Keycloak({
  url: 'https://keycloak-dev.vm-app.cloud.cbh.kth.se/', // import.meta.env.VITE_KEYCLOAK_URL
  realm: 'journalrealm', //import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: 'testclient2' //import.meta.env.VITE_KEYCLOAK_CLIENT,
});


const UseAuth = (): [boolean, Keycloak | null] => {
    const isRun = useRef(false);
    const [, setToken] = useState<string | null>(null);
    const [isLogin, setLogin] = useState<boolean>(false);
  
    useEffect(() => {
     
      if (isRun.current) return;
     
      isRun.current = true;
      client
        .init({
          onLoad: "login-required",
        })
        .then((res) => {
          setLogin(res);
          setToken(client.token ? client.token : null);

          console.log(client.token)
          console.log(client.refreshToken)

        });
    }, []);
    return [isLogin, client];
  };
  
  export default UseAuth;