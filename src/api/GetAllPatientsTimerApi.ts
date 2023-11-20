import axios from "axios";

export const fetchAllPatients = async () => {
  const response = await axios.get("http://localhost:8080/patient/get_all");
  if (response.status === 200) {
    const patientData: Patient[] = response.data;
    localStorage.setItem("patients", JSON.stringify(patientData));
    return patientData;
  }
  return null;
};
