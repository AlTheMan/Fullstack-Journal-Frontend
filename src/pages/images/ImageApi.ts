import axios from "axios"
import { imageApiAddress } from "../../api/RequestAddresses";


export const fetchImages = async (patientId: number) => {
    const requestUri = imageApiAddress() + '/image'

    try {
        const response = await axios.get<Images>(requestUri, {
            params: {patientId},
        });

        if (response.status === 200) {
            console.log(response.data)
            return response.data
        } else {
            console.error("Could not fetch images");
            return null;
        }
    } catch (error) {
        console.error("Something went wrong fetching images..", error)
        return null;
    }
}

