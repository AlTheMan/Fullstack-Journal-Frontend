// MessagesPage.tsx
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import NavBar from "../components/NavBar";
import MessageForm from '../components/MessageForm';
import ListGroupGeneric from '../components/ListGroupGeneric';
import { fetchAllPatients } from '../api/GetAllPatientsTimerApi';
import { RequestTimer } from '../api/RequestTimer';
import { messageApiAddress } from '../api/RequestAddresses';



type Doctor = {
    id: number; 
    firstName: string;
    lastName: string;
    privilege: 'STAFF' | 'DOCTOR';
};


type Message ={
    id: number;
    time: Date;
    senderId: number;
    receiverId: number;
    message: string;
};

type MyIdType={
    id:number;
};



// Function to setup SSE connection
const setupSseConnection = (setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => {
  const eventSource = new EventSource(messageApiAddress()+'/stream/'); // Adjust the URL to your SSE endpoint

  eventSource.onmessage = event => {
      const newMessage = JSON.parse(event.data) as Message;
      setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  eventSource.onerror = error => {
      console.error('SSE error:', error);
      eventSource.close();
  };

  return eventSource;
};


const MessagesPage2 = () => {
   
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [myId, setMyId] = useState<MyIdType | undefined>(undefined);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);


     // Setup SSE connection
     useEffect(() => {
      const eventSource = setupSseConnection(setMessages);

      return () => {
          eventSource.close();
      };
  }, []);

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
        
        const fetchMessages = async (myId: number, otherId:number) => {
            const response = await axios.get(messageApiAddress() + '/get',{
                params: {
                    id1: myId,
                    id2: otherId,
                },
            });
            if (response.status === 200) {
              console.log("response=200");
                console.log("API Response:"+ response.data);
                const messageData: Message[] = response.data;
                setMessages(messageData);
                console.log("messages: " + messages);
            }else{
              console.log("error retreiving data: " + response.status)
            }
        }
        fetchMessages(myId, otherId);
        
    }


    const handleSendMessage=(message:string ) =>{

        const myId: number = Number(localStorage.getItem("id")) || -1; //ifall att numret är null så sätts värdet till "-1"
        const otherId: number = Number(localStorage.getItem("otherId")) || -1; //ifall att numret är null så sätts värdet till "-1"
       
        //TODO: egentligen borde man bara behöva en request-body istället för två, om man ändrar lite i back-enden. Man borde ha en "senderId" och "receiverId" istället för "employeeId" och "patientId"
        // Define the data to be sent in the request body
        const requestData = {
            senderId: myId,
            receiverId: otherId,
            message: message
        };

        console.log("other id:" + otherId);
        console.log("my id: " + myId)
        
        const sendMessage = async () => {
            const response = await axios.post(messageApiAddress() + '/send/',requestData);
            console.log("status: "+response.status);
            if(response.status==200){
                handleSelectPerson(otherId);
            }
        }
        sendMessage()
    }
    

    const privilege: string = localStorage.getItem("privilege") || "";
    
    useEffect(() => {
      if(privilege=="PATIENT"){
        const fetchData = async () => {
            const response = await axios.get(messageApiAddress() + '/getAllStaff');
            if (response.status === 200) {
              console.log(response.data);
              const doctorData: Doctor[] = response.data;
              setDoctors(doctorData);
            }
            else{
              console.log("error fetching staff: " + response.status)
              console.log("response data: " + response.data)
            }
        };
    
        fetchData();
      }
      else{
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
      }
    }, []); // Empty dependency array to run the effect only once (equivalent to componentDidMount)        
         
 
   

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
            getKey={(patient) => patient.id.toString()}
            getLabel={(patient) => `${patient.firstName} ${patient.lastName} (ID: ${patient.id})`}
            onSelectItem={(patient) => handleSelectPerson(patient.id)}
          />
        )}
      </ul>
      <ul>
        {/* Render messages here */}
        {Array.isArray(messages) && messages.map((message) => ( //kollar om messages är en array
          <li key={message.id} style={{
            listStyleType: 'none',
            padding: '12px',
            marginRight: '32px',
            textAlign: message.senderId == myId?.id ? 'right' : 'left',
            backgroundColor: message.receiverId == myId?.id ? '#cce5ff' : '#f0f0f0',
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

export default MessagesPage2;



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

