import axios from "axios";
import { patientApiAddress } from "./RequestAddresses";

export const fetchConditions = async (patientId: number) => {
  const requestUri = patientApiAddress() + '/condition';

  try {
    const response = await axios.get<Condition[]>(requestUri, {
      params: { patientId }
    });

    if (response.status === 200) {
      const conditionData = response.data;
      return conditionData;
    } else {
      console.error("Failed to fetch condition data");
      return null;
    }
  } catch (error) {
    console.error("An error occured while fetching condition data ", error);
    return null;
  }
};

export default fetchConditions;
