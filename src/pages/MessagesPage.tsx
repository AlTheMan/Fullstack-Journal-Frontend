// MessagesPage.tsx
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Message from '../components/Message';
import NavBar from "../components/NavBar";
import MessageForm from '../components/MessageForm';
import ListGroupGeneric from '../components/ListGroupGeneric';
import { fetchAllPatients } from '../api/GetAllPatientsTimerApi';
import { RequestTimer } from '../api/RequestTimer';



type Doctor = {
    id: number; 
    firstName: string;
    lastName: string;
    privilege: 'STAFF' | 'DOCTOR';
};


type Message ={
    id: number;
    time: Date;
    employeeId: number;
    patientId: number;
    sentById: number;
    message: string;
};

type MyIdType={
    id:number;
};



const MessagesPage = () => {
   
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [myId, setMyId] = useState<MyIdType | undefined>(undefined);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth"});
    };

    useEffect(() => {
        if (messages.length > 0) {
            // Use a timeout to allow the browser to paint the new message
            // This is a common trick to deal with timing issues in React
            const timer = setTimeout(() => {
                scrollToBottom();
            }, 100); // Adjust the timeout if necessary
    
            // Clean up the timeout when the effect is re-run or on component unmount
            return () => clearTimeout(timer);
        }
    }, [messages]);
    


    useEffect(() => {
        const idFromLocalStorage = Number(localStorage.getItem("id")) || -1;
        setMyId({ id: idFromLocalStorage });
    }, []); // empty dependency array to run the effect only once (equivalent to componentDidMount)



    const handleSelectPerson=(otherId:number ) =>{

        const myId: number = Number(localStorage.getItem("id")) || -1; //ifall att numret är null så sätts värdet till "-1"
        console.log("other id:" + otherId);
        console.log("my id: " + myId)
        localStorage.setItem("otherId", otherId.toString());
        
        const fetchMessages = async (employeeIdInput: number, patientIdInput:number) => {


            const response = await axios.get('http://localhost:8080/messages/get',{
                params: {
                    employeeId: employeeIdInput,
                    patientId: patientIdInput,
                },
            });
            if (response.status === 200) {
                //console.log("messages: " + response.data);
                const messageData: Message[] = response.data;
                setMessages(messageData);
                console.log("messages: " + messages);
            }
        }

        const privilege: string = localStorage.getItem("privilege") || "";
        if(privilege=="PATIENT"){
            fetchMessages(otherId, myId); //ordningen är egentligen inte viktig.
        }
        else if(privilege=="DOCTOR" || privilege=="STAFF"){
            fetchMessages(myId, otherId);
        }
    }


    const handleSendMessage=(message:string ) =>{

        const myId: number = Number(localStorage.getItem("id")) || -1; //ifall att numret är null så sätts värdet till "-1"
        const otherId: number = Number(localStorage.getItem("otherId")) || -1; //ifall att numret är null så sätts värdet till "-1"
        const privilege: string = localStorage.getItem("privilege") || "";
       
        //TODO: egentligen borde man bara behöva en request-body istället för två, om man ändrar lite i back-enden. Man borde ha en "senderId" och "receiverId" istället för "employeeId" och "patientId"
        // Define the data to be sent in the request body
        const requestDataPatient = {
            employeeId: otherId,
            patientId: myId,
            message: message,
            senderId: myId
        };
        const requestDataDoctor = {
            employeeId: myId,
            patientId: otherId,
            message: message,
            senderId: myId
        };

        console.log("other id:" + otherId);
        console.log("my id: " + myId)
        
        const sendMessage = async () => {
            
            if(privilege=="PATIENT"){
                const response = await axios.post('http://localhost:8080/messages/send',requestDataPatient);
                console.log("status: "+response.status);
                if(response.status==200){
                    handleSelectPerson(otherId);
                }
            }
            else{
                const response = await axios.post('http://localhost:8080/messages/send',requestDataDoctor);
                console.log("status: "+response.status);
                if (response.status === 200) {
                    handleSelectPerson(otherId);
                }
            }
        }
        sendMessage()
    }
    

    const privilege: string = localStorage.getItem("privilege") || "";
    if(privilege=="PATIENT"){
        useEffect(() => {

            const fetchData = async () => {
                const response = await axios.get('http://localhost:8080/messages/getAllStaff');
                if (response.status === 200) {
                  console.log(response.data);
                  const doctorData: Doctor[] = response.data;
                  setDoctors(doctorData);
                }
            };
        
            fetchData();
          }, []); // Empty dependency array to run the effect only once (equivalent to componentDidMount)        
    }
    else{
      useEffect(() => {
        const canMakeRequest = RequestTimer()
        const storedPatients = localStorage.getItem("patients");
        if (storedPatients) {
          const patientData: Patient[] = JSON.parse(storedPatients);
          setPatients(patientData);
        } 
        if(canMakeRequest) {
          const getPatients = async () => {
            const patientData = await fetchAllPatients()
            if (patientData){
              setPatients(patientData)
            } else {
              setPatients([])
            }
          };
          getPatients();
         
        }
    
      }, []);        
    }
 
   

  return (
    <>
  <NavBar />
  <div style={{ paddingBottom: '100px', backgroundColor: 'transparent'}}> {/* Add padding to bottom equal to the height of the fixed form */}
    <h2>List of People:</h2>
    <div style={{ overflowY: 'auto', height: 'calc(100vh - 100px)' }}> {/* Make this div scrollable */}
      {/* Render the list of doctors/staff or people */}
      <ul>
        {localStorage.getItem('privilege') === 'PATIENT' ? (
          //Visar doctor/staff lista
          <ListGroupGeneric<Doctor>
            items={doctors}
            getKey={(doctor) => doctor.id.toString()}
            getLabel={(doctor) => `${doctor.firstName} ${doctor.lastName} (ID: ${doctor.id}) ${doctor.privilege}`}
            onSelectItem={(doctor) => handleSelectPerson(doctor.id)}
          />
        ) : (
          //Visar patientlista
          <ListGroupGeneric<Patient>
            items={patients}
            getKey={(patient) => patient.patientId.toString()}
            getLabel={(patient) => `${patient.firstName} ${patient.familyName} (ID: ${patient.patientId})`}
            onSelectItem={(patient) => handleSelectPerson(patient.patientId)}
          />
        )}
      </ul>
      <ul>
        {/* Render messages here */}
        {messages.map((message) => (
          <li key={message.id} style={{
            listStyleType: 'none',
            padding: '12px',
            marginRight: '32px',
            textAlign: message.sentById == myId?.id ? 'right' : 'left',
            backgroundColor: message.sentById == myId?.id ? '#cce5ff' : '#f0f0f0',
          }}>
            {message.message} <br />
          </li>
        ))}
      </ul>
      <div ref={messagesEndRef}></div>
    </div>
  </div>
  
  {/* Message form with fixed position */}
  <div style={{
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    padding: '12px',
    backgroundColor: 'transparent'
  }}>
    <MessageForm onSubmit={handleSendMessage} />
  </div>
  
</>

  );
};

export default MessagesPage;



/* alternativt:
{doctors.map((doctor: Doctor) => (
        <li key={doctor.id}
        onClick={()=> {
            setSelectedIndex(doctor.id);
            handleSelectDoctor(doctor.id);
        }}
        className={selectedIndex===doctor.id ? 'list-group-item active': 'list-group-item'}
        >
            {`${doctor.firstName} ${doctor.lastName} (ID: ${doctor.id}) ${doctor.privilege} `}
        </li>
    ))}
*/

