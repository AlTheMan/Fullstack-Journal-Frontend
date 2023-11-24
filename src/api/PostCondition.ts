import axios from "axios";
import { patientApiAddress } from "./RequestAddresses";

type Patient = {
    id: Number
}

export const PostCondition = async (
    code: string, 
    bodySite: string,
    clinicalStatus: string,
    severity: string,
    category: string,
    evidence: string,
    verificationStatus: string,
    patientId: number
    ) => {
   
    let patient: Patient = {id: patientId}
    
    

    var requestUri = patientApiAddress() + '/condition/add';

    try {
        const response = await axios.post(requestUri, {
            code,
            bodySite,
            clinicalStatus,
            severity,
            category,
            evidence,
            verificationStatus,
            patient
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
