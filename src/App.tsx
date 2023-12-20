import Routing from './Routing';
import Protected from './auth/Protected';
import Public from './auth/Public';
import UseAuth from "./auth/UseAuth.tsx";

function App() {

  const [isLogin, token] = UseAuth();
  return isLogin ? <Protected token={token} /> : <Public />;
  
  //return (
  //  
  //  <Routing></Routing>
  //)
}
/*   <div className='App'> <HomePage></HomePage></div> */
export default App
