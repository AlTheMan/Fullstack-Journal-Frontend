import axios from "axios";
import { patientApiAddress } from "./RequestAddresses";

type Patient = {
    id: number;
}

export const PostObservation = async (description: string, value: number, unit: string, patientId: number) => {
    //var username = localStorage.getItem("username");

    let patient: Patient = {id: patientId}

    var requestUri = patientApiAddress() + '/observation/add';

    try {
        const response = await axios.post(requestUri, {
            description,
            value,
            unit,
            patient
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
