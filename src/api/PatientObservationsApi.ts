import axios from "axios";
import { patientApiAddress } from "./RequestAddresses";

export const fetchObservations = async (
    username: string,
    patientId: number
) => {

    const requestUri = patientApiAddress() + '/observation';

    try {
        const response = await axios.get<Observation[]>(requestUri, {
            params: {patientId},
            headers: {username: username}
        });
        
        if (response.status === 200){
            const observationData = response.data;
            console.log(response.data)
            return observationData;
        } 
        else {
            console.error("Failed to fetch condition data");
            return null;
        }
        
    } catch (error){
        console.error('An error occured while fetching condition data ', error)
        return null;
    }
    
   

}


export default fetchObservations;