import axios from "axios";

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
    var username = localStorage.getItem("username");
    

    var requestUri = "http://localhost:8080/patient/condition/add";

    try {
        const response = await axios.post(requestUri, {
            code,
            bodySite,
            clinicalStatus,
            severity,
            category,
            evidence,
            verificationStatus,
            patientId
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
