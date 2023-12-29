import {patientApiAddress} from "../../RequestAddresses.ts";
import axios from "axios";

export const postNote = async (noteText: string, patientId: number, writtenById: number, token: string | undefined) => {

    const requestUri = patientApiAddress() + 'note/add';
    const writtenBy: { id: number } = {id: writtenById}
    const patient: { id: number } = {id: patientId}

    try {
        const response = await axios.post<string>(
            requestUri,
            {
                noteText,
                patient,
                writtenBy
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        if (response.status === 200) {
            console.log(response.data);
        } else {
            console.error("Something went wrong", response.statusText);
        }
    } catch (error) {
        console.error("Something went wrong posting note", error);
    }



}