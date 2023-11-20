import axios from "axios";

export const PostObservation = async (description: string, value: number, unit: string, patientId: number) => {
    var username = localStorage.getItem("username");

    var requestUri = "http://localhost:8080/patient/observation/add";

    try {
        const response = await axios.post(requestUri, {
            description,
            value,
            unit,
            patientId
        });

        if (response.status === 200) {
            console.log("Created");
        } else {
            console.error("Something went wrong", response.statusText);
        }
    } catch (error) {
        console.error("Something went wrong posting observation", error);
    }
};
