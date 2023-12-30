import {patientApiAddress} from "../../RequestAddresses.ts";
import axios from "axios";
import UseTokenHandler from "../../../auth/UseTokenHandler.tsx";
import {useEffect, useState} from "react";

export const useFetchConditions = (patientId: number | undefined) => {
    const [conditions, setConditions] = useState<Condition[]>([])
    const token = UseTokenHandler();
    const requestUri = patientApiAddress() + 'condition';

    useEffect(() => {
        if (!patientId) return
        const fetchConditions = async () => {
            try {
                const response = await axios.get<Condition[]>(requestUri, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }, params: {
                        patientId: patientId
                    }
                });
                if (response.status === 200) {
                    setConditions(response.data)
                } else {
                    console.error("Something when wrong trying to fetch notes");
                    return
                }
            } catch (error) {
                console.log("An error occured while fetching note data", error);
                return
            }
        }
        fetchConditions()
    }, [patientId, token]);
    return conditions
}