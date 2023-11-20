import axios from "axios"

export const fetchEncounters = async (
    username: string,
    patientId: number
) => {

    const requestUri = "http://localhost:8080/patient/encounter";

    try { const response = await axios.get<EncounterCollection>(
        requestUri, {
            params: {patientId},
            headers: {username: username}
        }
    );
    console.log("Fetching encounters...");
    if (response.status === 200) {
        console.log("Encounters fetched")
        const encounterData = response.data;
        console.log(response.data);
        return encounterData
    } else {
        console.error("Failed to get patient encounters");
        return null
    }

    } catch (error){
        console.error("An error occured while fetching encounter data", error);
        return null
    }


}

export default fetchEncounters;