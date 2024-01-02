//import { AuthContext } from "./auth/AuthContext.tsx";
import Protected from "./auth/Protected";
import Public from "./auth/Public";
//import UseAuth from "./auth/UseAuth.tsx";
import { useKeycloak } from "@react-keycloak/web";

function App() {
  const {keycloak} = useKeycloak()
  console.log(keycloak.authenticated)



  return (

      keycloak.authenticated ? <Protected/> : <Public />
  );
}

export default App;
