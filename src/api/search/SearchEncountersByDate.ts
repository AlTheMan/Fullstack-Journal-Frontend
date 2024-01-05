import axios from "axios";
import { quarkusApiAddress } from "../RequestAddresses";

export const searchEncountersByDate = async (
    doctorId: number,
    date: string,
    token: string | undefined
): Promise<Encounter[] | null> => {
    try {
        const response = await axios.get(quarkusApiAddress() + '/search/encounter/getByDate', {
            params: {
                doctorId,
                date
            }, headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            console.log(response.data);
            const encounterData: Encounter[] = response.data;
            return encounterData;
        } else {
            console.error("Failed to fetch encounter data:", response.status);
            return null;
        }
    } catch (error) {
        console.error('An error occured while fetching encounter data', error)
        return null
    }
};