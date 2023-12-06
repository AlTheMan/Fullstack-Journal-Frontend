import axios from "axios"
import { imageApiAddress } from "../../api/RequestAddresses";


export const fetchImageMetadata = async (patientId: number) => {
    const requestUri = imageApiAddress() + '/image_data'

    try {
        const response = await axios.get<ImageMetadata>(requestUri, {
            params: {patientId},
        });

        if (response.status === 200) {
            console.log(response.data)
            return response.data
        } else {
            console.error("Could not fetch metadata of images");
            return null;
        }
    } catch (error) {
        console.error("Something went wrong fetching images..", error)
        return null;
    }
}

export const fetchImage = async (imageId: string, mongoId: string) => {
    const requestUri = imageApiAddress() + '/image';
    try {
        const response = await axios.get<EncodedImage>(requestUri, {
            params: {mongoId, imageId}
        });

        if (response.status === 200) {
            return response.data
        } else {
            console.error("Could not fetch image")
            return null;
        }
    } catch (error) {
        console.error("An error occurred while fetching an image", error);
        return null;
    }
}

