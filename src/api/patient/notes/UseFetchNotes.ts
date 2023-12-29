import {patientApiAddress} from "../../RequestAddresses.ts";
import axios from "axios";
import UseTokenHandler from "../../../auth/UseTokenHandler.tsx";
import {useEffect, useState} from "react";

export const useFetchNotes = (patientId: number | undefined) => {
    const token = UseTokenHandler()
    const [notes, setNotes] = useState<Note[]>([])
    const requestUri = patientApiAddress() + 'note';

    useEffect(() => {

        if (!patientId) return
        const fetchNotes = async () => {
            try {
                const response = await axios.get<Note[]>(requestUri, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }, params: {
                        patientId: patientId
                    }
                });
                if (response.status === 200) {
                    setNotes(response.data)
                } else {
                    console.error("Something when wrong trying to fetch notes");
                    return 
                }
            } catch (error) {
                console.log("An error occured while fetching note data", error);
                return
            }
        }
        fetchNotes()
    }, [patientId, token]);
    return notes
}