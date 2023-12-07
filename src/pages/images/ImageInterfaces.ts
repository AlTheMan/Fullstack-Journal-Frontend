

interface ImageMetadata {
    mongoId: string
    patientId: number,
    images: imageData[]

}

interface EncodedImage {
    contentType: string
    base64Image: string
}


interface imageData {
    imageId: string,
    description: string,
    contentType: string
}