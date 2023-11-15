import axios from "axios";

export const fetchData = async (
    username: string,
    patientId: number
) => {

    var requestUri = "http://localhost:8080/patient/condition";

    try {
        const response = await axios.get<ConditionCollection>(requestUri, {
            params: {patientId},
            headers: {username: username}
        });
        
        if (response.status === 200){
            const conditionData = response.data;
            console.log(response.data)
            return conditionData;
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


export default fetchData;