import axios from "axios";
import { patientApiAddress, userApiAddress } from "../api/RequestAddresses";

export const fetchPatientIdFromUserId = async (
  userId: string
): Promise<string | null> => {
  try {
    const response = await axios.get(patientApiAddress() + '/get-id', {
      params: { userId }
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


export const fetchPatientIdFromEmail = async (
    email: string
  ): Promise<string | null> => {
    try {
      const response = await axios.get(userApiAddress() + '/get-id', {
        params: { email }
      });
  
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        console.error("Failed to fetch patient id from user name:", response.status);
        return null;
      }
    } catch (error) {
      console.error('An error occured while fetching patient id from username', error)
      return null
    }
  };

  export const updateUserIdInDb = async (
    patientId: string,
    userId: string
  ): Promise<string | null> => {
    try {
      const response = await axios.post(patientApiAddress() + '/update-userid', {
        patientId, userId
      });
  
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        console.error("Failed to fetch patient id from user name:", response.status);
        return null;
      }
    } catch (error) {
      console.error('An error occured while fetching patient id from username', error)
      return null
    }
  };

  export const addNewPatient = async (
    newPatient: NewPatientProps
  ): Promise<ReturnedPatientProps | null> => {
    try {

        console.log(newPatient)
        const userId = newPatient.userId
        const firstName = newPatient.firstName
        const lastName = newPatient.lastName
        const sex = newPatient.sex
        const birthdate = newPatient.birthdate

        const response = await axios.post(patientApiAddress() + '/add', {
          userId, firstName, lastName, sex, birthdate
        });
    
        if (response.status === 200) {
          console.log(response.data);
          return response.data;
        } else {
          console.error("Failed to fetch patient id from user name:", response.status);
          return null;
        }
      } catch (error) {
        console.error('An error occured while fetching patient id from username', error)
        return null
      }
  }

