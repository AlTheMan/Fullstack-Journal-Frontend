import { AuthContext } from "./auth/AuthContext.tsx";
import Protected from "./auth/Protected";
import Public from "./auth/Public";
import UseAuth from "./auth/UseAuth.tsx";

function App() {
  const [isLogin, client] = UseAuth();
  return (
    <AuthContext.Provider value={{ client, isLogin }}>
      {isLogin ? <Protected client={client} /> : <Public />}
    </AuthContext.Provider>
  );
}

export default App;
