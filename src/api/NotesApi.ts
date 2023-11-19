import axios from "axios";


export const fetchNotes = async (username: string, patientId: number) => {

    var requestUri = "http://localhost:8080/patient/note/get";

    try {
        const response = await axios.get<NoteCollection>(requestUri, {
            params: {patientId},
            headers:{ username: username}
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