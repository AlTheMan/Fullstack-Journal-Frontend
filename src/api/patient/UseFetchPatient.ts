import {useEffect, useState} from 'react';
import axios from 'axios';
import TokenHandler from '../../auth/UseTokenHandler.tsx';
import {patientApiAddress} from "../RequestAddresses.ts";
import {useLocalStorage} from "../../hooks/useLocalStorage.ts";

export const useFetchPatient = (
    patientId: number | null
) => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const token = TokenHandler();
    const requestAddress = patientApiAddress() + 'get'
    const localStorage = useLocalStorage();
    useEffect(() => {
        
        if (!patientId) {
            return
        }

        console.log("Fetching patient with id:", patientId)
        const fetchPatient = async () => {
            try {
                const response = await axios.get(requestAddress, {
                    params: {
                      patientId: patientId  
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (response.status === 200) {
                    const patientData = response.data;
                    localStorage.setItem('currentPatient', JSON.stringify(patientData))
                    setPatient(patientData);
                }
            } catch (error) {
                console.error('Error fetching patients:', error);
                // Handle errors as needed
            }
        };

        fetchPatient();
    }, [patientId, requestAddress, token]);

    return patient;
}
