//import { AuthContext } from "./auth/AuthContext.tsx";
import Protected from "./auth/Protected";
import Public from "./auth/Public";
//import UseAuth from "./auth/UseAuth.tsx";
import { useKeycloak } from "@react-keycloak/web";

function App() {
  //const [isLogin, client] = UseAuth();

  const {keycloak} = useKeycloak()


  return (
      keycloak.authenticated ? <Protected/> : <Public />
  );
}

export default App;
