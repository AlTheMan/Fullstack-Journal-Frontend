import axios from "axios";
import { quarkusApiAddress } from "../RequestAddresses";

export const searchPatientsByConditionCode = async (
    conditionCode: string,
    token: string | undefined
  ): Promise<Patient[] | null> => {
    try {
      const response = await axios.get(quarkusApiAddress() + '/search/patient/getByCondition/code', {
        params: { conditionCode }, headers: {Authorization: `Bearer ${token}`}
      });
  
      if (response.status === 200) {
        console.log(response.data);
        const patientData: Patient[] = response.data;
        //localStorage.setItem("patients", JSON.stringify(patientData));
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