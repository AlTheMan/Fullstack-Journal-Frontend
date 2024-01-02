import { useState, useEffect } from 'react';
import axios from 'axios';
import TokenHandler from '../../auth/UseTokenHandler.tsx';
import {userApiAddress} from "../RequestAddresses.ts";

export const useFetchAllStaff = () => {
  const [staff, setStaff] = useState<ReturnedStaffProps[]>([]);
  const token = TokenHandler();
  useEffect(() => {
    const fetchStaff = async () => {

      try {
        const response = await axios.get(userApiAddress() + '/get-all-staff', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (response.status === 200) {
          const staffData = response.data;
          setStaff(staffData);
          localStorage.setItem('staff', JSON.stringify(staffData));
        }
      } catch (error) {
        console.error('Error fetching staff:', error);
        // Handle errors as needed
      }
    };

    fetchStaff();
  }, [token]);

  return staff;
}