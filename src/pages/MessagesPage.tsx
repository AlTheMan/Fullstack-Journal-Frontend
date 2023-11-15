// MessagesPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Message from '../components/Message';
import NavBar from '../components/Navbar';
import MessageForm from '../components/MessageForm';
import ListGroupGeneric from '../components/ListGroupGeneric';



type Doctor = {
    id: number; //elr long
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
    const [messages, setMessages] = useState<Message[]>([]);
    const [myId, setMyId] = useState<MyIdType | undefined>(undefined);


    useEffect(() => {
        const idFromLocalStorage = Number(localStorage.getItem("id")) || -1;
        setMyId({ id: idFromLocalStorage });
    }, []); // empty dependency array to run the effect only once (equivalent to componentDidMount)


    const handleSelectDoctor=(otherId:number ) =>{

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
            fetchMessages(otherId, myId); //ordningen av Idn är viktig för backend.
        }
        else if(privilege=="DOCTOR" || privilege=="STAFF"){
            fetchMessages(myId, otherId);
        }
    }


    const handleSendMessage=(message:string ) =>{

        const myId: number = Number(localStorage.getItem("id")) || -1; //ifall att numret är null så sätts värdet till "-1"
        const otherId: number = Number(localStorage.getItem("otherId")) || -1; //ifall att numret är null så sätts värdet till "-1"
        const privilege: string = localStorage.getItem("privilege") || "";
       
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
                //const updatedMessages = await fetchMessages(myId, otherId);
                //setMessages(updatedMessages);

                //const messageData: Message[] = response.data;
                //setMessages(messageData);
                //console.log("messages: " + messages);
                }
            }
            else{
                const response = await axios.post('http://localhost:8080/messages/send',requestDataDoctor);
                console.log("status: "+response.status);
                if (response.status === 200) {
                }
            }
        }
        sendMessage()

        if(privilege=="PATIENT"){
            //fetchMessages(otherId, myId); //ordningen av Idn är viktig för backend.
        }
        else if(privilege=="DOCTOR" || privilege=="STAFF"){
            //fetchMessages(myId, otherId);
        }
    }
    


    
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

   

  return (
    <>
    <NavBar></NavBar>
    <div>{/* Render the list of doctors */}
    <h2>List of Doctors:</h2>
        <ul>
            {/* Visar Läkare/staff här */}
            <ListGroupGeneric<Doctor>
                items={doctors}
                getKey={(doctor) => doctor.id.toString()}
                getLabel={(doctor) => `${doctor.firstName} ${doctor.lastName} (ID: ${doctor.id}) ${doctor.privilege}`}
                onSelectItem={(doctor) => handleSelectDoctor(doctor.id)}
            />
        </ul>
        <ul>
            {/* Visar meddelanden här */}
            {messages.map((message) => (
                <li key={message.id}
                style={{
                    listStyleType: 'none',
                    padding: '12px',
                    marginRight: '32px',
                    textAlign: message.sentById == myId?.id ? 'right' : 'left',
                    backgroundColor: message.sentById == myId?.id ? '#cce5ff' : '#f0f0f0',
                }}
                >
                    {message.message} <br />
                </li>
            ))}

            {/* Skickar meddelanden här */}
            <div>
                <MessageForm onSubmit={handleSendMessage} />
            </div>
      </ul>
      <ul>
      </ul>
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

/*
{messages.map((message) => (
    <li key={message.id}>
        <strong>ID:</strong> {message.id} <br />
        <strong>Time:</strong> {message.time.toLocaleString()} <br />
        <strong>Employee ID:</strong> {message.employeeId} <br />
        <strong>Patient ID:</strong> {message.patientId} <br />
        <strong>Sent By ID:</strong> {message.sentById} <br />
        <strong>Message:</strong> {message.message} <br />
    </li>
))}
*/
