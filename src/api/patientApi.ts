import axios from "axios";

export const fetchData = async (
  patientId: string,
  username: string
): Promise<Patient | null> => {
  try {
    const response = await axios.get("http://localhost:8080/patient/get", {
      params: { patientId },
      headers: { username: username },
    });

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