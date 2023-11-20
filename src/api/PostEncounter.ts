import axios from "axios";

export const PostEncounter = async (status: string, reason: string, priority: string, patientId: number, doctorIds:number[]) => {
    var requestUri = "http://localhost:8080/patient/encounter/add";

    try {
        const response = await axios.post(requestUri, {
            status,
            reason,
            priority,
            patientId,
            doctorIds
        });

        if (response.status === 200) {
            console.log("Created");
        } else {
            console.error("Something went wrong", response.statusText);
        }
    } catch (error) {
        console.error("Something went wrong posting observation", error);
    }
};
