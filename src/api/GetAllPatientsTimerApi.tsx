import axios from "axios";
import { patientApiAddress } from "./RequestAddresses";
import TokenHandler from "../auth/TokenHandler";

export const fetchAllPatients = async () => {

  const token = TokenHandler();



  const response = await axios.get(patientApiAddress(), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (response.status === 200) {
    const patientData: Patient[] = response.data;
    localStorage.setItem("patients", JSON.stringify(patientData));
    return patientData;
  }
  return null;
};
