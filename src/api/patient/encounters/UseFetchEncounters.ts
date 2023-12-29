import {patientApiAddress} from "../../RequestAddresses.ts";
import axios from "axios";
import UseTokenHandler from "../../../auth/UseTokenHandler.tsx";
import {useEffect, useState} from "react";

export const useFetchEncounters = (patientId: number | undefined) => {
    const [encounters, setEncounters] = useState<Encounter[]>([])
    const token = UseTokenHandler();
    const requestUri = patientApiAddress() + 'encounter';

    useEffect(() => {
        if (!patientId) return
        const fetchEncounters = async () => {
            try {
                const response = await axios.get<Encounter[]>(requestUri, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }, params: {
                        patientId: patientId
                    }
                });
                if (response.status === 200) {
                    setEncounters(response.data)
                } else {
                    console.error("Something when wrong trying to fetch notes");
                    return
                }
            } catch (error) {
                console.log("An error occured while fetching note data", error);
                return
            }
        }
        fetchEncounters()
    }, [patientId, token]);
    return encounters
}