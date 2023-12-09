import axios from "axios";
import { imageApiAddress } from "../../api/RequestAddresses";

export const fetchImageMetadata = async (patientId: number) => {
  const requestUri = imageApiAddress() + "image_data";

  try {
    const response = await axios.get<ImageMetadata>(requestUri, {
      params: { patientId },
    });

    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      console.error("Could not fetch metadata of images");
      return null;
    }
  } catch (error) {
    console.error("Something went wrong fetching images..", error);
    return null;
  }
};

export const fetchImage = async (imageId: string, mongoId: string) => {
  const requestUri = imageApiAddress() + "image";
  try {
    const response = await axios.get<EncodedImage>(requestUri, {
      params: { mongoId, imageId },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Could not fetch image");
      return null;
    }
  } catch (error) {
    console.error("An error occurred while fetching an image", error);
    return null;
  }
};

/**
 * Adds an image to the database.
 * @param {string} imageData - The URL of the image to be uploaded.
 * @param {string} patientId - The ID of the patient associated with the image.
 * @param {string} description - The description of the image.
 * @returns {Promise<boolean>} - True if the image was successfully uploaded, false otherwise.
 */
export const addImageToDb = async (
  imageData: string,
  patientId: string,
  description: string
): Promise<boolean> => {
  // Check for required parameters
  if (!imageData || !patientId || !description) {
    console.error("Missing required parameters");
    return false;
  }

  try {
    const response = await fetch(imageData);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("image", blob, "canvasImage.png");
    formData.append("patientId", patientId);
    formData.append("description", description);

    const requestUri = imageApiAddress() + "image";
    const result = await axios.post(requestUri, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Image uploaded successfully", result.data);
    return true;
  } catch (error) {
    console.error("Error uploading image", error);
    return false;
  }
};


/**
 * Updates an image in the database.
 * @param {string} imageData - The URL of the image to be uploaded.
 * @param {string} patientId - The ID of the patient associated with the image.
 * @param {string} description - The description of the image.
 * @param {string} imageId - The ID of the image to be updated.
 * @returns {Promise<boolean>} - True if the image was successfully updated, false otherwise.
 */
export const putImageToDb = async (
  imageData: string,
  patientId: string,
  description: string,
  imageId: string
): Promise<boolean> => {
  if (!imageData || !patientId || !description || !imageId) {
    console.error("Missing required parameters");
    return false;
  }

  try {
    const response = await fetch(imageData);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("image", blob, "canvasImage.png");
    formData.append("patientId", patientId);
    formData.append("description", description);
    formData.append("imageId", imageId);

    const requestUri = imageApiAddress() + "image";
    const result = await axios.put(requestUri, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Image updated successfully", result.data);
    return true;
  } catch (error) {
    console.error("Error updating image", error);
    return false;
  }
};



