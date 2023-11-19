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

export const postNote = async (note: string, patientId: number) => {
    var username = localStorage.getItem("username");
    var writtenBy = localStorage.getItem("id");

    var requestUri = "http://localhost:8080/patient/note/add"

    try {
        const response = await axios.post<String>(requestUri, {
            note,
            patientId,
            writtenBy
        }, {
            headers: {username: username}
        }
        );
        if (response.status === 200) {
            console.log("Created")
        } else {
            console.error("Something went wrong", response.statusText)
        }
    } catch (error){
        console.error("Something went wrong posting note", error)
    }

    
}