import axios from "axios";
import {patientApiAddress} from "../../RequestAddresses.ts";

type Patient = {
    id: number;
}

export const postObservation = async (description: string, value: number, unit: string, patientId: number, token: string | undefined) => {
    const patient: Patient = {id: patientId}
    const requestUri = patientApiAddress() + 'observation/add';

    try {
        const response = await axios.post(requestUri, {
            description, value, unit, patient
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 201) {
            console.log("Created");
        } else {
            console.error("Something went wrong", response.statusText);
        }
    } catch (error) {
        console.error("Something went wrong posting observation", error);
    }
};
