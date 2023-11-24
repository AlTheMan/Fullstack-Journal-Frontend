import axios from "axios"
import { patientApiAddress } from "./RequestAddresses";

export const fetchEncounters = async (
    patientId: number
) => {
    

    const requestUri = patientApiAddress() + '/encounter';

    try { const response = await axios.get<Encounter[]>(
        requestUri, {
            params: {patientId},
        }
    );
    console.log("Fetching encounters...");
    if (response.status === 200) {
        console.log("Encounters fetched")
        const encounterData = response.data;
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