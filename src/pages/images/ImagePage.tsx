import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import React, { useEffect, useState, useRef } from "react";
import { fetchImage, fetchImageMetadata } from "./ImageApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import NavBarDoctor from "../../components/NavBarDoctor";
import "./Image.css";
import CanvasComponent from "../../components/Canvas";
import { Button } from "react-bootstrap";
import { Color, ColorResult, GithubPicker } from "react-color";

const ImagesPage: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [imagesMetaData, setImagesMetaData] = useState<ImageMetadata | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [showImage, setShowImage] = useState<boolean>(false);
  const [showSaveButton, setShowSaveButton] = useState<boolean>(false);
  const [isDoctor, setIsDoctor] = useState<boolean>(false);
  const [canvasColor, setCanvasColor] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if the file is an image
      if (file.type === "image/jpeg" || file.type === "image/png") {
        // Implement the logic to upload the file to your API
        setShowImage(true);
        const imageUrl = URL.createObjectURL(file);
        console.log(imageUrl);
        setImageSrc(URL.createObjectURL(file));
        setShowSaveButton(true);
      } else {
        console.error("File is not an image.");
      }
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSaveImage = () => {
    setShowSaveButton(false);
  };

  const handleEditImage = () => {
    setShowSaveButton(true);
  };

  const handleDropdownItemClick = async (itemId: string) => {
    if (imagesMetaData && imagesMetaData.mongoId) {
      try {
        const imageData = await fetchImage(itemId, imagesMetaData.mongoId);
        if (imageData) {
          const base64Image = imageData.base64Image;
          const contentType = imageData.contentType;
          const fullImageSrc = "data:" + contentType + ";base64," + base64Image;
          setImageSrc(fullImageSrc);
          setShowImage(true);
          setShowSaveButton(false);
        }
      } catch (error) {
        console.error("An error occurred: ", error);
      }
    }
  };

  const handleChangeComplete = (color: ColorResult) => {
        console.log(color.hex)
        setCanvasColor(color.hex)
  };

  useEffect(() => {
    const storedPatient = localStorage.getItem("currentPatient");
    const privilege = localStorage.getItem("privilege");
    if (storedPatient) {
      const patientData: Patient = JSON.parse(storedPatient);
      setSelectedPatient(patientData);
    }
    if (privilege == "DOCTOR") {
      setIsDoctor(true);
    } else {
      setIsDoctor(false);
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
      loadImages().then((r) => r);
    }
  }, [selectedPatient]);

  const imageMeta = imagesMetaData?.images ?? [];

  return (
    <>
      <NavBarDoctor />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            style={{ display: "none" }}
            accept=".jpg, .jpeg, .png"
          />
          <div className="button-row">
            <DropdownButton id="dropdown-basic-button" title="Choose image">
              {imageMeta.map((item, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleDropdownItemClick(item.imageId)}
                >
                  {item.description}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <Button
              id="upload-image-button"
              title="Upload image"
              onClick={openFileSelector}
            >
              Upload image
            </Button>

            {showImage && isDoctor && (
              <Button
                id="edit-image-button"
                title="Edit image"
                onClick={handleEditImage}
              >
                Edit image
              </Button>
            )}

            {showSaveButton && (
              <Button
                id="save-image-button"
                title="Save image"
                onClick={handleSaveImage}
              >
                Save image
              </Button>
            )}
          </div>
        </>
      )}

      {showImage && (
        <div className="container">
          <CanvasComponent
            imageUrl={imageSrc}
            addText={true}
            hexColor={canvasColor}
          ></CanvasComponent>
          <div className="color-picker">
            <GithubPicker onChangeComplete={handleChangeComplete}></GithubPicker>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagesPage;
