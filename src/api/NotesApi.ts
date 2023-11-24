import axios from "axios";
import { patientApiAddress } from "./RequestAddresses";

type Staff = {
    id: number
}
type Patient = {
    id: number
}


export const fetchNotes = async (patientId: number) => {

    const requestUri = patientApiAddress() + '/note';

    try {
        const response = await axios.get<Note[]>(requestUri, {
            params: {patientId},
        });

        if (response.status === 200){
            const noteData = response.data;
            console.log(noteData)
            return noteData;
        } else {
            console.error("Something when wrong trying to fetch notes");
            return null;
        }
    
    } catch(error) {
        console.log("An error occured while fetching note data", error);
        return null;
    }


}

export default fetchNotes;

export const postNote = async (noteText: string, patientId: number, writtenById: number) => {
   
    var requestUri = patientApiAddress() + '/note/add';

    const writtenBy: Staff = {id: writtenById}
    const patient: Patient = {id: patientId}

    try {
        const response = await axios.post<String>(requestUri, {
            noteText,
            patient,
            writtenBy
        }
        );
        if (response.status === 200) {
            console.log(response.data)
        } else {
            console.error("Something went wrong", response.statusText)
        }
    } catch (error){
        console.error("Something went wrong posting note", error)
    }

    
}