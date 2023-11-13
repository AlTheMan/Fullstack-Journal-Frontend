import Button from "../components/Button";


const HomePage = () =>{
    return (
        <div>
            <Button onClick={()=>console.log('clicked')}> login</Button>
            <Button onClick={()=>console.log('clicked')}> Register</Button>
        </div>
    )
}

export default HomePage;