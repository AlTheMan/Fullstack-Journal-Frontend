import Button from './components/Button'
import Login from './pages/Login'


function App() {

  return (
   <div> hej <Button children='Login' onClick={()=>console.log('clicked')}></Button> 
   <Login></Login>
   </div>
  )
}

export default App
