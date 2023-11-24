import axios from "axios";
import { patientApiAddress } from "./RequestAddresses";

export const fetchAllPatients = async () => {
  const response = await axios.get(patientApiAddress());
  if (response.status === 200) {
    const patientData: Patient[] = response.data;
    localStorage.setItem("patients", JSON.stringify(patientData));
    return patientData;
  }
  return null;
};
