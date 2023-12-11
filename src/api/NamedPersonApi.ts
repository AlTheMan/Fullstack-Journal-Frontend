import axios from "axios";
import { userApiAddress } from "./RequestAddresses";

export const fetchData = async (
  id: number
): Promise<Staff | null> => {

    //const privilege: string = localStorage.getItem("privilege") || "";

    /*let requestUri = "";

    switch (privilege){
        case "DOCTOR": requestUri = "http://localhost:8080/staff/get_doctor"; break;
        case "STAFF": requestUri = "http://localhost:8080/staff/get_staff"; break;
        default: break;
    }
    
    if (requestUri.length == 0) {
        console.log("Request URI was 0, wrong privilege?")
        return null;
    }*/

    const requestUri = userApiAddress() + '/get_staff';


  try {
    const response = await axios.get(requestUri, {
      params: { id },
    });

    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      console.error("Failed to fetch staff/doctor data:", response.status);
      return null;
    }
  } catch (error) {
    console.error('An error occured while fetching staff/doctor data', error)
    return null
  }
};



export default fetchData