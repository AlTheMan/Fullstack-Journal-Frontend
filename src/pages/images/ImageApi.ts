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

export const addImageToDb = async (
  imageData: string,
  patientId: string,
  description: string
) => {
  if (!imageData || !patientId || !description) return;

  const response = await fetch(imageData);
  const blob = await response.blob();

  const formData = new FormData();
  formData.append("image", blob, "canvasImage.png");
  formData.append("patientId", patientId);
  formData.append("description", description);

  const requestUri = imageApiAddress() + "image";

  await axios
    .post(requestUri, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("Image uploaded successfully", response.data);
    })
    .catch((error) => {
      console.error("Error uploading image", error);
    });
};


export const putImageToDb = async (
    imageData: string,
    patientId: string,
    description: string,
    imageId: string
  ) => {
    if (!imageData || !patientId || !description || !imageId) return;
    const response = await fetch(imageData);
    const blob = await response.blob();
  
    const formData = new FormData();
    formData.append("image", blob, "canvasImage.png");
    formData.append("patientId", patientId);
    formData.append("description", description);
    formData.append("imageId", imageId);
  
    const requestUri = imageApiAddress() + "image";
  
    await axios
      .put(requestUri, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Image uploaded successfully", response.data);
      })
      .catch((error) => {
        console.error("Error uploading image", error);
      });
  };


