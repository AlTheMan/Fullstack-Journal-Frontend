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

        const userId = newPatient.userId
        const firstName = newPatient.firstName
        const lastName = newPatient.lastName
        const sex = newPatient.sex
        const birthdate = newPatient.birthdate

        const addedPatient = await axios.post(patientApiAddress() + '/add', {
          userId, firstName, lastName, sex, birthdate
        });
    
        if (addedPatient.status === 200) {
          console.log(addedPatient.data);

          const data: ReturnedPatientProps = addedPatient.data;
          const personId = data.id

          const addedUser = await axios.post(userApiAddress() + '/add', {
                userId, personId
          });

          if (addedUser.status !== 200){
            console.error("Failed to add user")
            return null
          }

          return addedPatient.data
        } else {
          console.error("Failed to fetch patient id from user name:", addedPatient.status);
          return null;
        }
      } catch (error) {
        console.error('An error occured while fetching patient id from username', error)
        return null
      }
  }


  export const fetchPersonIdByUserId = async (
    userId: string | null
  ): Promise<string | null> => {
    try {
      const response = await axios.get(userApiAddress() + '/get-id', {
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



  export const addNewStaff = async (
    firstName: string,
    lastName: string,
    userId: string,
    privilege: string

  ): Promise<ReturnedStaffProps | null> => {
    try {

        const addedStaff = await axios.post(patientApiAddress() + '/add-staff', {
          firstName, lastName, privilege, userId
        });
    
        if (addedStaff.status === 200) {
          console.log(addedStaff.data);

          const data: ReturnedStaffProps = addedStaff.data;
          const personId = data.id

          const addedUser = await axios.post(userApiAddress() + '/add', {
                userId, personId
          });

          if (addedUser.status !== 200){
            console.error("Failed to add user")
            return null
          }

          return addedStaff.data
        } else {
          console.error("Failed to fetch patient id from user name:", addedStaff.status);
          return null;
        }
      } catch (error) {
        console.error('An error occured while fetching patient id from username', error)
        return null
      }
  };




