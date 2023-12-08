import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { fetchImage, fetchImageMetadata, addImageToDb, putImageToDb } from "./ImageApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import NavBarDoctor from "../../components/NavBarDoctor";
import "./Image.css";
import CanvasComponent from "../../components/Canvas";
import { Button } from "react-bootstrap";
import { ColorResult, CompactPicker } from "react-color";
import TwoRadioButtons from "../../components/RadioButton";
import { Popup } from "../../components/SaveImagePopup";

const ImagesPage: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [imagesMetaData, setImagesMetaData] = useState<ImageMetadata | null>(
    null
  );

  const [imageMeta, setImageMeta] = useState<imageData[]>([]);

  const [currentImageId, setCurrentImageId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [showImage, setShowImage] = useState<boolean>(false);
  const [showSaveButton, setShowSaveButton] = useState<boolean>(false);
  const [isDoctor, setIsDoctor] = useState<boolean>(false);
  const [canvasColor, setCanvasColor] = useState<string>("#000000");
  const [selectedOption, setSelectedOption] = useState<boolean>(true);
  const [allowEdit, setAllowEdit] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [inputText, setInputText] = useState("");
  const [inputError, setInputError] = useState<string | null>("");
  const [refreshMetadata, setRefreshMetadata] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleClosePopup = () => setShowPopup(false);

  const handleSubmit = async () => {
    if (!canvasRef.current) return;
    const imageData = canvasRef.current.toDataURL();
    if (!selectedPatient) return;
    if (currentImageId === null) return;


    if (!inputText || inputText.length < 3){
        setInputError("Please enter atleast 3 characters")
        return;
    } else if (inputText.length > 30) {
        setInputError("Please enter less than 30 characters")
        return;
    }
   
    if (currentImageId.length === 0) { // image loaded from file
        addImageToDb(imageData, selectedPatient.id.toString(), inputText);
    } else {    // image loaded from db, put
        console.log("PUT")
        putImageToDb(imageData, selectedPatient.id.toString(), inputText, currentImageId);
    }
    
    setShowPopup(false);
    setAllowEdit(false)
    setShowSaveButton(false)
    setInputError(null)
  };



  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputText(event.target.value);

  const handleFileInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;
    if (file.type === "image/jpeg" || file.type === "image/png") {
      setShowImage(true);
      setImageSrc(URL.createObjectURL(file));
      setAllowEdit(false);
      setCurrentImageId("");
    } else {
      console.error("File is not an image.");
    }
  };

  const handleRadioButtonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.id);
    setSelectedOption(!selectedOption);
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSaveImage = () => {
    setShowPopup(true);
  };

  const handleEditImage = () => {
    setAllowEdit(true)
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
          setAllowEdit(false);
          setCurrentImageId(itemId);
        }
      } catch (error) {
        console.error("An error occurred: ", error);
      }
    }
  };

  const handleChangeComplete = (color: ColorResult) => {
    console.log(color.hex);
    setCanvasColor(color.hex);
  };

  useEffect(() => {
    const storedPatient = localStorage.getItem("currentPatient");
    const privilege = localStorage.getItem("privilege");
    if (storedPatient) {
      const patientData: Patient = JSON.parse(storedPatient);
      if (patientData.id !== selectedPatient?.id)
        setSelectedPatient(patientData);
    }
    if (privilege == "DOCTOR") {
      setIsDoctor(true);
    } else {
      setIsDoctor(false);
    }
  }, [selectedPatient]);

  useEffect(() => {
    console.log("First");
    if (selectedPatient) {
        console.log("Second");
      const loadImages = async () => {
        setLoading(true);
        try {
            console.log("Third");
          const metadata = await fetchImageMetadata(selectedPatient.id);
          if (metadata && metadata.images) {
            console.log("Metadata fetched");
            setImagesMetaData(metadata);
            setImageMeta(metadata.images);
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
  }, [selectedPatient, refreshMetadata]);

   

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
          <Button
                id="refresh-images-button"
                title="Refresh Button"
                onClick={() => setRefreshMetadata(refreshMetadata + 1)}
              >
                Refresh
              </Button>
            <DropdownButton id="dropdown-basic-button" title="Choose image">
              {imageMeta.map((item) => (
                <Dropdown.Item
                  key={item.imageId}
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
            canvasRef = {canvasRef}
            imageUrl={imageSrc}
            draw={selectedOption}
            hexColor={canvasColor}
            allowEdit={allowEdit}
          ></CanvasComponent>
          {allowEdit && (
          <div className="color-picker">
            <div>
              <Popup
                isVisible={showPopup}
                onClose={handleClosePopup}
                onSubmit={handleSubmit}
                onTextChange={handleTextChange}
                textValue={inputText}
                inputError={inputError}
              ></Popup>
            </div>
            <div style={{margin: "1rem"}}>
              <CompactPicker
                color={canvasColor}
                onChangeComplete={handleChangeComplete}
              ></CompactPicker>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <TwoRadioButtons
                firstButtonName="Draw"
                seconButtonName="Write"
                handleOptionChange={handleRadioButtonChange}
                activeButton={selectedOption}
              ></TwoRadioButtons>
            </div>
          </div>
          )}
        </div>
      )}
    </>
  );
};

export default ImagesPage;
