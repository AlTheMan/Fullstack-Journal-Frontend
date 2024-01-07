import axios from "axios";
import { quarkusApiAddress } from "../RequestAddresses";

export const searchPatientsByName = async (
    name: string,
    token: string | undefined
  ): Promise<Patient[] | null> => {
    try {
      const response = await axios.get(quarkusApiAddress() + '/search/patient/findby', {
        params: { name }, headers: {
            Authorization: `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        console.log(response.data);
        const patientData: Patient[] = response.data;
        return patientData;
      } else {
        console.error("Failed to fetch patient data:", response.status);
        return null;
      }
    } catch (error) {
      console.error('An error occured while fetching patient data', error)
      return null
    }
  };