// MessagesPage.tsx
import { useEffect, useState } from 'react';
import ListGroupGeneric from '../components/ListGroupGeneric';
import NavBarDoctor from '../components/NavBarDoctor';
import { fetchAllPatients } from '../api/GetAllPatientsTimerApi';
import { RequestTimer } from '../api/RequestTimer';


const MessagesPage = () => {
   
    const [patients, setPatients] = useState<Patient[]>([]);

    const handleSelectPerson=(otherId:number ) =>{

        const myId: number = Number(localStorage.getItem("id")) || -1; //ifall att numret är null så sätts värdet till "-1"
        console.log("other id:" + otherId);
        console.log("my id: " + myId)
        localStorage.setItem("otherId", otherId.toString());

        //const privilege: string = localStorage.getItem("privilege") || "";
        
    }


    useEffect(() => {
        const canMakeRequest = RequestTimer()
        const storedPatients = localStorage.getItem("patients");
        if (storedPatients) {
          const patientData: Patient[] = JSON.parse(storedPatients);
          setPatients(patientData);
        } 
        if (canMakeRequest){
          const getPatients = async () => {
            const patientData = await fetchAllPatients();
            if (patientData){
              setPatients(patientData)
            } else {
              setPatients([])
            }
          };
          getPatients();
         
        }
    
      }, []);
 
   

  return (
    <>
    <NavBarDoctor></NavBarDoctor>
    <div style={{ paddingBottom: '100px', backgroundColor: 'transparent'}}> {/* Add padding to bottom equal to the height of the fixed form */}
        <h2>List of People:</h2>
        <div style={{ overflowY: 'auto', height: 'calc(100vh - 100px)' }}> {/* Make this div scrollable */}
            <ul>
                //Visar patientlista
                <ListGroupGeneric<Patient>
                    items={patients}
                    getKey={(patient) => patient.id.toString()}
                    getLabel={(patient) => `${patient.firstName} ${patient.lastName} (ID: ${patient.id})`}
                    onSelectItem={(patient) => handleSelectPerson(patient.id)}
                />
            </ul>
        </div>
    </div>
    </>
  );
};

export default MessagesPage;

