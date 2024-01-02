import axios from "axios";
import {userApiAddress} from "../RequestAddresses.ts";

export const fetchPersonIdByUserId = async (userId: string | null, token: string | undefined): Promise<string | null> => {
    try {
        const response = await axios.get(userApiAddress() + '/get-id', {
            params: {userId}, headers: {Authorization: `Bearer ${token}`}
        });

        if (response.status === 200) {
            console.log(response.data);
            return response.data;
        } else {
            console.error("Failed to fetch patient id from user id:", response.status);
            return null;
        }
    } catch (error) {
        console.error('An error occured while fetching patient id from user id', error)
        return null
    }
};