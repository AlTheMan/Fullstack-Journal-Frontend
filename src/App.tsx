import Protected from './auth/Protected';
import Public from './auth/Public';
import UseAuth from "./auth/UseAuth.tsx";

function App() {

  const [isLogin, client] = UseAuth();
  return isLogin ? <Protected client={client} /> : <Public />;
  
  //return (
  //  
  //  <Routing></Routing>
  //)
}
/*   <div className='App'> <HomePage></HomePage></div> */
export default App
