import axios from "axios";
import {patientApiAddress} from "../../RequestAddresses";


type Patient = {
    id: number;
}

type Doctor = {
    id: number;
}

export const postEncounter = async (status: string, reason: string, priority: string, patientId: number, doctorId: number, token: string | undefined) => {
    const requestUri = patientApiAddress() + 'encounter/add';

    const patient: Patient = {id: patientId}
    const doctor: Doctor = {id: doctorId}


    try {
        const response = await axios.post(requestUri, {
            status, reason, priority, patient, doctor
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 200) {
            console.log("created: ", response.data)
        } else {
            console.error("Something went wrong", response.statusText);
        }
    } catch (error) {
        console.error("Something went wrong posting observation", error);
    }
};
