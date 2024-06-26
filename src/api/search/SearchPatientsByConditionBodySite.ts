import axios from "axios";
import {quarkusApiAddress} from "../RequestAddresses";

export const searchPatientsByConditionBodySite = async (
    bodySite: string,
    token: string | undefined
  ): Promise<Patient[] | null> => {
    try {
      const response = await axios.get(quarkusApiAddress() + '/search/patient/getByCondition/bodySite', {
        params: { bodySite }, headers: {
          Authorization: `Bearer ${token}`
      }
      });
  
      if (response.status === 200) {
        console.log(response.data);
        //localStorage.setItem("patients", JSON.stringify(patientData));
        return response.data;
      } else {
        console.error("Failed to fetch patient data:", response.status);
        return null;
      }
    } catch (error) {
      console.error('An error occurred while fetching patient data', error)
      return null
    }
  };