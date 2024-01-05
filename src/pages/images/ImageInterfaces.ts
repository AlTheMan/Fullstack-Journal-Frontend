

interface ImageMetaData {
    mongoId: string
    patientId: number,
    images: ImageData[]
}

interface EncodedImage {
    contentType: string
    base64Image: string
}


interface ImageData {
    imageId: string,
    description: string,
    contentType: string
}

interface SendImageData {
    patientId: number,
    description: string,
    contentType: string,
    imageData: string
}