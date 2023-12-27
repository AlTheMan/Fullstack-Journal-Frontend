import Protected from './auth/Protected';
import Public from './auth/Public';
import UseAuth from "./auth/UseAuth.tsx";

function App() {
  const [isLogin, client] = UseAuth();

  return isLogin ? <Protected client={client} /> : <Public />;

}

export default App
