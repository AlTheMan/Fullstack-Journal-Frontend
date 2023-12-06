import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import React, {useEffect, useState, useRef} from "react";
import {fetchImage, fetchImageMetadata} from "./ImageApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import NavBarDoctor from "../../components/NavBarDoctor";
import "../../App.css";
import "./Image.css";
import CanvasComponent from "../../components/Canvas";
import {Button} from "react-bootstrap";

const ImagesPage: React.FC = () => {
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [imagesMetaData, setImagesMetaData] = useState<ImageMetadata | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string>("");
    const canvasRef = useRef(null);
    const [displayImage, setDisplayImage] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Check if the file is an image
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                // Implement the logic to upload the file to your API
                const formData = new FormData();
                formData.append('image', file);

                try {
                    const response = await fetch('YOUR_API_ENDPOINT', {
                        method: 'POST', body: formData, // Add any additional headers if needed
                    });
                    const result = await response.json();
                    console.log(result);
                    // Handle the API response here
                } catch (error) {
                    console.error('Error uploading the file:', error);
                    // Handle any errors here
                }
            } else {
                console.error('File is not an image.');
                // Handle the case where the file is not an image
            }
        }
    };

    const openFileSelector = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    const handleDropdownItemClick = async (itemId: string) => {
        if (imagesMetaData && imagesMetaData.mongoId) {
            try {
                const imageData = await fetchImage(itemId, imagesMetaData.mongoId);
                if (imageData) {
                    const base64Image = imageData.base64Image;
                    const contentType = imageData.contentType;
                    const fullImageSrc = 'data:' + contentType + ';base64,' + base64Image;
                    setImageSrc(fullImageSrc);
                    setDisplayImage(true)
                }
            } catch (error) {
                console.error("An error occurred: ", error)
            }

        }
    };

    useEffect(() => {
        const storedPatient = localStorage.getItem("currentPatient");
        if (storedPatient) {
            const patientData: Patient = JSON.parse(storedPatient);
            setSelectedPatient(patientData);
        }
    }, []);

    useEffect(() => {
        if (selectedPatient) {
            const loadImages = async () => {
                setLoading(true);
                try {
                    const metadata = await fetchImageMetadata(selectedPatient.id);
                    if (metadata) {
                        console.log("Metadata fetched");
                        setImagesMetaData(metadata);
                    } else {
                        console.log("Couldn't get metadata");
                    }
                } catch (error) {
                    console.error("Error", error);
                } finally {
                    setLoading(false);
                }
            };
            loadImages().then(r => r);
        }
    }, [selectedPatient]);

    const imageMeta = imagesMetaData?.images ?? []

    return (<>
        <NavBarDoctor/>
        {loading ? (<LoadingSpinner/>) : (<>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    style={{display: 'none'}}
                    accept=".jpg, .jpeg, .png"
                />
                <div className="button-row">
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Choose image"
                    >
                        {imageMeta.map((item, index) => <Dropdown.Item
                            key={index}
                            onClick={() => handleDropdownItemClick(item.imageId)}
                        >
                            {item.description}
                        </Dropdown.Item>)}
                    </DropdownButton>
                    <Button id="upload-image-button" title="Upload image" onClick={openFileSelector}>Upload
                        image</Button>
                </div>
            </>

        )}

        {displayImage && (<div>
            <div className="horizontalCenterWithTopMargin">
                <CanvasComponent imageUrl={imageSrc} canvasRef={canvasRef}></CanvasComponent>
            </div>
        </div>)}
    </>);
};

export default ImagesPage;
