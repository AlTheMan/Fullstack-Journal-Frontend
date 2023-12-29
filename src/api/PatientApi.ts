import axios from "axios";
import { patientApiAddress } from "./RequestAddresses";

export const fetchData = async (
  patientId: number,
  token: string | undefined
): Promise<Patient | null> => {
  try {
    const response = await axios.get(patientApiAddress() + '/get', {
      params: { patientId }, headers: {
        Authorization: `Bearer ${token}`
      }
    }, );

    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      console.error("Failed to fetch patient data:", response.status);
      return null;
    }
  } catch (error) {
    console.error('An error occured while fetching patient data', error)
    return null
  }
};



export default fetchData