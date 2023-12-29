import axios from "axios";
import { patientApiAddress} from "../../RequestAddresses.ts";

type Patient = {
    id: number
}

export const postCondition = async (
    code: string,
    bodySite: string,
    clinicalStatus: string,
    severity: string,
    category: string,
    evidence: string,
    verificationStatus: string,
    patientId: number,
    token: string | undefined
) => {

    const patient: Patient = {id: patientId}
    const requestUri = patientApiAddress() + 'condition/add';

    try {
        const response = await axios.post(
            requestUri,
            {
                code,
                bodySite,
                clinicalStatus,
                severity,
                category,
                evidence,
                verificationStatus,
                patient
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            
            
       );

        if (response.status === 200) {
            console.log("Created");
        } else {
            console.error("Something went wrong", response.statusText);
        }
    } catch (error) {
        console.error("Something went wrong posting observation", error);
    }
};
