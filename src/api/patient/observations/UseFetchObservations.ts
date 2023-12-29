import {patientApiAddress} from "../../RequestAddresses.ts";
import axios from "axios";
import UseTokenHandler from "../../../auth/UseTokenHandler.tsx";
import {useEffect, useState} from "react";

export const useFetchObservations = (patientId: number | undefined) => {
    const [observations, setObservations] = useState<Observation[]>([])
    const token = UseTokenHandler();
    const requestUri = patientApiAddress() + 'observation';

    useEffect(() => {
        if (!patientId) return
        const fetchObservations = async () => {
            try {
                const response = await axios.get<Observation[]>(requestUri, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }, params: {
                        patientId: patientId
                    }
                });
                if (response.status === 200) {
                    setObservations(response.data)
                } else {
                    console.error("Something when wrong trying to fetch notes");
                    return
                }
            } catch (error) {
                console.log("An error occured while fetching note data", error);
                return
            }
        }
        fetchObservations()
    }, [patientId, requestUri, token]);
    return observations
}