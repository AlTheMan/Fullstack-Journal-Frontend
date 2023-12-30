import { useState, useEffect } from 'react';
import axios from 'axios';
import TokenHandler from '../../auth/UseTokenHandler.tsx';
import {patientApiAddress} from "../RequestAddresses.ts";

export const useFetchAllPatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const token = TokenHandler();
  useEffect(() => {
    const fetchPatients = async () => {

      try {
        const response = await axios.get(patientApiAddress(), {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (response.status === 200) {
          const patientData = response.data;
          setPatients(patientData);
          localStorage.setItem('patients', JSON.stringify(patientData));
        }
      } catch (error) {
        console.error('Error fetching patients:', error);
        // Handle errors as needed
      }
    };

    fetchPatients();
  }, [token]);

  return patients;
}
