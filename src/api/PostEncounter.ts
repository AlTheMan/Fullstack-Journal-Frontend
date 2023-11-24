import axios from "axios";
import { patientApiAddress } from "./RequestAddresses";

type Patient = {
    id: number;
}

type Doctor = {
    id: number;
}

export const PostEncounter = async (status: string, reason: string, priority: string, patientId: number, doctorId:number) => {
    var requestUri = patientApiAddress() +  '/encounter/add';

    let patient: Patient = {id: patientId}
    let doctor: Doctor = {id: doctorId}


    try {
        const response = await axios.post(requestUri, {
            status,
            reason,
            priority,
            patient,
            doctor
        });

        console.log(response)

        if (response.status === 200) {
            console.log("Created");
        } else {
            console.error("Something went wrong", response.statusText);
        }
    } catch (error) {
        console.error("Something went wrong posting observation", error);
    }
};
